/*
vst.mjs - Pattern function for VST3/CLAP plugin integration.
Copyright (C) 2024 Strudel contributors
This program is free software: you can redistribute it and/or modify it under the terms of the
GNU Affero General Public License as published by the Free Software Foundation, either version 3
of the License, or (at your option) any later version.
*/

import { Pattern, pure, isPattern } from '@strudel/core';
import { connectVstBridge, ensureVstSoundRegistered, loadVstPlugin, isVstBridgeInitialized, parseVstId } from 'superdough';

// Use pure() instead of reify() to avoid mini-notation parsing
// (`:` in "Odin2:pad" would be interpreted as the slice operator)
function vstReify(thing) {
  return isPattern(thing) ? thing : pure(thing);
}

function initBridgeAndRegister(id) {
  if (!isVstBridgeInitialized()) {
    connectVstBridge();
  }
  if (typeof id === 'string') {
    parseVstId(id); // throws if no tag
    ensureVstSoundRegistered(id);
    loadVstPlugin(id).catch(() => {});
  }
}

/**
 * Select a VST3/CLAP plugin as a sound source via the strudel-vst-bridge.
 * Requires running the bridge server: `cd ~/work2/strudel-vst-bridge && cargo run`
 *
 * Each instance tag creates an independent plugin instance with its own parameters.
 *
 * @name vst
 * @param {string | Pattern} pluginId Plugin name with instance tag (format: "name:tag")
 * @example
 * note("[c3 e3 g3 c4]*2").vst("Odin2:pad")
 * @example
 * note("a2 e3").vst("Surge XT:bass")
 */
export function vst(pluginId) {
  const pat = vstReify(pluginId).withValue((id) => {
    initBridgeAndRegister(id);
    return { s: id, vstplugin: id };
  });
  return pat;
}

/**
 * Select a VST3 plugin explicitly via the strudel-vst-bridge.
 *
 * @name vst3
 * @param {string | Pattern} pluginId Plugin name with instance tag (format: "name:tag")
 * @example
 * note("[c3 e3 g3 c4]*2").vst3("Odin2:pad")
 */
export function vst3(pluginId) {
  const pat = vstReify(pluginId).withValue((id) => {
    const { pluginName } = parseVstId(id);
    const vst3InstanceId = `${pluginName} (VST3):${id.slice(pluginName.length + 1)}`;
    initBridgeAndRegister(vst3InstanceId);
    return { s: vst3InstanceId, vstplugin: vst3InstanceId };
  });
  return pat;
}

// Available as Pattern methods: note("c3 e3").vst("Diva"), note("c3 e3").vst3("Diva")
Pattern.prototype.vst = function (pluginId) {
  const vstPat = vstReify(pluginId).withValue((id) => {
    initBridgeAndRegister(id);
    return { s: id, vstplugin: id };
  });
  return this.set(vstPat);
};

Pattern.prototype.vst3 = function (pluginId) {
  const vstPat = vstReify(pluginId).withValue((id) => {
    const { pluginName } = parseVstId(id);
    const vst3InstanceId = `${pluginName} (VST3):${id.slice(pluginName.length + 1)}`;
    initBridgeAndRegister(vst3InstanceId);
    return { s: vst3InstanceId, vstplugin: vst3InstanceId };
  });
  return this.set(vstPat);
};
