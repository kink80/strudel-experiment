/*
MidiCCPanel.jsx - MIDI CC Configuration Panel for Named Sliders
Copyright (C) 2024 Strudel contributors - see <https://codeberg.org/uzu/strudel>
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { useState, useEffect } from 'react';
import cx from '@src/cx.mjs';
import {
  getMappings,
  setMapping,
  removeMapping,
  clearMappings,
  getSliderMetadata,
} from '@strudel/codemirror/midi-cc.mjs';

// Helper to extract slider name from ID (e.g., 'named_slider_cutoff' -> 'cutoff')
function extractSliderName(sliderId) {
  return sliderId.replace('named_slider_', '');
}

export function MidiCCPanel({ isOpen, onClose, availableSliders, sliderMetadata }) {
  const [mappings, setMappingsState] = useState({});
  const [learnMode, setLearnMode] = useState(null); // sliderId being learned
  const [lastCCReceived, setLastCCReceived] = useState(null);
  const [ccActivity, setCCActivity] = useState({}); // Track recent CC activity

  // Load initial mappings
  useEffect(() => {
    setMappingsState(getMappings());
  }, []);

  // Listen for MIDI CC messages in learn mode
  useEffect(() => {
    if (!learnMode) return;

    const handleMessage = (event) => {
      if (event.data.type === 'midi-cc-learn') {
        const ccNumber = event.data.ccNumber;
        setLastCCReceived(ccNumber);

        // Show activity indicator
        setCCActivity((prev) => ({ ...prev, [ccNumber]: Date.now() }));

        // Assign the CC to the slider being learned
        if (learnMode) {
          const metadata = sliderMetadata[learnMode];
          setMapping(ccNumber, learnMode, metadata);
          setMappingsState(getMappings());
          setLearnMode(null); // Exit learn mode
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [learnMode, sliderMetadata]);

  // Cleanup old CC activity indicators
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setCCActivity((prev) => {
        const filtered = {};
        Object.entries(prev).forEach(([cc, timestamp]) => {
          if (now - timestamp < 2000) {
            // Keep for 2 seconds
            filtered[cc] = timestamp;
          }
        });
        return filtered;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleSetMapping = (sliderId, ccNumber) => {
    const metadata = sliderMetadata[sliderId];
    if (ccNumber === '') {
      // Clear mapping for this slider
      // Find CC that maps to this slider and remove it
      const currentMappings = getMappings();
      const ccToRemove = Object.keys(currentMappings).find((cc) => currentMappings[cc] === sliderId);
      if (ccToRemove) {
        removeMapping(Number(ccToRemove));
      }
    } else {
      setMapping(Number(ccNumber), sliderId, metadata);
    }
    setMappingsState(getMappings());
  };

  const handleClearAll = () => {
    if (confirm('Clear all MIDI CC mappings?')) {
      clearMappings();
      setMappingsState({});
    }
  };

  const handleLearn = (sliderId) => {
    setLearnMode(sliderId);
    setLastCCReceived(null);
  };

  // Get CC number for a slider ID
  const getCCForSlider = (sliderId) => {
    const currentMappings = getMappings();
    const ccNumber = Object.keys(currentMappings).find((cc) => currentMappings[cc] === sliderId);
    return ccNumber || '';
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-background border-2 border-foreground rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">MIDI CC Configuration</h2>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-lineBackground hover:bg-lineHighlight rounded-md"
          >
            Close
          </button>
        </div>

        <p className="text-sm opacity-70 mb-4">
          Map MIDI CC controls from your controller to named sliders in your code.
          <br />
          {availableSliders.length === 0 && (
            <span className="text-yellow-500">
              No named sliders found. Create a slider like: <code>cutoff = slider(1000, 100, 5000)</code>
            </span>
          )}
        </p>

        {availableSliders.length > 0 && (
          <>
            <div className="mb-4 flex gap-2">
              <button
                onClick={handleClearAll}
                className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 rounded-md text-sm"
              >
                Clear All Mappings
              </button>
            </div>

            <div className="space-y-3">
              {availableSliders.map((slider) => {
                const sliderName = extractSliderName(slider.id);
                const currentCC = getCCForSlider(slider.id);
                const isLearning = learnMode === slider.id;
                const metadata = sliderMetadata[slider.id] || {};

                return (
                  <div
                    key={slider.id}
                    className={cx(
                      'p-3 rounded-md border',
                      isLearning
                        ? 'border-cyan-400 bg-cyan-400/10 animate-pulse'
                        : 'border-foreground/20 bg-lineBackground',
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="font-semibold">{sliderName}</div>
                        <div className="text-xs opacity-60">
                          Value: {slider.currentValue?.toFixed(2)} | Range: {metadata.min?.toFixed(0)} -{' '}
                          {metadata.max?.toFixed(0)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={currentCC}
                          onChange={(e) => handleSetMapping(slider.id, e.target.value)}
                          className="px-2 py-1 bg-background rounded-md text-sm w-24"
                          disabled={isLearning}
                        >
                          <option value="">None</option>
                          {Array.from({ length: 128 }, (_, i) => (
                            <option key={i} value={i}>
                              CC {i}
                              {ccActivity[i] && ' ●'}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={() => (isLearning ? setLearnMode(null) : handleLearn(slider.id))}
                          className={cx(
                            'px-3 py-1 rounded-md text-sm font-semibold',
                            isLearning
                              ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                              : 'bg-purple-600/30 hover:bg-purple-600/50',
                          )}
                        >
                          {isLearning ? 'Cancel' : 'Learn'}
                        </button>
                      </div>
                    </div>

                    {isLearning && (
                      <div className="mt-2 text-sm text-cyan-400">
                        Move a knob or fader on your MIDI controller...
                        {lastCCReceived !== null && ` Received CC ${lastCCReceived}`}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className="mt-6 pt-4 border-t border-foreground/20">
          <h3 className="font-semibold mb-2">Help</h3>
          <ul className="text-sm opacity-70 space-y-1">
            <li>• Click <strong>Learn</strong> button, then move a knob on your controller to assign it</li>
            <li>• Use dropdown to manually select CC number (0-127)</li>
            <li>• Select "None" to remove a mapping</li>
            <li>• Mappings are temporary and reset on page reload</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
