/*
recorder.mjs - Core MIDI recording engine
Copyright (C) 2024 Strudel contributors - see <https://codeberg.org/uzu/strudel>
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { createMetronome } from './metronome.mjs';
import { quantize } from './quantize.mjs';
import { generateStrudelCode, generatePatternVariations } from './pattern-generator.mjs';
import { WebMidi } from 'webmidi';

/**
 * Recording states
 */
export const RecordingState = {
  IDLE: 'idle',
  READY: 'ready', // Pre-roll countdown
  RECORDING: 'recording',
  STOPPED: 'stopped',
};

/**
 * Creates a MIDI pattern recorder
 * @param {Object} options - Configuration options
 * @param {number} options.bpm - Beats per minute (default: 120)
 * @param {number} options.patternLength - Number of steps in pattern (default: 16)
 * @param {number} options.stepsPerBeat - Subdivision (default: 4 for 16th notes)
 * @param {string|number} options.midiDevice - MIDI input device name or index
 * @param {Function} options.getAudioContext - Function that returns AudioContext
 * @param {Function} options.onStateChange - Callback when state changes
 * @param {Function} options.onNoteEvent - Callback when MIDI note received
 * @param {Function} options.onStep - Callback on each metronome step
 * @returns {Object} Recorder instance
 */
export function createRecorder(options = {}) {
  const {
    bpm = 120,
    patternLength = 16,
    stepsPerBeat = 4,
    midiDevice = null,
    getAudioContext,
    onStateChange,
    onNoteEvent,
    onStep,
  } = options;

  // State
  let _state = RecordingState.IDLE;
  let _bpm = bpm;
  let _patternLength = patternLength;
  let _stepsPerBeat = stepsPerBeat;
  let _midiDevice = midiDevice;
  let _midiInput = null;
  let _recordedEvents = [];
  let _recordingStartTime = 0;
  let _prerollBars = 1;
  let _prerollStepsElapsed = 0;
  let _quantizedResult = null;
  let _generatedCode = null;

  // Create metronome
  const metronome = createMetronome({
    bpm: _bpm,
    getAudioContext,
    onStep: (stepInfo) => {
      handleMetronomeStep(stepInfo);
      if (onStep) onStep(stepInfo);
    },
  });

  /**
   * Handle metronome step events
   */
  function handleMetronomeStep(stepInfo) {
    if (_state === RecordingState.READY) {
      // Count pre-roll steps
      _prerollStepsElapsed++;
      const prerollStepsTotal = _prerollBars * _stepsPerBeat * 4; // 4 beats per bar

      if (_prerollStepsElapsed >= prerollStepsTotal) {
        // Pre-roll complete, start recording
        _state = RecordingState.RECORDING;
        _recordingStartTime = stepInfo.time;
        _recordedEvents = [];
        notifyStateChange();
      }
    } else if (_state === RecordingState.RECORDING) {
      // Check if we've recorded enough steps
      const stepsRecorded = stepInfo.step - Math.floor(_recordingStartTime / (60 / _bpm / _stepsPerBeat));
      if (stepsRecorded >= _patternLength) {
        // Auto-stop after pattern length
        // (optional - user can also manually stop)
      }
    }
  }

  /**
   * Handle incoming MIDI note events
   */
  function handleMidiNote(event) {
    if (_state !== RecordingState.RECORDING) {
      // Still trigger onNoteEvent for visual feedback even when not recording
      if (onNoteEvent) {
        onNoteEvent({
          note: event.note.number,
          velocity: event.note.attack,
          timestamp: getAudioContext().currentTime,
          recording: false,
        });
      }
      return;
    }

    const timestamp = getAudioContext().currentTime;
    const noteEvent = {
      note: event.note.number,
      velocity: event.note.attack,
      timestamp,
    };

    _recordedEvents.push(noteEvent);

    // Notify listener
    if (onNoteEvent) {
      onNoteEvent({
        ...noteEvent,
        recording: true,
      });
    }
  }

  /**
   * Initialize MIDI input
   */
  async function initializeMidi(deviceNameOrIndex = _midiDevice) {
    if (!WebMidi.enabled) {
      throw new Error('WebMidi is not enabled. Please enable it first.');
    }

    // Find the input device
    let input;
    if (typeof deviceNameOrIndex === 'number') {
      input = WebMidi.inputs[deviceNameOrIndex];
    } else if (typeof deviceNameOrIndex === 'string') {
      input = WebMidi.inputs.find((inp) => inp.name.includes(deviceNameOrIndex));
    } else {
      // Use first available input
      input = WebMidi.inputs[0];
    }

    if (!input) {
      throw new Error(
        `MIDI input device "${deviceNameOrIndex}" not found. Available: ${WebMidi.inputs.map((i) => i.name).join(', ')}`,
      );
    }

    _midiInput = input;
    _midiDevice = deviceNameOrIndex;

    // Listen for note on events
    _midiInput.addListener('noteon', handleMidiNote);

    return input.name;
  }

  /**
   * Cleanup MIDI listeners
   */
  function cleanupMidi() {
    if (_midiInput) {
      _midiInput.removeListener('noteon', handleMidiNote);
      _midiInput = null;
    }
  }

  /**
   * Notify state change
   */
  function notifyStateChange() {
    if (onStateChange) {
      onStateChange({
        state: _state,
        bpm: _bpm,
        patternLength: _patternLength,
        eventCount: _recordedEvents.length,
      });
    }
  }

  /**
   * Start recording (with pre-roll)
   */
  async function startRecording() {
    if (_state !== RecordingState.IDLE) {
      throw new Error(`Cannot start recording from state: ${_state}`);
    }

    // Initialize MIDI if not already done
    if (!_midiInput) {
      await initializeMidi();
    }

    // Reset state
    _recordedEvents = [];
    _prerollStepsElapsed = 0;
    _quantizedResult = null;
    _generatedCode = null;

    // Start metronome and enter ready state
    metronome.setBpm(_bpm);
    metronome.start(_stepsPerBeat);

    _state = RecordingState.READY;
    notifyStateChange();
  }

  /**
   * Stop recording and generate pattern
   */
  function stopRecording() {
    if (_state !== RecordingState.RECORDING && _state !== RecordingState.READY) {
      throw new Error(`Cannot stop recording from state: ${_state}`);
    }

    // Stop metronome
    metronome.stop();

    _state = RecordingState.STOPPED;

    // Quantize the recorded events
    if (_recordedEvents.length > 0) {
      _quantizedResult = quantize(_recordedEvents, {
        bpm: _bpm,
        patternLength: _patternLength,
        stepsPerBeat: _stepsPerBeat,
        startTime: _recordingStartTime,
        removeDuplicates: true,
      });

      // Generate strudel code
      _generatedCode = generateStrudelCode(_quantizedResult.steps, {
        useNoteNames: false,
        includeVelocity: false,
        stepsPerBeat: _stepsPerBeat,
      });
    } else {
      _generatedCode = 'silence // No notes recorded';
    }

    notifyStateChange();

    return _generatedCode;
  }

  /**
   * Cancel recording
   */
  function cancelRecording() {
    metronome.stop();
    _recordedEvents = [];
    _state = RecordingState.IDLE;
    _quantizedResult = null;
    _generatedCode = null;
    notifyStateChange();
  }

  /**
   * Reset to idle state
   */
  function reset() {
    cancelRecording();
  }

  /**
   * Get current state
   */
  function getState() {
    return _state;
  }

  /**
   * Get recorded events
   */
  function getRecordedEvents() {
    return _recordedEvents;
  }

  /**
   * Get quantized result
   */
  function getQuantizedResult() {
    return _quantizedResult;
  }

  /**
   * Get generated code
   */
  function getGeneratedCode() {
    return _generatedCode;
  }

  /**
   * Get all pattern variations
   */
  function getPatternVariations() {
    if (!_quantizedResult) return null;
    return generatePatternVariations(_quantizedResult.steps);
  }

  /**
   * Set BPM
   */
  function setBpm(newBpm) {
    _bpm = newBpm;
    metronome.setBpm(newBpm);
  }

  /**
   * Set pattern length
   */
  function setPatternLength(length) {
    _patternLength = length;
  }

  /**
   * Set MIDI device
   */
  async function setMidiDevice(deviceNameOrIndex) {
    cleanupMidi();
    return await initializeMidi(deviceNameOrIndex);
  }

  /**
   * Get available MIDI inputs
   */
  function getAvailableMidiInputs() {
    if (!WebMidi.enabled) return [];
    return WebMidi.inputs.map((input, index) => ({
      index,
      name: input.name,
      id: input.id,
    }));
  }

  /**
   * Cleanup resources
   */
  function destroy() {
    cleanupMidi();
    metronome.stop();
  }

  return {
    // Recording controls
    startRecording,
    stopRecording,
    cancelRecording,
    reset,

    // State getters
    getState,
    getRecordedEvents,
    getQuantizedResult,
    getGeneratedCode,
    getPatternVariations,

    // Configuration
    setBpm,
    setPatternLength,
    setMidiDevice,
    getAvailableMidiInputs,
    initializeMidi,

    // Cleanup
    destroy,

    // Metronome access (for UI)
    metronome,
  };
}
