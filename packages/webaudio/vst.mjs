/*
vst.mjs - Pattern function for VST3/CLAP plugin integration.
Copyright (C) 2024 Strudel contributors
This program is free software: you can redistribute it and/or modify it under the terms of the
GNU Affero General Public License as published by the Free Software Foundation, either version 3
of the License, or (at your option) any later version.
*/

import { Pattern, pure, isPattern } from '@strudel/core';
import { connectVstBridge, ensureVstSoundRegistered, isVstBridgeInitialized } from 'superdough';

// Use pure() instead of reify() so labels aren't parsed as mini-notation
function vstReify(thing) {
  return isPattern(thing) ? thing : pure(thing);
}

function initBridgeAndRegister(label) {
  if (!isVstBridgeInitialized()) {
    connectVstBridge();
  }
  if (typeof label === 'string') {
    ensureVstSoundRegistered(label);
  }
}

/**
 * Use a named VST plugin instance as a sound source.
 * Instances are created in the VST panel — each has a label you reference here.
 *
 * @name vst
 * @param {string | Pattern} label Instance label (created in VST panel)
 * @example
 * note("[c3 e3 g3 c4]*2").vst("pad")
 * @example
 * note("a2 e3").vst("bass")
 */
export function vst(label) {
  const pat = vstReify(label).withValue((id) => {
    initBridgeAndRegister(id);
    return { s: id, vstplugin: id };
  });
  return pat;
}

// Available as Pattern method: note("c3 e3").vst("pad")
Pattern.prototype.vst = function (label) {
  const vstPat = vstReify(label).withValue((id) => {
    initBridgeAndRegister(id);
    return { s: id, vstplugin: id };
  });
  return this.set(vstPat);
};
