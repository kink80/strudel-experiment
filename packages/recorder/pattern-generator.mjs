/*
pattern-generator.mjs - Converts quantized MIDI to strudel pattern notation
Copyright (C) 2024 Strudel contributors - see <https://codeberg.org/uzu/strudel>
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

/**
 * Convert MIDI note number to note name (e.g., 60 -> "c4")
 * @param {number} midiNote - MIDI note number (0-127)
 * @returns {string} Note name (e.g., "c4", "cs4", "d4")
 */
export function midiToNoteName(midiNote) {
  const noteNames = ['c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g', 'gs', 'a', 'as', 'b'];
  const octave = Math.floor(midiNote / 12) - 1;
  const noteName = noteNames[midiNote % 12];
  return `${noteName}${octave}`;
}

/**
 * Formats a single step's notes into strudel notation
 * @param {Object|null} stepData - Step data (null for rest, object for note/chord)
 * @param {boolean} useNoteNames - Whether to use note names (true) or MIDI numbers (false)
 * @returns {string} Strudel notation for the step
 */
export function formatStep(stepData, useNoteNames = false) {
  if (!stepData) {
    return '~'; // Rest
  }

  if (stepData.isChord) {
    // Chord: multiple simultaneous notes
    const notes = stepData.notes.map((n) => (useNoteNames ? midiToNoteName(n) : n)).join(':');
    return notes;
  } else {
    // Single note
    return useNoteNames ? midiToNoteName(stepData.note) : stepData.note.toString();
  }
}

/**
 * Groups consecutive steps into substeps for cleaner notation
 * @param {Array} steps - Array of step data
 * @returns {Array} Array of grouped steps
 */
export function groupSteps(steps) {
  if (steps.length === 0) return [];

  const groups = [];
  let currentGroup = [steps[0]];

  for (let i = 1; i < steps.length; i++) {
    currentGroup.push(steps[i]);

    // Group in powers of 2 (2, 4, 8, etc.) for cleaner notation
    if (currentGroup.length >= 4) {
      groups.push(currentGroup);
      currentGroup = [];
    }
  }

  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  return groups;
}

/**
 * Generates strudel pattern code from quantized steps
 * @param {Array} steps - Array of quantized steps (from quantize.mjs)
 * @param {Object} options - Generation options
 * @param {boolean} options.useNoteNames - Use note names instead of MIDI numbers
 * @param {boolean} options.includeVelocity - Include velocity information
 * @param {number} options.stepsPerBeat - Steps per beat (default: 4)
 * @returns {string} Strudel pattern code
 */
export function generateStrudelCode(steps, options = {}) {
  const { useNoteNames = false, includeVelocity = false, stepsPerBeat = 4 } = options;

  if (!steps || steps.length === 0) {
    return 'silence';
  }

  // Check if all steps are empty
  const hasNotes = steps.some((step) => step !== null);
  if (!hasNotes) {
    return 'silence';
  }

  // Format each step
  const formattedSteps = steps.map((step) => formatStep(step, useNoteNames));

  // Group steps by beat (stepsPerBeat steps = 1 beat)
  const beats = [];
  for (let i = 0; i < formattedSteps.length; i += stepsPerBeat) {
    const beatSteps = formattedSteps.slice(i, i + stepsPerBeat);
    beats.push(beatSteps);
  }

  // Build the pattern string
  const patternParts = beats.map((beatSteps) => {
    // Check if all steps in beat are the same
    const allSame = beatSteps.every((s) => s === beatSteps[0]);

    if (allSame) {
      // Single value for the whole beat
      return beatSteps[0];
    } else {
      // Substeps within the beat
      return `[${beatSteps.join(' ')}]`;
    }
  });

  // Construct the final pattern
  let pattern = `note("${patternParts.join(' ')}")`;

  // Optionally add velocity
  if (includeVelocity) {
    const velocities = steps.map((step) => {
      if (!step) return 0;
      const vel = step.velocity || 0.9;
      return Math.round(vel * 10) / 10; // Round to 1 decimal
    });

    // Group velocities by beat
    const velBeats = [];
    for (let i = 0; i < velocities.length; i += stepsPerBeat) {
      const beatVels = velocities.slice(i, i + stepsPerBeat);
      velBeats.push(beatVels);
    }

    const velParts = velBeats.map((beatVels) => {
      const allSame = beatVels.every((v) => v === beatVels[0]);
      if (allSame) {
        return beatVels[0];
      } else {
        return `[${beatVels.join(' ')}]`;
      }
    });

    pattern += `.velocity("${velParts.join(' ')}")`;
  }

  return pattern;
}

/**
 * Generates multiple variations of the pattern for user selection
 * @param {Array} steps - Quantized steps
 * @returns {Object} Multiple pattern variations
 */
export function generatePatternVariations(steps) {
  return {
    midiNumbers: generateStrudelCode(steps, { useNoteNames: false, includeVelocity: false }),
    noteNames: generateStrudelCode(steps, { useNoteNames: true, includeVelocity: false }),
    withVelocity: generateStrudelCode(steps, { useNoteNames: false, includeVelocity: true }),
    noteNamesWithVelocity: generateStrudelCode(steps, { useNoteNames: true, includeVelocity: true }),
  };
}

/**
 * Pretty-prints a pattern with formatting
 * @param {string} pattern - Raw pattern string
 * @returns {string} Formatted pattern
 */
export function formatPattern(pattern) {
  // Add line breaks for readability if pattern is long
  if (pattern.length > 80) {
    return pattern.replace(/\)\./g, ')\n  .');
  }
  return pattern;
}
