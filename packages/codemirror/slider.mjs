import { ref, pure } from '@strudel/core';
import { WidgetType, ViewPlugin, Decoration } from '@codemirror/view';
import { StateEffect } from '@codemirror/state';

export let sliderValues = {};
export let namedSliderValues = {}; // For master controls
export let namedSelectorValues = {}; // For discrete selectors (MIDI controllable)
const getSliderID = (from) => `slider_${from}`;

// Original SliderWidget for inline sliders - UNMODIFIED
export class SliderWidget extends WidgetType {
  constructor(value, min, max, from, to, step, view) {
    super();
    this.value = value;
    this.min = min;
    this.max = max;
    this.from = from;
    this.originalFrom = from;
    this.to = to;
    this.step = step;
    this.view = view;
  }

  eq() {
    return false;
  }

  toDOM() {
    let wrap = document.createElement('span');
    wrap.setAttribute('aria-hidden', 'true');
    wrap.className = 'cm-slider';
    let slider = wrap.appendChild(document.createElement('input'));
    slider.type = 'range';
    slider.min = this.min;
    slider.max = this.max;
    slider.step = this.step ?? (this.max - this.min) / 1000;
    slider.originalValue = this.value;
    slider.value = slider.originalValue;
    slider.from = this.from;
    slider.originalFrom = this.originalFrom;
    slider.to = this.to;
    slider.style = 'width:64px;margin-right:4px;transform:translateY(4px)';
    this.slider = slider;
    slider.addEventListener('input', (e) => {
      const next = e.target.value;
      let insert = next;
      const to = slider.from + slider.originalValue.length;
      let change = { from: slider.from, to, insert };
      slider.originalValue = insert;
      slider.value = insert;
      this.view.dispatch({ changes: change });
      const id = getSliderID(slider.originalFrom);
      window.postMessage({ type: 'cm-slider', value: Number(next), id });
    });
    return wrap;
  }

  ignoreEvent(e) {
    return true;
  }
}

// NEW: Separate widget for named selectors (MIDI controllable discrete options)
export class NamedSelectorWidget extends WidgetType {
  constructor(value, options, from, to, view, name) {
    super();
    this.value = value;
    this.options = Array.isArray(options) ? options : [];
    this.from = from;
    this.to = to;
    this.view = view;
    this.name = name;
  }

  eq() {
    return false;
  }

  toDOM() {
    try {
      let wrap = document.createElement('span');
      wrap.setAttribute('aria-hidden', 'true');
      wrap.className = 'cm-selector cm-named-selector';
      wrap.style = 'display:inline-flex;align-items:center;gap:4px;margin-left:8px;';

      // Safety check
      if (!this.name || this.options.length === 0) {
        console.warn('NamedSelectorWidget: missing name or options', this.name, this.options);
        wrap.textContent = `${this.name || 'selector'}: [no options]`;
        return wrap;
      }

      // Label showing selector name
      let label = document.createElement('span');
      label.textContent = this.name + ':';
      label.style = 'font-size:11px;opacity:0.7;';
      wrap.appendChild(label);

      // Dropdown for manual selection
      let select = document.createElement('select');
      select.style = 'font-size:11px;padding:2px 4px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:3px;color:inherit;';
      select.setAttribute('data-selector-name', this.name);

      // Populate options
      this.options.forEach((opt, idx) => {
        let option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        if (opt === this.value) {
          option.selected = true;
        }
        select.appendChild(option);
      });

      select.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        // Broadcast change
        const id = `named_selector_${this.name}`;
        window.postMessage({ type: 'named-selector', value: selectedValue, id });
      });

      wrap.appendChild(select);

      return wrap;
    } catch (error) {
      console.error('NamedSelectorWidget toDOM error:', error);
      let errorSpan = document.createElement('span');
      errorSpan.textContent = '[selector error]';
      return errorSpan;
    }
  }

  ignoreEvent(e) {
    return true;
  }
}

// NEW: Separate widget for named sliders (MIDI controllable)
export class NamedSliderWidget extends WidgetType {
  constructor(value, min, max, from, to, step, view, name) {
    super();
    this.value = value;
    this.min = min;
    this.max = max;
    this.from = from;
    this.to = to;
    this.step = step;
    this.view = view;
    this.name = name;
  }

  eq() {
    return false;
  }

  toDOM() {
    let wrap = document.createElement('span');
    wrap.setAttribute('aria-hidden', 'true');
    wrap.className = 'cm-slider cm-named-slider';
    wrap.style = 'display:inline-flex;align-items:center;gap:4px;margin-left:8px;';

    // Label showing slider name
    let label = wrap.appendChild(document.createElement('span'));
    label.textContent = this.name + ':';
    label.style = 'font-size:11px;opacity:0.7;';

    // Slider input
    let slider = wrap.appendChild(document.createElement('input'));
    slider.type = 'range';
    slider.min = this.min;
    slider.max = this.max;
    slider.step = this.step ?? (this.max - this.min) / 1000;
    slider.value = this.value;
    slider.style = 'width:80px;transform:translateY(0px)';
    slider.setAttribute('data-slider-name', this.name);

    // Value display
    let valueDisplay = wrap.appendChild(document.createElement('span'));
    valueDisplay.textContent = Number(this.value).toFixed(2);
    valueDisplay.style = 'font-size:11px;min-width:40px;opacity:0.7;';

    slider.addEventListener('input', (e) => {
      const next = e.target.value;
      valueDisplay.textContent = Number(next).toFixed(2);

      // Named sliders don't modify code, just broadcast value
      const id = `named_slider_${this.name}`;
      window.postMessage({ type: 'named-slider', value: Number(next), id });
    });

    return wrap;
  }

  ignoreEvent(e) {
    return true;
  }
}

export const setSliderWidgets = StateEffect.define();

export const updateSliderWidgets = (view, widgets) => {
  view.dispatch({ effects: setSliderWidgets.of(widgets) });
};

function getSliders(widgetConfigs, view) {
  return widgetConfigs
    .filter((w) => w.type === 'slider' || w.type === 'named-slider' || w.type === 'named-selector')
    .map(({ from, to, value, min, max, step, type, name, options }) => {
      if (type === 'named-selector') {
        // Use NamedSelectorWidget for named selectors
        return Decoration.widget({
          widget: new NamedSelectorWidget(value, options, from, to, view, name),
          side: 1, // Place widget after the value
        }).range(to);
      } else if (type === 'named-slider') {
        // Use NamedSliderWidget for named sliders
        return Decoration.widget({
          widget: new NamedSliderWidget(value, min, max, from, to, step, view, name),
          side: 1, // Place widget after the value
        }).range(to);
      } else {
        // Use original SliderWidget for inline sliders
        return Decoration.widget({
          widget: new SliderWidget(value, min, max, from, to, step, view),
          side: 0,
        }).range(from);
      }
    });
}

export const sliderPlugin = ViewPlugin.fromClass(
  class {
    decorations; //: DecorationSet

    constructor(view /* : EditorView */) {
      this.decorations = Decoration.set([]);
    }

    update(update /* : ViewUpdate */) {
      update.transactions.forEach((tr) => {
        if (tr.docChanged) {
          // Map decorations to new positions
          this.decorations = this.decorations.map(tr.changes);

          // Update slider positions (original simple logic)
          const iterator = this.decorations.iter();
          while (iterator.value) {
            if (iterator.value?.widget?.slider) {
              iterator.value.widget.slider.from = iterator.from;
              iterator.value.widget.slider.to = iterator.to;
            }
            iterator.next();
          }
        }
        for (let e of tr.effects) {
          if (e.is(setSliderWidgets)) {
            this.decorations = Decoration.set(getSliders(e.value, update.view));
          }
        }
      });
    }
  },
  {
    decorations: (v) => v.decorations,
  },
);

/**
 * Displays a slider widget to allow the user manipulate a value
 *
 * @name slider
 * @param {number} value Initial value
 * @param {number} min Minimum value - optional, defaults to 0
 * @param {number} max Maximum value - optional, defaults to 1
 * @param {number} step Step size - optional
 */
export let slider = (value) => {
  console.warn('slider will only work when the transpiler is used... passing value as is');
  return pure(value);
};
// function transpiled from slider = (value, min, max)
export let sliderWithID = (id, value, min, max) => {
  sliderValues[id] = value; // sync state at eval time (code -> state)
  return ref(() => sliderValues[id]); // use state at query time
};

// function transpiled from namedVar = slider(value, min, max)
export let namedSliderWithID = (id, value, min, max) => {
  namedSliderValues[id] = value; // sync state at eval time (code -> state)
  return ref(() => namedSliderValues[id]); // use state at query time
};

// Export function to get all named sliders for UI
export function getNamedSliders() {
  return namedSliderValues;
}

/**
 * Selector: Allows selecting between discrete options (MIDI controllable)
 * @name select
 * @param {any} value Initial value
 * @param {Array} options Array of possible values
 */
export let select = (value, options = []) => {
  console.warn('select will only work when the transpiler is used... passing value as is');
  return pure(value);
};

// function transpiled from namedVar = select(value, options)
export let selectWithID = (id, value, options) => {
  // Store both the current value and the options
  if (!namedSelectorValues[id]) {
    namedSelectorValues[id] = { value, options };
  }
  // Update value if it changed
  namedSelectorValues[id].value = value;
  namedSelectorValues[id].options = options;

  return ref(() => namedSelectorValues[id].value);
};

// Export function to get all named selectors for UI
export function getNamedSelectors() {
  return namedSelectorValues;
}

// Cache for slider DOM elements to avoid repeated queries
const sliderDOMCache = new Map();
const selectorDOMCache = new Map();

// Update named slider UI from external source (e.g., MIDI CC)
export function updateNamedSliderUI(sliderId, newValue) {
  // Try cache first
  let cachedSlider = sliderDOMCache.get(sliderId);

  if (cachedSlider && document.contains(cachedSlider)) {
    // Use cached reference
    cachedSlider.value = newValue;
    const valueDisplay = cachedSlider.nextElementSibling;
    if (valueDisplay && valueDisplay.tagName === 'SPAN') {
      valueDisplay.textContent = Number(newValue).toFixed(2);
    }
    return;
  }

  // Cache miss or stale - search and update cache
  if (typeof document !== 'undefined') {
    const sliders = document.querySelectorAll('.cm-slider input[type="range"]');
    sliders.forEach((slider) => {
      const sliderName = slider.getAttribute('data-slider-name');
      if (sliderName) {
        const id = `named_slider_${sliderName}`;
        sliderDOMCache.set(id, slider);

        if (id === sliderId) {
          slider.value = newValue;
          const valueDisplay = slider.nextElementSibling;
          if (valueDisplay && valueDisplay.tagName === 'SPAN') {
            valueDisplay.textContent = Number(newValue).toFixed(2);
          }
        }
      }
    });
  }
}

// Update named selector UI from external source (e.g., MIDI select)
export function updateNamedSelectorUI(selectorId, newValue) {
  // Try cache first
  let cachedSelect = selectorDOMCache.get(selectorId);

  if (cachedSelect && document.contains(cachedSelect)) {
    // Use cached reference
    cachedSelect.value = newValue;
    return;
  }

  // Cache miss or stale - search and update cache
  if (typeof document !== 'undefined') {
    const selects = document.querySelectorAll('.cm-selector select');
    selects.forEach((select) => {
      const selectorName = select.getAttribute('data-selector-name');
      if (selectorName) {
        const id = `named_selector_${selectorName}`;
        selectorDOMCache.set(id, select);

        if (id === selectorId) {
          select.value = newValue;
        }
      }
    });
  }
}

// update state when sliders are moved
if (typeof window !== 'undefined') {
  window.addEventListener('message', (e) => {
    if (e.data.type === 'cm-slider') {
      if (sliderValues[e.data.id] !== undefined) {
        // update state when slider is moved
        sliderValues[e.data.id] = e.data.value;
      } else {
        console.warn(`slider with id "${e.data.id}" is not registered. Only ${Object.keys(sliderValues)}`);
      }
    }
    if (e.data.type === 'named-slider') {
      if (namedSliderValues[e.data.id] !== undefined) {
        // update state when named slider is moved
        namedSliderValues[e.data.id] = e.data.value;
        // Also update the UI
        updateNamedSliderUI(e.data.id, e.data.value);
      } else {
        console.warn(`named slider with id "${e.data.id}" is not registered. Only ${Object.keys(namedSliderValues)}`);
      }
    }
    if (e.data.type === 'named-selector') {
      const selectorId = e.data.id;
      if (namedSelectorValues[selectorId]) {
        // update state when named selector is changed
        namedSelectorValues[selectorId].value = e.data.value;
        // Also update the UI
        updateNamedSelectorUI(selectorId, e.data.value);
      } else {
        console.warn(`named selector with id "${selectorId}" is not registered. Only ${Object.keys(namedSelectorValues)}`);
      }
    }
  });
}
