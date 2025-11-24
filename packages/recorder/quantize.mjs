/*
quantize.mjs - Quantization logic for MIDI recorder
Copyright (C) 2024 Strudel contributors - see <https://codeberg.org/uzu/strudel>
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

/**
 * Quantizes MIDI events to a musical grid
 * @param {Array} events - Raw MIDI events with {note, velocity, timestamp}
 * @param {Object} options - Quantization options
 * @param {number} options.bpm - Beats per minute
 * @param {number} options.patternLength - Total number of steps in the pattern
 * @param {number} options.stepsPerBeat - Subdivision (default: 4 for 16th notes)
 * @param {number} options.startTime - Recording start timestamp
 * @returns {Array} Quantized events with {step, note, velocity}
 */
export function quantizeEvents(events, options) {
  const { bpm, patternLength, stepsPerBeat = 4, startTime } = options;

  if (!events || events.length === 0) {
    return [];
  }

  // Calculate time per step in seconds
  const timePerBeat = 60 / bpm;
  const timePerStep = timePerBeat / stepsPerBeat;

  // Quantize each event
  const quantizedEvents = events.map((event) => {
    // Calculate elapsed time since recording started
    const elapsed = event.timestamp - startTime;

    // Find the nearest step
    const rawStep = elapsed / timePerStep;
    const nearestStep = Math.round(rawStep);

    // Wrap around pattern length
    const step = nearestStep % patternLength;

    return {
      step: step >= 0 ? step : step + patternLength, // Handle negative wrapping
      note: event.note,
      velocity: event.velocity,
      originalTimestamp: event.timestamp,
      quantizationOffset: (rawStep - nearestStep) * timePerStep, // For debugging
    };
  });

  return quantizedEvents;
}

/**
 * Groups quantized events by step and sorts by velocity (for polyphonic notes)
 * @param {Array} quantizedEvents - Array of quantized events
 * @param {number} patternLength - Total pattern length
 * @returns {Array} Array of length patternLength, each containing notes for that step
 */
export function groupEventsByStep(quantizedEvents, patternLength) {
  // Initialize array with empty arrays for each step
  const steps = Array(patternLength)
    .fill(null)
    .map(() => []);

  // Group events by step
  quantizedEvents.forEach((event) => {
    if (event.step >= 0 && event.step < patternLength) {
      steps[event.step].push({
        note: event.note,
        velocity: event.velocity,
      });
    }
  });

  // Sort notes within each step by velocity (descending)
  steps.forEach((stepNotes) => {
    stepNotes.sort((a, b) => b.velocity - a.velocity);
  });

  return steps;
}

/**
 * Merges simultaneous notes (within the same step) into chords
 * @param {Array} steps - Grouped events by step
 * @returns {Array} Steps with merged chords
 */
export function mergeSimultaneousNotes(steps) {
  return steps.map((stepNotes) => {
    if (stepNotes.length === 0) {
      return null; // Empty step (rest)
    }
    if (stepNotes.length === 1) {
      return stepNotes[0]; // Single note
    }
    // Multiple notes - create a chord
    return {
      notes: stepNotes.map((n) => n.note),
      velocity: Math.max(...stepNotes.map((n) => n.velocity)), // Use max velocity
      isChord: true,
    };
  });
}

/**
 * Removes duplicate notes in the same step (keeps highest velocity)
 * @param {Array} steps - Grouped events by step
 * @returns {Array} Steps with duplicates removed
 */
export function removeDuplicateNotes(steps) {
  return steps.map((stepNotes) => {
    const uniqueNotes = new Map();

    stepNotes.forEach((event) => {
      const existing = uniqueNotes.get(event.note);
      if (!existing || event.velocity > existing.velocity) {
        uniqueNotes.set(event.note, event);
      }
    });

    return Array.from(uniqueNotes.values());
  });
}

/**
 * Complete quantization pipeline
 * @param {Array} rawEvents - Raw MIDI events
 * @param {Object} options - Quantization options
 * @returns {Object} Quantized result with steps and metadata
 */
export function quantize(rawEvents, options) {
  const { patternLength, removeDuplicates = true } = options;

  // Step 1: Quantize to grid
  const quantizedEvents = quantizeEvents(rawEvents, options);

  // Step 2: Group by step
  let groupedSteps = groupEventsByStep(quantizedEvents, patternLength);

  // Step 3: Optionally remove duplicates
  if (removeDuplicates) {
    groupedSteps = removeDuplicateNotes(groupedSteps);
  }

  // Step 4: Merge simultaneous notes into chords
  const steps = mergeSimultaneousNotes(groupedSteps);

  return {
    steps,
    eventCount: quantizedEvents.length,
    patternLength,
    bpm: options.bpm,
  };
}
