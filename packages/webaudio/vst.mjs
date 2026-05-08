/*
vst.mjs - Pattern function for VST3/CLAP plugin integration.
Copyright (C) 2024 Strudel contributors
This program is free software: you can redistribute it and/or modify it under the terms of the
GNU Affero General Public License as published by the Free Software Foundation, either version 3
of the License, or (at your option) any later version.
*/

import { Pattern, reify } from '@strudel/core';
import { connectVstBridge, ensureVstSoundRegistered, loadVstPlugin, isVstBridgeInitialized } from 'superdough';

function initBridgeAndRegister(id) {
  if (!isVstBridgeInitialized()) {
    connectVstBridge();
  }
  if (typeof id === 'string') {
    ensureVstSoundRegistered(id);
    loadVstPlugin(id).catch(() => {});
  }
}

/**
 * Select a VST3/CLAP plugin as a sound source via the strudel-vst-bridge.
 * Requires running the bridge server: `npx strudel-vst-bridge`
 *
 * Use with .note() to set the note pattern — the note pattern provides the rhythmic structure:
 *
 * @name vst
 * @param {string | Pattern} pluginId Plugin path or name
 * @example
 * note("[c3 e3 g3 c4]*2").vst("Odin2")
 * @example
 * note("a2 e3").vst("~/Library/Audio/Plug-Ins/VST3/Surge XT.vst3")
 */
export function vst(pluginId) {
  const pat = reify(pluginId).withValue((id) => {
    initBridgeAndRegister(id);
    return { s: id, vstplugin: id };
  });
  return pat;
}

// Available as a Pattern method: note("c3 e3").vst("Diva")
// The receiver pattern (this) provides the structure.
Pattern.prototype.vst = function (pluginId) {
  const vstPat = reify(pluginId).withValue((id) => {
    initBridgeAndRegister(id);
    return { s: id, vstplugin: id };
  });
  return this.set(vstPat);
};
