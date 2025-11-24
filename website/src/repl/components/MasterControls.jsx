/*
MasterControls.jsx - Master Control Panel for Named Sliders
Copyright (C) 2024 Strudel contributors - see <https://codeberg.org/uzu/strudel>
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { useState, useEffect } from 'react';
import { Knob } from './Knob';
import cx from '@src/cx.mjs';

export function MasterControls({ widgets }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [controlTypes, setControlTypes] = useState({}); // name -> 'slider' | 'knob'

  // Filter named sliders from widgets
  const namedSliders = widgets?.filter((w) => w.type === 'named-slider') || [];

  // No controls to display
  if (namedSliders.length === 0) {
    return null;
  }

  const handleValueChange = (id, value) => {
    // Send message to update the named slider value
    window.postMessage({ type: 'named-slider', value: Number(value), id });
  };

  const toggleControlType = (name) => {
    setControlTypes((prev) => ({
      ...prev,
      [name]: prev[name] === 'knob' ? 'slider' : 'knob',
    }));
  };

  const getControlType = (name) => {
    return controlTypes[name] || 'slider'; // default to slider
  };

  return (
    <div
      className={cx(
        'absolute top-2 right-2 z-50 bg-background border-2 border-foreground/20 rounded-lg shadow-xl',
        'max-w-sm',
        isMinimized && 'w-48'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-foreground/20">
        <h3 className="text-sm font-bold">Master Controls</h3>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="text-xs px-2 py-1 hover:bg-lineHighlight rounded"
        >
          {isMinimized ? 'Show' : 'Hide'}
        </button>
      </div>

      {/* Controls */}
      {!isMinimized && (
        <div className="p-3 space-y-4 max-h-96 overflow-y-auto">
          {namedSliders.map((widget) => {
            const { name, value, min, max, step } = widget;
            const id = `named_slider_${name}`;
            const currentValue = parseFloat(value);
            const controlType = getControlType(name);

            return (
              <div key={id} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold">{name}</label>
                  <button
                    onClick={() => toggleControlType(name)}
                    className="text-xs px-2 py-0.5 hover:bg-lineHighlight rounded border border-foreground/20"
                    title={`Switch to ${controlType === 'slider' ? 'knob' : 'slider'}`}
                  >
                    {controlType === 'slider' ? '⊙' : '—'}
                  </button>
                </div>

                {controlType === 'slider' ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={min}
                      max={max}
                      step={step || (max - min) / 1000}
                      value={currentValue}
                      onChange={(e) => handleValueChange(id, e.target.value)}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      value={currentValue.toFixed(2)}
                      onChange={(e) => handleValueChange(id, e.target.value)}
                      className="w-20 px-2 py-1 bg-lineBackground rounded text-sm"
                      step={step || 0.01}
                      min={min}
                      max={max}
                    />
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <Knob
                      value={currentValue}
                      min={min}
                      max={max}
                      step={step}
                      onChange={(newValue) => handleValueChange(id, newValue)}
                      label={null}
                      size={64}
                    />
                  </div>
                )}

                <div className="text-xs opacity-60 flex justify-between">
                  <span>min: {min}</span>
                  <span>max: {max}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
