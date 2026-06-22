/*
vst.mjs - Pattern function for VST/AU plugin integration via strudel-vst-bridge.

Each .vst("label") routes MIDI to a per-instance virtual port named
"strudel-vst:<label>" that the bridge exposes. Audio comes out of the
bridge's own AVAudioEngine (default output device), not through strudel's
WebAudio graph — so .room/.gain/etc. don't apply to VST output. The price
of realtime playback.

Copyright (C) 2024 Strudel contributors
This program is free software: you can redistribute it and/or modify it under the terms of the
GNU Affero General Public License as published by the Free Software Foundation, either version 3
of the License, or (at your option) any later version.
*/

import { Pattern, pure, isPattern } from '@strudel/core';
import { connectVstBridge, isVstBridgeInitialized } from 'superdough';

function vstReify(thing) {
  return isPattern(thing) ? thing : pure(thing);
}

function bridgePortName(label) {
  return `strudel-vst:${label}`;
}

function ensureBridge() {
  if (!isVstBridgeInitialized()) connectVstBridge();
}

/**
 * Route to a named VST/AU plugin instance via the bridge's virtual MIDI port.
 * Instances are created in the VST panel. The bridge plays audio through
 * the macOS default output; strudel's effect chain (.room, .gain, ...) does
 * not apply to the VST output.
 *
 * @name vst
 * @param {string | Pattern} label Instance label (created in VST panel)
 * @example
 * note("[c3 e3 g3 c4]*2").vst("pad")
 */
export function vst(label) {
  ensureBridge();
  return vstReify(label).withValue((id) => ({ midiport: bridgePortName(id) })).midi();
}

Pattern.prototype.vst = function (label) {
  ensureBridge();
  const portPat = vstReify(label).withValue((id) => ({ midiport: bridgePortName(id) }));
  return this.set(portPat).midi();
};
