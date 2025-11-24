/*
Knob.jsx - Rotary Knob Control Component
Copyright (C) 2024 Strudel contributors - see <https://codeberg.org/uzu/strudel>
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { useRef, useEffect, useState } from 'react';

export function Knob({ value, min, max, step, onChange, label, size = 48 }) {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startValue, setStartValue] = useState(value);

  // Normalize value to 0-1 range
  const normalizeValue = (v) => (v - min) / (max - min);
  const denormalizeValue = (n) => n * (max - min) + min;

  // Draw the knob
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 4;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#1a1a1a';
    ctx.fill();
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw value arc
    const normalized = normalizeValue(value);
    const startAngle = 0.75 * Math.PI; // Start at 7 o'clock
    const endAngle = startAngle + normalized * 1.5 * Math.PI; // Sweep to 5 o'clock (270 degrees total)

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 2, startAngle, endAngle);
    ctx.strokeStyle = '#06b6d4'; // cyan-500
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw indicator line
    const angle = startAngle + normalized * 1.5 * Math.PI;
    const indicatorLength = radius * 0.6;
    const indicatorX = centerX + Math.cos(angle) * indicatorLength;
    const indicatorY = centerY + Math.sin(angle) * indicatorLength;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(indicatorX, indicatorY);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw center dot
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
  }, [value, min, max, size]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setStartValue(value);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const delta = startY - e.clientY; // Inverted: up = increase
    const sensitivity = (max - min) / 200; // 200px = full range
    const newValue = Math.max(min, Math.min(max, startValue + delta * sensitivity));

    // Apply step if provided
    const steppedValue = step ? Math.round(newValue / step) * step : newValue;

    onChange(steppedValue);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, startY, startValue]);

  return (
    <div className="flex flex-col items-center gap-1">
      {label && <div className="text-xs font-semibold">{label}</div>}
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        onMouseDown={handleMouseDown}
        className="cursor-ns-resize"
        style={{ touchAction: 'none' }}
      />
      <div className="text-xs opacity-75">
        {typeof value === 'number' ? value.toFixed(2) : value}
      </div>
    </div>
  );
}
