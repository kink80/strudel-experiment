/*
midi.mjs - <short description TODO>
Copyright (C) 2022 Strudel contributors - see <https://codeberg.org/uzu/strudel/src/branch/main/packages/midi/midi.mjs>
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import * as _WebMidi from 'webmidi';
import { Pattern, isPattern, logger, ref } from '@strudel/core';
import { noteToMidi, getControlName } from '@strudel/core';
import { Note } from 'webmidi';
import { scheduleAtTime } from '../superdough/helpers.mjs';

// if you use WebMidi from outside of this package, make sure to import that instance:
export const { WebMidi } = _WebMidi;

function supportsMidi() {
  return typeof navigator.requestMIDIAccess === 'function';
}

function getMidiDeviceNamesString(devices) {
  return devices.map((o) => `'${o.name}'`).join(' | ');
}

export function enableWebMidi(options = {}) {
  const { onReady, onConnected, onDisconnected, onEnabled } = options;
  if (WebMidi.enabled) {
    return;
  }
  if (!supportsMidi()) {
    throw new Error('Your Browser does not support WebMIDI.');
  }
  WebMidi.addListener('connected', () => {
    onConnected?.(WebMidi);
  });
  WebMidi.addListener('enabled', () => {
    onEnabled?.(WebMidi);
  });
  // Reacting when a device becomes unavailable
  WebMidi.addListener('disconnected', (e) => {
    onDisconnected?.(WebMidi, e);
  });
  return new Promise((resolve, reject) => {
    if (WebMidi.enabled) {
      // if already enabled, just resolve WebMidi
      resolve(WebMidi);
      return;
    }
    WebMidi.enable(
      (err) => {
        if (err) {
          reject(err);
        }
        onReady?.(WebMidi);
        resolve(WebMidi);
      },
      { sysex: true },
    );
  });
}

function getDevice(indexOrName, devices) {
  if (!devices.length) {
    throw new Error(`🔌 No MIDI devices found. Connect a device or enable IAC Driver.`);
  }
  if (typeof indexOrName === 'number') {
    return devices[indexOrName];
  }
  const byName = (name) => devices.find((output) => output.name.includes(name));
  if (typeof indexOrName === 'string') {
    return byName(indexOrName);
  }
  // attempt to default to first IAC device if none is specified
  const IACOutput = byName('IAC');
  const device = IACOutput ?? devices[0];
  if (!device) {
    throw new Error(
      `🔌 MIDI device '${device ? device : ''}' not found. Use one of ${getMidiDeviceNamesString(devices)}`,
    );
  }

  return IACOutput ?? devices[0];
}

// send start/stop messages to outputs when repl starts/stops
if (typeof window !== 'undefined') {
  window.addEventListener('message', (e) => {
    if (!WebMidi?.enabled) {
      return;
    }
    if (e.data === 'strudel-stop') {
      WebMidi.outputs.forEach((output) => output.sendStop());
    }
    // cannot start here, since we have no timing info, see sendStart below
  });
}

// registry for midi mappings, converting control names to cc messages
export const midicontrolMap = new Map();

// takes midimap and converts each control key to the main control name
function unifyMapping(mapping) {
  return Object.fromEntries(
    Object.entries(mapping).map(([key, mapping]) => {
      if (typeof mapping === 'number') {
        mapping = { ccn: mapping };
      }
      return [getControlName(key), mapping];
    }),
  );
}

function githubPath(base, subpath = '') {
  if (!base.startsWith('github:')) {
    throw new Error('expected "github:" at the start of pseudoUrl');
  }
  let [_, path] = base.split('github:');
  path = path.endsWith('/') ? path.slice(0, -1) : path;
  if (path.split('/').length === 2) {
    // assume main as default branch if none set
    path += '/main';
  }
  return `https://raw.githubusercontent.com/${path}/${subpath}`;
}

/**
 * configures the default midimap, which is used when no "midimap" port is set
 * @example
 * defaultmidimap({ lpf: 74 })
 * $: note("c a f e").midi();
 * $: lpf(sine.slow(4).segment(16)).midi();
 */
export function defaultmidimap(mapping) {
  midicontrolMap.set('default', unifyMapping(mapping));
}

let loadCache = {};

/**
 * Adds midimaps to the registry. Inside each midimap, control names (e.g. lpf) are mapped to cc numbers.
 * @example
 * midimaps({ mymap: { lpf: 74 } })
 * $: note("c a f e")
 * .lpf(sine.slow(4))
 * .midimap('mymap')
 * .midi()
 * @example
 * midimaps({ mymap: {
 *   lpf: { ccn: 74, min: 0, max: 20000, exp: 0.5 }
 * }})
 * $: note("c a f e")
 * .lpf(sine.slow(2).range(400,2000))
 * .midimap('mymap')
 * .midi()
 */
export async function midimaps(map) {
  if (typeof map === 'string') {
    if (map.startsWith('github:')) {
      map = githubPath(map, 'midimap.json');
    }
    if (!loadCache[map]) {
      loadCache[map] = fetch(map).then((res) => res.json());
    }
    map = await loadCache[map];
  }
  if (typeof map === 'object') {
    Object.entries(map).forEach(([name, mapping]) => midicontrolMap.set(name, unifyMapping(mapping)));
  }
}

// registry for midi sounds, converting sound names to controls
export const midisoundMap = new Map();

// normalizes the given value from the given range and exponent
function normalize(value = 0, min = 0, max = 1, exp = 1) {
  if (min === max) {
    throw new Error('min and max cannot be the same value');
  }
  let normalized = (value - min) / (max - min);
  normalized = Math.min(1, Math.max(0, normalized));
  return Math.pow(normalized, exp);
}

function mapCC(mapping, value) {
  return Object.keys(value)
    .filter((key) => !!mapping[getControlName(key)])
    .map((key) => {
      const { ccn, min = 0, max = 1, exp = 1 } = mapping[key];
      const ccv = normalize(value[key], min, max, exp);
      return { ccn, ccv };
    });
}

// sends a cc message to the given device on the given channel
function sendCC(ccn, ccv, device, midichan, targetTime) {
  if (typeof ccv !== 'number' || ccv < 0 || ccv > 1) {
    throw new Error('expected ccv to be a number between 0 and 1');
  }
  if (!['string', 'number'].includes(typeof ccn)) {
    throw new Error('expected ccn to be a number or a string');
  }
  const scaled = Math.round(ccv * 127);
  scheduleAtTime(() => {
    device.sendControlChange(ccn, scaled, midichan);
  }, targetTime);
}

// sends a program change message to the given device on the given channel
function sendProgramChange(progNum, device, midichan, targetTime) {
  if (typeof progNum !== 'number' || progNum < 0 || progNum > 127) {
    throw new Error('expected progNum (program change) to be a number between 0 and 127');
  }
  scheduleAtTime(() => {
    device.sendProgramChange(progNum, midichan);
  }, targetTime);
}

// sends a sysex message to the given device on the given channel
function sendSysex(sysexid, sysexdata, device, targetTime) {
  if (Array.isArray(sysexid)) {
    if (!sysexid.every((byte) => Number.isInteger(byte) && byte >= 0 && byte <= 255)) {
      throw new Error('all sysexid bytes must be integers between 0 and 255');
    }
  } else if (!Number.isInteger(sysexid) || sysexid < 0 || sysexid > 255) {
    throw new Error('A:sysexid must be an number between 0 and 255 or an array of such integers');
  }

  if (!Array.isArray(sysexdata)) {
    throw new Error('expected sysex to be an array of numbers (0-255)');
  }
  if (!sysexdata.every((byte) => Number.isInteger(byte) && byte >= 0 && byte <= 255)) {
    throw new Error('all sysex bytes must be integers between 0 and 255');
  }
  scheduleAtTime(() => {
    device.sendSysex(sysexid, sysexdata);
  }, targetTime);
}

// sends a NRPN message to the given device on the given channel
function sendNRPN(nrpnn, nrpv, device, midichan, targetTime) {
  if (Array.isArray(nrpnn)) {
    if (!nrpnn.every((byte) => Number.isInteger(byte) && byte >= 0 && byte <= 255)) {
      throw new Error('all nrpnn bytes must be integers between 0 and 255');
    }
  } else if (!Number.isInteger(nrpv) || nrpv < 0 || nrpv > 255) {
    throw new Error('A:sysexid must be an number between 0 and 255 or an array of such integers');
  }
  scheduleAtTime(() => {
    device.sendNRPN(nrpnn, nrpv, midichan);
  }, targetTime);
}

// sends a pitch bend message to the given device on the given channel
function sendPitchBend(midibend, device, midichan, targetTime) {
  if (typeof midibend !== 'number' || midibend < -1 || midibend > 1) {
    throw new Error('expected midibend to be a number between -1 and 1');
  }
  scheduleAtTime(() => {
    device.sendPitchBend(midibend, midichan);
  }, targetTime);
}

// sends a channel aftertouch message to the given device on the given channel
function sendAftertouch(miditouch, device, midichan, targetTime) {
  if (typeof miditouch !== 'number' || miditouch < 0 || miditouch > 1) {
    throw new Error('expected miditouch to be a number between 0 and 1');
  }

  scheduleAtTime(() => {
    device.sendChannelAftertouch(miditouch, midichan);
  }, targetTime);
}

// sends a note message to the given device on the given channel
function sendNote(note, velocity, duration, device, midichan, targetTime) {
  if (note == null || note === '') {
    throw new Error('note cannot be null or empty');
  }
  if (velocity != null && (typeof velocity !== 'number' || velocity < 0 || velocity > 1)) {
    throw new Error('velocity must be a number between 0 and 1');
  }
  if (duration != null && (typeof duration !== 'number' || duration < 0)) {
    throw new Error('duration must be a positive number');
  }
  const midiNumber = typeof note === 'number' ? note : noteToMidi(note);
  const midiNote = new Note(midiNumber, { attack: velocity, duration });

  scheduleAtTime(() => {
    device.playNote(midiNote, midichan);
  }, targetTime);
}

/**
 * MIDI output: Opens a MIDI output port.
 * @param {string | number} midiport MIDI device name or index defaulting to 0
 * @param {object} options Additional MIDI configuration options
 * @example
 * note("c4").midichan(1).midi('IAC Driver Bus 1')
 * @example
 * note("c4").midichan(1).midi('IAC Driver Bus 1', { controller: true, latency: 50 })
 */

Pattern.prototype.midi = function (midiport, options = {}) {
  if (isPattern(midiport)) {
    throw new Error(
      `.midi does not accept Pattern input for midiport. Make sure to pass device name with single quotes. Example: .midi('${
        WebMidi.outputs?.[0]?.name || 'IAC Driver Bus 1'
      }')`,
    );
  }

  // For backward compatibility
  if (typeof midiport === 'object') {
    const { port, isController = false, ...configOptions } = midiport;
    options = {
      isController,
      ...configOptions,
      ...options, // Keep any options passed separately
    };
    midiport = port;
  }

  let midiConfig = {
    // Default configuration values
    isController: false, // Disable sending notes for midi controllers
    noteOffsetMs: 10, // Default note-off offset to prevent glitching in ms
    midichannel: 1, // Default MIDI channel
    velocity: 0.9, // Default velocity
    gain: 1, // Default gain
    midimap: 'default', // Default MIDI map
    midiport: midiport, // Store the port in the config
    ...options, // Override defaults with provided options
  };

  enableWebMidi({
    onEnabled: ({ outputs }) => {
      const device = getDevice(midiConfig.midiport, outputs);
      const otherOutputs = outputs.filter((o) => o.name !== device.name);
      logger(
        `Midi enabled! Using "${device.name}". ${
          otherOutputs?.length ? `Also available: ${getMidiDeviceNamesString(otherOutputs)}` : ''
        }`,
      );
    },
    onDisconnected: ({ outputs }) =>
      logger(`Midi device disconnected! Available: ${getMidiDeviceNamesString(outputs)}`),
  });

  return this.onTrigger((hap, _currentTime, cps, targetTime) => {
    if (!WebMidi.enabled) {
      logger('Midi not enabled');
      return;
    }
    hap.ensureObjectValue();

    // midi event values from hap with configurable defaults
    let {
      note,
      nrpnn,
      nrpv,
      ccn,
      ccv,
      midichan = midiConfig.midichannel,
      midicmd,
      midibend,
      miditouch,
      polyTouch,
      gain = midiConfig.gain,
      velocity = midiConfig.velocity,
      progNum,
      sysexid,
      sysexdata,
      midimap = midiConfig.midimap,
      midiport = midiConfig.midiport,
    } = hap.value;

    const device = getDevice(midiport, WebMidi.outputs);
    if (!device) {
      logger(
        `[midi] midiport "${midiport}" not found! available: ${WebMidi.outputs.map((output) => `'${output.name}'`).join(', ')}`,
      );
      return;
    }

    velocity = gain * velocity;

    // Handle midimap
    // if midimap is set, send a cc messages from defined controls
    if (midicontrolMap.has(midimap)) {
      const ccs = mapCC(midicontrolMap.get(midimap), hap.value);
      ccs.forEach(({ ccn, ccv }) => sendCC(ccn, ccv, device, midichan, targetTime));
    } else if (midimap !== 'default') {
      // Add warning when a non-existent midimap is specified
      logger(`[midi] midimap "${midimap}" not found! Available maps: ${[...midicontrolMap.keys()].join(', ')}`);
    }

    // Handle note
    if (note !== undefined && !midiConfig.isController) {
      // note off messages will often a few ms arrive late,
      // try to prevent glitching by subtracting noteOffsetMs from the duration length
      const duration = (hap.duration.valueOf() / cps) * 1000 - midiConfig.noteOffsetMs;

      sendNote(note, velocity, duration, device, midichan, targetTime);
    }

    // Handle program change
    if (progNum !== undefined) {
      sendProgramChange(progNum, device, midichan, targetTime);
    }

    // Handle sysex
    // sysex data is consist of 2 arrays, first is sysexid, second is sysexdata
    // sysexid is a manufacturer id it is either a number or an array of 3 numbers.
    // list of manufacturer ids can be found here : https://midi.org/sysexidtable
    // if sysexid is an array the first byte is 0x00

    if (sysexid !== undefined && sysexdata !== undefined) {
      sendSysex(sysexid, sysexdata, device, targetTime);
    }

    // Handle control change
    if (ccv !== undefined && ccn !== undefined) {
      sendCC(ccn, ccv, device, midichan, targetTime);
    }

    // Handle NRPN non-registered parameter number
    if (nrpnn !== undefined && nrpv !== undefined) {
      sendNRPN(nrpnn, nrpv, device, midichan, targetTime);
    }

    // Handle midibend
    if (midibend !== undefined) {
      sendPitchBend(midibend, device, midichan, targetTime);
    }

    // Handle miditouch
    if (miditouch !== undefined) {
      sendAftertouch(miditouch, device, midichan, targetTime);
    }

    // Handle midicmd
    if (hap.whole.begin + 0 === 0) {
      // we need to start here because we have the timing info
      scheduleAtTime(() => {
        device.sendStart();
      }, targetTime);
    }
    if (['clock', 'midiClock'].includes(midicmd)) {
      scheduleAtTime(() => {
        device.sendClock();
      }, targetTime);
    } else if (['start'].includes(midicmd)) {
      scheduleAtTime(() => {
        device.sendStart();
      }, targetTime);
    } else if (['stop'].includes(midicmd)) {
      scheduleAtTime(() => {
        device.sendStop();
      }, targetTime);
    } else if (['continue'].includes(midicmd)) {
      scheduleAtTime(() => {
        device.sendContinue();
      }, targetTime);
    } else if (Array.isArray(midicmd)) {
      if (midicmd[0] === 'progNum') {
        sendProgramChange(midicmd[1], device, midichan, targetTime);
      } else if (midicmd[0] === 'cc') {
        if (midicmd.length === 2) {
          sendCC(midicmd[0], midicmd[1] / 127, device, midichan, targetTime);
        }
      } else if (midicmd[0] === 'sysex') {
        if (midicmd.length === 3) {
          const [_, id, data] = midicmd;
          sendSysex(id, data, device, targetTime);
        }
      }
    }
  });
};

let listeners = {};
const refs = {};
const ccSliderListeners = {};
const ccSliderMappings = {};

/**
 * MIDI input: Opens a MIDI input port to receive MIDI control change messages.
 * @param {string | number} input MIDI device name or index defaulting to 0
 * @returns {Function}
 * @example
 * let cc = await midin('IAC Driver Bus 1')
 * note("c a f e").lpf(cc(0).range(0, 1000)).lpq(cc(1).range(0, 10)).sound("sawtooth")
 */
export async function midin(input) {
  if (isPattern(input)) {
    throw new Error(
      `midin: does not accept Pattern as input. Make sure to pass device name with single quotes. Example: midin('${
        WebMidi.outputs?.[0]?.name || 'IAC Driver Bus 1'
      }')`,
    );
  }
  const initial = await enableWebMidi(); // only returns on first init
  const device = getDevice(input, WebMidi.inputs);
  if (!device) {
    throw new Error(
      `midiin: device "${input}" not found.. connected devices: ${getMidiDeviceNamesString(WebMidi.inputs)}`,
    );
  }
  if (initial) {
    const otherInputs = WebMidi.inputs.filter((o) => o.name !== device.name);
    logger(
      `Midi enabled! Using "${device.name}". ${
        otherInputs?.length ? `Also available: ${getMidiDeviceNamesString(otherInputs)}` : ''
      }`,
    );
  }
  // ensure refs for this input are initialized
  if (!refs[input]) {
    refs[input] = {};
  }
  const cc = (cc) => ref(() => refs[input][cc] || 0);

  listeners[input] && device.removeListener('midimessage', listeners[input]);
  listeners[input] = (e) => {
    const cc = e.dataBytes[0];
    const v = e.dataBytes[1];
    refs[input] && (refs[input][cc] = v / 127);
  };
  device.addListener('midimessage', listeners[input]);
  return cc;
}

/**
 * MIDI CC Control for Named Sliders: Maps MIDI CC messages to named sliders in code
 * @param {string | number} input MIDI device name or index defaulting to 0
 * @param {Object} mappings Object mapping CC numbers to slider names, e.g., { 74: 'cutoff', 1: 'resonance' }
 * @returns {Object} Control object with methods: setMapping, clearMappings, getMappings, setSliderMetadata
 * @example
 * // Basic usage - map CC 74 to cutoff slider, CC 1 to resonance slider
 * await midicc('MS-20i', { 74: 'cutoff', 1: 'resonance' })
 *
 * cutoff = slider(1000, 100, 5000)
 * resonance = slider(0.5, 0, 1)
 * s("bd sd").lpf(cutoff).resonance(resonance)
 *
 * @example
 * // Dynamic mapping with configuration
 * const cc = await midicc('MS-20i')
 * cc.setMapping(74, 'cutoff', { min: 100, max: 5000 })
 * cc.setMapping(1, 'resonance', { min: 0, max: 1 })
 */
export async function midicc(input, mappings = {}) {
  if (isPattern(input)) {
    throw new Error(
      `midicc: does not accept Pattern as input. Make sure to pass device name with single quotes. Example: midicc('${
        WebMidi.inputs?.[0]?.name || 'MS-20i'
      }')`,
    );
  }

  const initial = await enableWebMidi();
  const device = getDevice(input, WebMidi.inputs);

  if (!device) {
    throw new Error(
      `midicc: device "${input}" not found.. connected devices: ${getMidiDeviceNamesString(WebMidi.inputs)}`,
    );
  }

  if (initial) {
    const otherInputs = WebMidi.inputs.filter((o) => o.name !== device.name);
    logger(
      `MIDI CC enabled! Using "${device.name}". ${
        otherInputs?.length ? `Also available: ${getMidiDeviceNamesString(otherInputs)}` : ''
      }`,
    );
  }

  // Initialize mappings storage for this input
  if (!ccSliderMappings[input]) {
    ccSliderMappings[input] = {};
  }

  // Metadata storage (min/max for scaling)
  // Shared across all instances for this input device
  if (!ccSliderMappings[`${input}_metadata`]) {
    ccSliderMappings[`${input}_metadata`] = {};
  }
  const sliderMetadata = ccSliderMappings[`${input}_metadata`];

  // Apply initial mappings
  Object.entries(mappings).forEach(([ccNum, config]) => {
    let sliderName, inputMin = 0, inputMax = 127;

    if (typeof config === 'string') {
      // Simple mapping: 74: 'cutoff'
      sliderName = config;
    } else if (typeof config === 'object') {
      // Extended mapping: 74: { slider: 'cutoff', inputMin: 0, inputMax: 10 }
      sliderName = config.slider;
      inputMin = config.inputMin ?? 0;
      inputMax = config.inputMax ?? 127;
    }

    const sliderId = `named_slider_${sliderName}`;
    ccSliderMappings[input][ccNum] = { sliderId, sliderName, inputMin, inputMax };
  });

  // Listen for widget metadata from transpiler
  if (typeof window !== 'undefined') {
    const metadataHandler = (e) => {
      if (e.data.type === 'widgets-metadata' && e.data.widgets) {
        // Update metadata for all named sliders
        e.data.widgets
          .filter((w) => w.type === 'named-slider')
          .forEach((w) => {
            const sliderId = `named_slider_${w.name}`;
            sliderMetadata[sliderId] = { min: w.min, max: w.max };
          });
      }
    };
    window.addEventListener('message', metadataHandler);
  }

  // Remove old listener if exists
  if (ccSliderListeners[input]) {
    device.removeListener('controlchange', ccSliderListeners[input]);
  }

  // Create control change listener
  ccSliderListeners[input] = (e) => {
    const ccNumber = e.controller.number;
    const ccValue = e.value; // 0-127 from MIDI controller
    const mapping = ccSliderMappings[input][ccNumber];

    if (!mapping) return;

    const { sliderId, inputMin, inputMax } = mapping;

    // Broadcast for UI learn mode
    if (typeof window !== 'undefined') {
      window.postMessage({ type: 'midi-cc-activity', ccNumber, ccValue });
    }

    // Get metadata for scaling
    const metadata = sliderMetadata[sliderId];
    if (!metadata) {
      console.warn(`MIDI CC ${ccNumber} mapped to ${sliderId}, but no metadata found. Did you evaluate the slider code first?`);
      return;
    }

    // First: Normalize CC value from input range to 0-1
    const normalizedInput = Math.max(0, Math.min(1, (ccValue - inputMin) / (inputMax - inputMin)));

    // Second: Scale normalized value to slider range
    const scaledValue = metadata.min + normalizedInput * (metadata.max - metadata.min);

    // Update slider via message passing (slider.mjs listens for this)
    if (typeof window !== 'undefined') {
      window.postMessage({
        type: 'named-slider',
        value: scaledValue,
        id: sliderId
      });
    }
  };

  device.addListener('controlchange', ccSliderListeners[input]);

  // Return control object with helper methods
  return {
    /**
     * Set a CC to slider mapping
     * @param {number} ccNumber - MIDI CC number (0-127)
     * @param {string} sliderName - Slider variable name (without 'named_slider_' prefix)
     * @param {Object} options - Optional {min, max, inputMin, inputMax}
     */
    setMapping(ccNumber, sliderName, options = null) {
      const sliderId = `named_slider_${sliderName}`;
      const inputMin = options?.inputMin ?? 0;
      const inputMax = options?.inputMax ?? 127;

      ccSliderMappings[input][ccNumber] = { sliderId, sliderName, inputMin, inputMax };

      if (options && (options.min !== undefined || options.max !== undefined)) {
        sliderMetadata[sliderId] = { min: options.min, max: options.max };
      }

      logger(`Mapped CC ${ccNumber} -> ${sliderName} (input: ${inputMin}-${inputMax})`, options);
      return this;
    },

    /**
     * Remove a CC mapping
     * @param {number} ccNumber - CC number to unmap
     */
    removeMapping(ccNumber) {
      delete ccSliderMappings[input][ccNumber];
      return this;
    },

    /**
     * Clear all mappings
     */
    clearMappings() {
      ccSliderMappings[input] = {};
      logger('Cleared all MIDI CC mappings');
      return this;
    },

    /**
     * Get current mappings
     * @returns {Object} Current CC mappings
     */
    getMappings() {
      return { ...ccSliderMappings[input] };
    },

    /**
     * Set slider metadata for CC value scaling
     * @param {string} sliderName - Slider variable name
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     */
    setSliderMetadata(sliderName, min, max) {
      const sliderId = `named_slider_${sliderName}`;
      sliderMetadata[sliderId] = { min, max };
      return this;
    },

    /**
     * Get slider metadata
     * @returns {Object} Slider metadata
     */
    getSliderMetadata() {
      return { ...sliderMetadata };
    },

    /**
     * Get device info
     */
    getDevice() {
      return device;
    },
  };
}

/**
 * Get all MIDI CC mappings (for UI introspection)
 */
export function getMidiCCMappings() {
  return ccSliderMappings;
}

// Storage for midiselect
const ccSelectorListeners = {};
const ccSelectorMappings = {};

/**
 * MIDI CC Control for Discrete Selectors: Maps MIDI CC messages to discrete options
 * @param {string | number} input MIDI device name or index defaulting to 0
 * @param {Object} mappings Object mapping CC numbers to selector config, e.g., { 16: { selector: 'sound', options: ['saw', 'sin', 'square'] } }
 * @returns {Object} Control object with methods: setMapping, clearMappings, getMappings
 * @example
 * // Map CC 16 to sound selector with 4 options
 * await midiselect('MS-20 Controller', {
 *   16: { selector: 'sound', options: ['sawtooth', 'sine', 'square', 'triangle'] }
 * })
 *
 * sound = select("sawtooth", ["sawtooth", "sine", "square", "triangle"])
 * s("bd sd").sound(sound)
 */
export async function midiselect(input, mappings = {}) {
  if (isPattern(input)) {
    throw new Error(
      `midiselect: does not accept Pattern as input. Make sure to pass device name with single quotes. Example: midiselect('${
        WebMidi.inputs?.[0]?.name || 'MS-20 Controller'
      }')`,
    );
  }

  const initial = await enableWebMidi();
  const device = getDevice(input, WebMidi.inputs);

  if (!device) {
    throw new Error(
      `midiselect: device "${input}" not found.. connected devices: ${getMidiDeviceNamesString(WebMidi.inputs)}`,
    );
  }

  if (initial) {
    const otherInputs = WebMidi.inputs.filter((o) => o.name !== device.name);
    logger(
      `MIDI Select enabled! Using "${device.name}". ${
        otherInputs?.length ? `Also available: ${getMidiDeviceNamesString(otherInputs)}` : ''
      }`,
    );
  }

  // Initialize mappings storage for this input
  if (!ccSelectorMappings[input]) {
    ccSelectorMappings[input] = {};
  }

  // Apply initial mappings
  Object.entries(mappings).forEach(([ccNum, config]) => {
    const { selector: selectorName, options } = config;
    const selectorId = `named_selector_${selectorName}`;
    ccSelectorMappings[input][Number(ccNum)] = { selectorId, selectorName, options };
  });

  // Listen for widget metadata from transpiler
  if (typeof window !== 'undefined') {
    const metadataHandler = (e) => {
      if (e.data.type === 'widgets-metadata' && e.data.widgets) {
        // Update options for all named selectors
        e.data.widgets
          .filter((w) => w.type === 'named-selector')
          .forEach((w) => {
            const selectorId = `named_selector_${w.name}`;
            // Find mappings that use this selector and update their options
            Object.values(ccSelectorMappings).forEach((deviceMappings) => {
              Object.values(deviceMappings).forEach((mapping) => {
                if (mapping.selectorId === selectorId) {
                  mapping.options = w.options;
                }
              });
            });
          });
      }
    };
    window.addEventListener('message', metadataHandler);
  }

  // Remove old listener if exists
  if (ccSelectorListeners[input]) {
    device.removeListener('controlchange', ccSelectorListeners[input]);
  }

  // Create control change listener
  ccSelectorListeners[input] = (e) => {
    const ccNumber = e.controller.number;
    const ccValue = e.rawValue; // Use rawValue (0-127), not e.value (0-1)
    const mapping = ccSelectorMappings[input][ccNumber];

    if (!mapping) return;

    const { selectorId, options } = mapping;

    // Broadcast for UI learn mode
    if (typeof window !== 'undefined') {
      window.postMessage({ type: 'midi-cc-activity', ccNumber, ccValue });
    }

    if (!options || options.length === 0) {
      console.warn(`MIDI CC ${ccNumber} mapped to ${selectorId}, but no options found. Did you evaluate the select code first?`);
      return;
    }

    // Map CC value (0-127) to option index
    // Divide CC range equally among options
    const index = Math.min(Math.floor((ccValue / 128) * options.length), options.length - 1);
    const selectedValue = options[index];

    // Update selector via message passing
    if (typeof window !== 'undefined') {
      window.postMessage({
        type: 'named-selector',
        value: selectedValue,
        id: selectorId
      });
    }
  };

  device.addListener('controlchange', ccSelectorListeners[input]);

  // Return control object with helper methods
  return {
    /**
     * Set a CC to selector mapping
     * @param {number} ccNumber - MIDI CC number (0-127)
     * @param {string} selectorName - Selector variable name
     * @param {Array} options - Array of possible values
     */
    setMapping(ccNumber, selectorName, options) {
      const selectorId = `named_selector_${selectorName}`;
      ccSelectorMappings[input][ccNumber] = { selectorId, selectorName, options };
      logger(`Mapped CC ${ccNumber} -> ${selectorName} with ${options.length} options`);
      return this;
    },

    /**
     * Remove a CC mapping
     * @param {number} ccNumber - CC number to unmap
     */
    removeMapping(ccNumber) {
      delete ccSelectorMappings[input][ccNumber];
      return this;
    },

    /**
     * Clear all mappings
     */
    clearMappings() {
      ccSelectorMappings[input] = {};
      logger('Cleared all MIDI selector mappings');
      return this;
    },

    /**
     * Get current mappings
     * @returns {Object} Current CC mappings
     */
    getMappings() {
      return { ...ccSelectorMappings[input] };
    },

    /**
     * Get device info
     */
    getDevice() {
      return device;
    },
  };
}

/**
 * Get all MIDI Select mappings (for UI introspection)
 */
export function getMidiSelectMappings() {
  return ccSelectorMappings;
}
