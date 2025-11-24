import { getLeafLocations } from '@strudel/mini';
import { parse } from 'acorn';
import escodegen from 'escodegen';
import { walk } from 'estree-walker';

let widgetMethods = [];
export function registerWidgetType(type) {
  widgetMethods.push(type);
}

let languages = new Map();
// config = { getLocations: (code: string, offset?: number) => number[][] }
// see mondough.mjs for example use
// the language will kick in when the code contains a template literal of type
// example: mondo`...` will use language of type "mondo"
// TODO: refactor tidal.mjs to use this
export function registerLanguage(type, config) {
  languages.set(type, config);
}

export function transpiler(input, options = {}) {
  const { wrapAsync = false, addReturn = true, emitMiniLocations = true, emitWidgets = true } = options;

  let ast = parse(input, {
    ecmaVersion: 2022,
    allowAwaitOutsideFunction: true,
    locations: true,
  });

  let miniLocations = [];
  const collectMiniLocations = (value, node) => {
    const minilang = languages.get('minilang');
    if (minilang) {
      const code = `[${value}]`;
      const locs = minilang.getLocations(code, node.start);
      miniLocations = miniLocations.concat(locs);
    } else {
      const leafLocs = getLeafLocations(`"${value}"`, node.start, input);
      miniLocations = miniLocations.concat(leafLocs);
    }
  };
  let widgets = [];

  walk(ast, {
    enter(node, parent, prop, index) {
      if (isLanguageLiteral(node)) {
        const { name } = node.tag;
        const language = languages.get(name);
        const code = node.quasi.quasis[0].value.raw;
        const offset = node.quasi.start + 1;
        if (emitMiniLocations) {
          const locs = language.getLocations(code, offset);
          miniLocations = miniLocations.concat(locs);
        }
        this.skip();
        return this.replace(languageWithLocation(name, code, offset));
      }
      if (isTemplateLiteral(node, 'tidal')) {
        const raw = node.quasi.quasis[0].value.raw;
        const offset = node.quasi.start + 1;
        if (emitMiniLocations) {
          const stringLocs = collectHaskellMiniLocations(raw, offset);
          miniLocations = miniLocations.concat(stringLocs);
        }
        this.skip();
        return this.replace(tidalWithLocation(raw, offset));
      }
      if (isBackTickString(node, parent)) {
        const { quasis } = node;
        const { raw } = quasis[0].value;
        this.skip();
        emitMiniLocations && collectMiniLocations(raw, node);
        return this.replace(miniWithLocation(raw, node));
      }
      if (isStringWithDoubleQuotes(node)) {
        const { value } = node;
        this.skip();
        emitMiniLocations && collectMiniLocations(value, node);
        return this.replace(miniWithLocation(value, node));
      }
      if (isSliderFunction(node)) {
        // Check if this slider is assigned to a variable (master control)
        const isNamed = isNamedSlider(node, parent);
        const sliderType = isNamed ? 'named-slider' : 'slider';
        const variableName = isNamed ? getVariableNameFromAssignment(parent) : null;

        emitWidgets &&
          widgets.push({
            from: node.arguments[0].start,
            to: node.arguments[0].end,
            value: node.arguments[0].raw, // don't use value!
            min: node.arguments[1]?.value ?? 0,
            max: node.arguments[2]?.value ?? 1,
            step: node.arguments[3]?.value,
            type: sliderType,
            name: variableName,
          });
        return this.replace(sliderWithLocation(node, variableName));
      }
      if (isSelectFunction(node)) {
        // Check if this select is assigned to a variable (always named)
        const isNamed = isNamedSelect(node, parent);
        if (!isNamed) {
          throw new Error('select() must be assigned to a variable: varName = select(defaultValue, [options])');
        }
        const variableName = getVariableNameFromAssignment(parent);

        // Extract options from second argument (array literal)
        const optionsArg = node.arguments[1];
        let options = [];
        if (optionsArg && optionsArg.type === 'ArrayExpression') {
          options = optionsArg.elements.map(el => el.value || el.raw);
        }

        emitWidgets &&
          widgets.push({
            from: node.arguments[0].start,
            to: node.arguments[0].end,
            value: node.arguments[0].raw || node.arguments[0].value,
            options,
            type: 'named-selector',
            name: variableName,
          });
        return this.replace(selectWithLocation(node, variableName));
      }
      if (isWidgetMethod(node)) {
        const type = node.callee.property.name;
        const index = widgets.filter((w) => w.type === type).length;
        const widgetConfig = {
          to: node.end,
          index,
          type,
          id: options.id,
        };
        emitWidgets && widgets.push(widgetConfig);
        return this.replace(widgetWithLocation(node, widgetConfig));
      }
      if (isBareSamplesCall(node, parent)) {
        return this.replace(withAwait(node));
      }
      if (isLabelStatement(node)) {
        return this.replace(labelToP(node));
      }
    },
    leave(node, parent, prop, index) {},
  });

  let { body } = ast;

  if (!body.length) {
    console.warn('empty body -> fallback to silence');
    body.push({
      type: 'ExpressionStatement',
      expression: {
        type: 'Identifier',
        name: 'silence',
      },
    });
  } else if (!body?.[body.length - 1]?.expression) {
    throw new Error('unexpected ast format without body expression');
  }

  // Convert assignment expressions with namedSliderWithID or selectWithID to variable declarations
  body = body.map((statement, index) => {
    if (statement.type === 'ExpressionStatement' &&
        statement.expression.type === 'AssignmentExpression' &&
        statement.expression.right.type === 'CallExpression' &&
        (statement.expression.right.callee.name === 'namedSliderWithID' ||
         statement.expression.right.callee.name === 'selectWithID')) {
      // Convert: major = namedSliderWithID(...) or sound = selectWithID(...)
      // To: let major = namedSliderWithID(...) or let sound = selectWithID(...)
      return {
        type: 'VariableDeclaration',
        declarations: [{
          type: 'VariableDeclarator',
          id: statement.expression.left,
          init: statement.expression.right
        }],
        kind: 'let'
      };
    }
    return statement;
  });

  ast.body = body;

  // add return to last statement
  if (addReturn) {
    const lastStatement = body[body.length - 1];
    const expression = lastStatement.expression || (lastStatement.type === 'VariableDeclaration' ? lastStatement.declarations[0].init : null);

    if (expression) {
      body[body.length - 1] = {
        type: 'ReturnStatement',
        argument: expression,
      };
    }
  }
  let output = escodegen.generate(ast);
  if (wrapAsync) {
    output = `(async ()=>{${output}})()`;
  }
  if (!emitMiniLocations) {
    return { output };
  }
  return { output, miniLocations, widgets };
}

function isStringWithDoubleQuotes(node, locations, code) {
  if (node.type !== 'Literal') {
    return false;
  }
  return node.raw[0] === '"';
}

function isBackTickString(node, parent) {
  return node.type === 'TemplateLiteral' && parent.type !== 'TaggedTemplateExpression';
}

function miniWithLocation(value, node) {
  const { start: fromOffset } = node;

  const minilang = languages.get('minilang');
  let name = 'm';
  if (minilang && minilang.name) {
    name = minilang.name; // name is expected to be exported from the package of the minilang
  }

  return {
    type: 'CallExpression',
    callee: {
      type: 'Identifier',
      name,
    },
    arguments: [
      { type: 'Literal', value },
      { type: 'Literal', value: fromOffset },
    ],
    optional: false,
  };
}

// these functions are connected to @strudel/codemirror -> slider.mjs
// maybe someday there will be pluggable transpiler functions, then move this there
function isSliderFunction(node) {
  return node.type === 'CallExpression' && node.callee.name === 'slider';
}

function isSelectFunction(node) {
  return node.type === 'CallExpression' && node.callee.name === 'select';
}

function isWidgetMethod(node) {
  return node.type === 'CallExpression' && widgetMethods.includes(node.callee.property?.name);
}

function sliderWithLocation(node, variableName) {
  const id = variableName ? `named_slider_${variableName}` : 'slider_' + node.arguments[0].start; // use variable name for named sliders
  // add loc as identifier to first argument
  // the sliderWithID function is assumed to be sliderWithID(id, value, min?, max?)
  node.arguments.unshift({
    type: 'Literal',
    value: id,
    raw: id,
  });
  node.callee.name = variableName ? 'namedSliderWithID' : 'sliderWithID';
  return node;
}

function selectWithLocation(node, variableName) {
  const id = `named_selector_${variableName}`;
  // the selectWithID function is selectWithID(id, value, options)
  node.arguments.unshift({
    type: 'Literal',
    value: id,
    raw: id,
  });
  node.callee.name = 'selectWithID';
  return node;
}

// Check if slider/select call is being assigned to a variable
function isNamedSlider(node, parent) {
  return parent?.type === 'AssignmentExpression' && parent?.left?.type === 'Identifier';
}

function isNamedSelect(node, parent) {
  return parent?.type === 'AssignmentExpression' && parent?.left?.type === 'Identifier';
}

// Extract variable name from assignment expression
function getVariableNameFromAssignment(parent) {
  return parent?.left?.name;
}

export function getWidgetID(widgetConfig) {
  // the widget id is used as id for the dom element + as key for eventual resources
  // for example, for each scope widget, a new analyser + buffer (large) is created
  // that means, if we use the index index of line position as id, less garbage is generated
  // return `widget_${widgetConfig.to}`; // more gargabe
  //return `widget_${widgetConfig.index}_${widgetConfig.to}`; // also more garbage
  return `${widgetConfig.id || ''}_widget_${widgetConfig.type}_${widgetConfig.index}`; // less garbage
}

function widgetWithLocation(node, widgetConfig) {
  const id = getWidgetID(widgetConfig);
  // add loc as identifier to first argument
  // the sliderWithID function is assumed to be sliderWithID(id, value, min?, max?)
  node.arguments.unshift({
    type: 'Literal',
    value: id,
    raw: id,
  });
  return node;
}

function isBareSamplesCall(node, parent) {
  return node.type === 'CallExpression' && node.callee.name === 'samples' && parent.type !== 'AwaitExpression';
}

function withAwait(node) {
  return {
    type: 'AwaitExpression',
    argument: node,
  };
}

function isLabelStatement(node) {
  return node.type === 'LabeledStatement';
}

// converts label expressions to p calls: "x: y" to "y.p('x')"
// see https://codeberg.org/uzu/strudel/issues/990
function labelToP(node) {
  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: node.body.expression,
        property: {
          type: 'Identifier',
          name: 'p',
        },
      },
      arguments: [
        {
          type: 'Literal',
          value: node.label.name,
          raw: `'${node.label.name}'`,
        },
      ],
    },
  };
}

function isLanguageLiteral(node) {
  return node.type === 'TaggedTemplateExpression' && languages.has(node.tag.name);
}

// tidal highlighting
// this feels kind of stupid, when we also know the location inside the string op (tidal.mjs)
// but maybe it's the only way

function isTemplateLiteral(node, value) {
  return node.type === 'TaggedTemplateExpression' && node.tag.name === value;
}

function collectHaskellMiniLocations(haskellCode, offset) {
  return haskellCode
    .split('')
    .reduce((acc, char, i) => {
      if (char !== '"') {
        return acc;
      }
      if (!acc.length || acc[acc.length - 1].length > 1) {
        acc.push([i + 1]);
      } else {
        acc[acc.length - 1].push(i);
      }
      return acc;
    }, [])
    .map(([start, end]) => {
      const miniString = haskellCode.slice(start, end);
      return getLeafLocations(`"${miniString}"`, offset + start - 1);
    })
    .flat();
}

function tidalWithLocation(value, offset) {
  return {
    type: 'CallExpression',
    callee: {
      type: 'Identifier',
      name: 'tidal',
    },
    arguments: [
      { type: 'Literal', value },
      { type: 'Literal', value: offset },
    ],
    optional: false,
  };
}

function languageWithLocation(name, value, offset) {
  return {
    type: 'CallExpression',
    callee: {
      type: 'Identifier',
      name: name,
    },
    arguments: [
      { type: 'Literal', value },
      { type: 'Literal', value: offset },
    ],
    optional: false,
  };
}
