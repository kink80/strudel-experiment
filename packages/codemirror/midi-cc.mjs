/*
midi-cc.mjs - MIDI CC (Control Change) manager for named sliders
Copyright (C) 2024 Strudel contributors - see <https://codeberg.org/uzu/strudel>
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { namedSliderValues, updateNamedSliderUI } from './slider.mjs';

// Mapping of CC number -> slider ID
let ccMappings = {}; // e.g., { 1: 'named_slider_cutoff', 74: 'named_slider_resonance' }

// Slider metadata (min, max values for scaling)
let sliderMetadata = {}; // e.g., { 'named_slider_cutoff': { min: 100, max: 5000 } }

// Active MIDI input device
let activeMidiInput = null;

// Enabled state
let midiCCEnabled = false;

// Callbacks for UI updates
let onValueChangeCallback = null;
let onMappingChangeCallback = null;

/**
 * Scale MIDI CC value (0-127) to slider range (min-max)
 */
function scaleCC(ccValue, min, max) {
  return min + (ccValue / 127) * (max - min);
}

/**
 * Handle incoming MIDI CC message
 */
function handleControlChange(event) {
  if (!midiCCEnabled) return;

  const ccNumber = event.controller.number;
  const ccValue = event.value;

  // Broadcast CC for learn mode (always, even if not mapped)
  if (typeof window !== 'undefined') {
    window.postMessage({ type: 'midi-cc-learn', ccNumber, ccValue });
  }

  // Check if this CC is mapped to a slider
  const sliderId = ccMappings[ccNumber];
  if (!sliderId) return;

  // Check if slider exists
  if (namedSliderValues[sliderId] === undefined) {
    console.warn(`MIDI CC ${ccNumber} is mapped to ${sliderId}, but slider not found`);
    return;
  }

  // Get slider metadata for scaling
  const metadata = sliderMetadata[sliderId];
  if (!metadata) {
    console.warn(`No metadata found for slider ${sliderId}`);
    return;
  }

  // Scale CC value to slider range
  const scaledValue = scaleCC(ccValue, metadata.min, metadata.max);

  // Update the slider value and UI
  updateNamedSliderUI(sliderId, scaledValue);

  // Notify UI callback if registered
  if (onValueChangeCallback) {
    onValueChangeCallback(sliderId, scaledValue);
  }

  // Post message for consistency with manual slider updates
  if (typeof window !== 'undefined') {
    window.postMessage({ type: 'named-slider', value: scaledValue, id: sliderId });
  }
}

/**
 * Enable MIDI CC control
 * @param {Object} midiInput - WebMidi input device
 */
export function enableMidiCC(midiInput) {
  if (!midiInput) {
    console.warn('No MIDI input provided to enableMidiCC');
    return;
  }

  // Remove listener from previous device if any
  if (activeMidiInput) {
    activeMidiInput.removeListener('controlchange', handleControlChange);
  }

  // Add listener to new device
  midiInput.addListener('controlchange', handleControlChange);
  activeMidiInput = midiInput;
  midiCCEnabled = true;

  console.log(`MIDI CC enabled for device: ${midiInput.name}`);
}

/**
 * Disable MIDI CC control
 */
export function disableMidiCC() {
  if (activeMidiInput) {
    activeMidiInput.removeListener('controlchange', handleControlChange);
    activeMidiInput = null;
  }
  midiCCEnabled = false;
  console.log('MIDI CC disabled');
}

/**
 * Set CC to slider mapping
 * @param {number} ccNumber - MIDI CC number (0-127)
 * @param {string} sliderId - Named slider ID (e.g., 'named_slider_cutoff')
 * @param {Object} metadata - { min, max } range for the slider
 */
export function setMapping(ccNumber, sliderId, metadata = null) {
  if (ccNumber < 0 || ccNumber > 127) {
    console.error(`Invalid CC number: ${ccNumber}. Must be 0-127.`);
    return;
  }

  ccMappings[ccNumber] = sliderId;

  if (metadata) {
    sliderMetadata[sliderId] = metadata;
  }

  if (onMappingChangeCallback) {
    onMappingChangeCallback(ccMappings);
  }

  console.log(`Mapped CC ${ccNumber} -> ${sliderId}`, metadata);
}

/**
 * Remove a specific CC mapping
 * @param {number} ccNumber - MIDI CC number to unmap
 */
export function removeMapping(ccNumber) {
  delete ccMappings[ccNumber];

  if (onMappingChangeCallback) {
    onMappingChangeCallback(ccMappings);
  }
}

/**
 * Clear all CC mappings
 */
export function clearMappings() {
  ccMappings = {};
  sliderMetadata = {};

  if (onMappingChangeCallback) {
    onMappingChangeCallback(ccMappings);
  }

  console.log('All MIDI CC mappings cleared');
}

/**
 * Get current CC mappings
 * @returns {Object} Current mappings
 */
export function getMappings() {
  return { ...ccMappings };
}

/**
 * Get slider metadata
 * @returns {Object} Slider metadata
 */
export function getSliderMetadata() {
  return { ...sliderMetadata };
}

/**
 * Check if MIDI CC is enabled
 * @returns {boolean}
 */
export function isEnabled() {
  return midiCCEnabled;
}

/**
 * Register callback for value changes
 * @param {Function} callback - Called with (sliderId, newValue)
 */
export function onValueChange(callback) {
  onValueChangeCallback = callback;
}

/**
 * Register callback for mapping changes
 * @param {Function} callback - Called with (mappings)
 */
export function onMappingChange(callback) {
  onMappingChangeCallback = callback;
}

/**
 * Get active MIDI input device
 * @returns {Object|null}
 */
export function getActiveMidiInput() {
  return activeMidiInput;
}

/**
 * Set slider metadata for scaling CC values
 * @param {string} sliderId - Slider ID
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 */
export function setSliderMetadata(sliderId, min, max) {
  sliderMetadata[sliderId] = { min, max };
}

/**
 * Discover all available named sliders
 * @returns {Array} Array of {id, currentValue}
 */
export function getAvailableSliders() {
  return Object.keys(namedSliderValues).map(id => ({
    id,
    currentValue: namedSliderValues[id]
  }));
}
