/*
metronome.mjs - Timing engine for MIDI recorder
Copyright (C) 2024 Strudel contributors - see <https://codeberg.org/uzu/strudel>
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

/**
 * Creates a high-precision metronome using Web Audio clock
 * @param {Object} options - Configuration options
 * @param {number} options.bpm - Beats per minute (default: 120)
 * @param {Function} options.getAudioContext - Function that returns AudioContext
 * @param {Function} options.onTick - Callback fired on each beat
 * @param {Function} options.onStep - Callback fired on each step
 * @returns {Object} Metronome controller
 */
export function createMetronome({ bpm = 120, getAudioContext, onTick, onStep } = {}) {
  let _bpm = bpm;
  let _isRunning = false;
  let _startTime = 0;
  let _stepCount = 0;
  let _beatCount = 0;
  let _tickInterval = null;
  let _stepsPerBeat = 4; // 16th notes

  // Calculate time per beat and step in seconds
  const getTimePerBeat = () => 60 / _bpm;
  const getTimePerStep = () => getTimePerBeat() / _stepsPerBeat;

  /**
   * Start the metronome
   * @param {number} stepsPerBeat - Subdivision of beats (default: 4 for 16th notes)
   */
  function start(stepsPerBeat = 4) {
    if (_isRunning) return;

    _stepsPerBeat = stepsPerBeat;
    _isRunning = true;
    _stepCount = 0;
    _beatCount = 0;

    const audioContext = getAudioContext();
    _startTime = audioContext.currentTime;

    // Use high-precision timing with small intervals
    // Check every 10ms to ensure we don't miss ticks
    _tickInterval = setInterval(() => {
      if (!_isRunning) return;

      const currentTime = getAudioContext().currentTime;
      const elapsed = currentTime - _startTime;
      const timePerStep = getTimePerStep();
      const expectedStepCount = Math.floor(elapsed / timePerStep);

      // Fire callbacks for any missed steps
      while (_stepCount <= expectedStepCount) {
        const stepTime = _startTime + _stepCount * timePerStep;

        // Fire step callback
        if (onStep) {
          onStep({
            step: _stepCount,
            beat: _beatCount,
            time: stepTime,
            elapsed: _stepCount * timePerStep,
          });
        }

        // Fire beat callback on beat boundaries
        if (_stepCount % _stepsPerBeat === 0) {
          if (onTick) {
            onTick({
              beat: _beatCount,
              time: stepTime,
              elapsed: _stepCount * timePerStep,
            });
          }
          _beatCount++;
        }

        _stepCount++;
      }
    }, 10);
  }

  /**
   * Stop the metronome
   */
  function stop() {
    _isRunning = false;
    if (_tickInterval) {
      clearInterval(_tickInterval);
      _tickInterval = null;
    }
  }

  /**
   * Get current time info
   * @returns {Object} Current timing information
   */
  function getTimeInfo() {
    if (!_isRunning) {
      return {
        isRunning: false,
        step: 0,
        beat: 0,
        elapsed: 0,
      };
    }

    const audioContext = getAudioContext();
    const currentTime = audioContext.currentTime;
    const elapsed = currentTime - _startTime;
    const timePerStep = getTimePerStep();
    const currentStep = Math.floor(elapsed / timePerStep);
    const currentBeat = Math.floor(currentStep / _stepsPerBeat);

    return {
      isRunning: true,
      step: currentStep,
      beat: currentBeat,
      elapsed,
      bpm: _bpm,
      timePerBeat: getTimePerBeat(),
      timePerStep,
    };
  }

  /**
   * Set BPM
   * @param {number} newBpm - New beats per minute
   */
  function setBpm(newBpm) {
    _bpm = newBpm;
  }

  /**
   * Get current BPM
   * @returns {number} Current BPM
   */
  function getBpm() {
    return _bpm;
  }

  /**
   * Check if metronome is running
   * @returns {boolean} Running state
   */
  function isRunning() {
    return _isRunning;
  }

  /**
   * Reset step and beat counters
   */
  function reset() {
    _stepCount = 0;
    _beatCount = 0;
  }

  return {
    start,
    stop,
    getTimeInfo,
    setBpm,
    getBpm,
    isRunning,
    reset,
  };
}
