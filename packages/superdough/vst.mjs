/*
vst.mjs - VST/AU bridge client for strudel.

Manages the WebSocket connection to the local bridge server. The bridge
hosts AU plugins inside a running AVAudioEngine and exposes one virtual
MIDI destination per instance ("strudel-vst:<label>"). Strudel routes notes
to those ports via WebMIDI (see packages/webaudio/vst.mjs). The bridge
also owns the audio output device.

This file is only the control-plane client (create/delete/preset/GUI). It
does NOT carry audio — that path was removed when the bridge moved to a
live engine.

Copyright (C) 2024 Strudel contributors
This program is free software: you can redistribute it and/or modify it under the terms of the
GNU Affero General Public License as published by the Free Software Foundation, either version 3
of the License, or (at your option) any later version.
*/

import { logger } from './logger.mjs';

const DEFAULT_BRIDGE_URL = 'ws://localhost:8765';

let ws = null;
let wsReady = false;
let wsUrl = DEFAULT_BRIDGE_URL;
let reconnectTimer = null;

const pendingRequests = new Map();
const loadedPlugins = new Map();

// Instance registry: label -> { pluginName }
// Mirrored from the bridge via list_instances.
const instanceRegistry = new Map();
let instanceListeners = [];

let nextRequestId = 1;

// ─── WebSocket connection ───────────────────────────────────────────────────

export function connectVstBridge(url) {
  wsUrl = url || wsUrl;
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
    return;
  }

  if (ws) {
    ws.onclose = null;
    ws.onerror = null;
    ws.onmessage = null;
    try { ws.close(); } catch (e) { /* ignore */ }
    ws = null;
  }
  wsReady = false;

  ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    wsReady = true;
    logger('[vst] connected to bridge at', wsUrl);
    if (reconnectTimer) { clearTimeout(reconnectTimer); reconnectTimer = null; }
    refreshInstances();
  };

  ws.onclose = () => {
    wsReady = false;
    ws = null;
    for (const [, pending] of pendingRequests) {
      pending.reject(new Error('[vst] bridge disconnected'));
    }
    pendingRequests.clear();
    logger('[vst] disconnected, reconnecting in 2s...');
    if (reconnectTimer) clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(() => connectVstBridge(), 2000);
  };

  ws.onerror = () => logger('[vst] connection error');

  ws.onmessage = (event) => {
    // The bridge is now JSON-only (no audio frames). Any binary frame is unexpected.
    if (typeof event.data !== 'string') return;
    handleJsonResponse(JSON.parse(event.data));
  };
}

let lastPluginList = [];

function handleJsonResponse(msg) {
  if (msg.type === 'plugin_list') {
    lastPluginList = msg.plugins || [];
    logger(`[vst] ${lastPluginList.length} plugins available`);
  } else if (msg.type === 'instance_list') {
    instanceRegistry.clear();
    for (const inst of (msg.instances || [])) {
      instanceRegistry.set(inst.label, { pluginName: inst.pluginName });
    }
    notifyInstanceListeners();
  } else if (msg.type === 'instance_created') {
    instanceRegistry.set(msg.label, { pluginName: msg.pluginName });
    loadedPlugins.set(msg.label, { name: msg.pluginName, params: msg.params || [] });
    notifyInstanceListeners();
    logger(`[vst] instance created: "${msg.label}" (${msg.pluginName}) → MIDI: strudel-vst:${msg.label}`);
  } else if (msg.type === 'instance_deleted') {
    instanceRegistry.delete(msg.label);
    loadedPlugins.delete(msg.label);
    notifyInstanceListeners();
    logger(`[vst] instance deleted: "${msg.label}"`);
  } else if (msg.type === 'state' || msg.type === 'state_loaded' ||
             msg.type === 'preset' || msg.type === 'preset_saved' ||
             msg.type === 'preset_list' || msg.type === 'preset_deleted') {
    const pending = pendingRequests.get(msg.requestId);
    if (pending) { pendingRequests.delete(msg.requestId); pending.resolve(msg); }
  } else if (msg.type === 'error') {
    logger(`[vst] error: ${msg.message}`);
    const pending = pendingRequests.get(msg.requestId);
    if (pending) { pendingRequests.delete(msg.requestId); pending.reject(new Error(msg.message)); }
  }
}

// ─── Instance registry ─────────────────────────────────────────────────────

export function createVstInstance(label, pluginName) {
  if (!wsReady) { logger('[vst] bridge not connected'); return; }
  ws.send(JSON.stringify({ type: 'create_instance', label, pluginName }));
}

export function deleteVstInstance(label) {
  if (!wsReady) { logger('[vst] bridge not connected'); return; }
  ws.send(JSON.stringify({ type: 'delete_instance', label }));
}

export function refreshInstances() {
  if (!wsReady) return;
  ws.send(JSON.stringify({ type: 'list_instances' }));
}

export function getVstInstances() {
  return new Map(instanceRegistry);
}

export function onInstancesChanged(callback) {
  instanceListeners.push(callback);
  return () => {
    instanceListeners = instanceListeners.filter((cb) => cb !== callback);
  };
}

function notifyInstanceListeners() {
  for (const cb of instanceListeners) {
    try { cb(); } catch (e) { /* ignore */ }
  }
}

// ─── Generic request/response helper ────────────────────────────────────────

function bridgeRequest(payload, timeoutMs = 5000) {
  if (!wsReady) return Promise.reject(new Error('[vst] bridge not connected'));
  const requestId = nextRequestId++;
  ws.send(JSON.stringify({ ...payload, requestId }));
  return new Promise((resolve, reject) => {
    pendingRequests.set(requestId, { resolve, reject });
    setTimeout(() => {
      if (pendingRequests.has(requestId)) {
        pendingRequests.delete(requestId);
        reject(new Error(`[vst] request timeout: ${payload.type}`));
      }
    }, timeoutMs);
  });
}

// ─── Plugin state (per-instance opaque blob) ────────────────────────────────

export async function getInstanceState(label) {
  const msg = await bridgeRequest({ type: 'get_state', pluginId: label });
  return msg.state;
}

export async function setInstanceState(label, stateB64) {
  await bridgeRequest({ type: 'set_state', pluginId: label, state: stateB64 });
}

// ─── Presets: per-instrument named bundles of (alias -> state) ──────────────

export async function saveVstPreset(pluginName, presetName) {
  const aliases = [];
  for (const [label, info] of instanceRegistry) {
    if (info.pluginName !== pluginName) continue;
    try {
      const state = await getInstanceState(label);
      aliases.push({ label, state });
    } catch (e) {
      logger(`[vst] could not snapshot "${label}": ${e.message}`);
    }
  }
  const data = {
    version: 1,
    pluginName,
    presetName,
    savedAt: new Date().toISOString(),
    aliases,
  };
  await bridgeRequest({ type: 'save_preset', pluginName, presetName, data });
  logger(`[vst] saved preset "${presetName}" for ${pluginName} (${aliases.length} alias${aliases.length === 1 ? '' : 'es'})`);
}

export async function loadVstPreset(pluginName, presetName) {
  const msg = await bridgeRequest({ type: 'load_preset', pluginName, presetName });
  const data = msg.data || {};
  const aliases = Array.isArray(data.aliases) ? data.aliases : [];
  if (aliases.length === 0) {
    logger(`[vst] preset "${presetName}" had no aliases`);
    return;
  }

  for (const { label, state } of aliases) {
    if (!label) continue;

    const existing = instanceRegistry.get(label);
    if (existing && existing.pluginName !== pluginName) {
      logger(`[vst] skip "${label}": already bound to ${existing.pluginName}`);
      continue;
    }

    if (existing) {
      deleteVstInstance(label);
      await waitForInstance(label, false);
    }
    createVstInstance(label, pluginName);
    await waitForInstance(label, true);

    if (state) {
      try {
        await setInstanceState(label, state);
      } catch (e) {
        logger(`[vst] could not restore state for "${label}": ${e.message}`);
      }
    }
  }
  logger(`[vst] loaded preset "${presetName}" for ${pluginName} (${aliases.length} alias${aliases.length === 1 ? '' : 'es'})`);
}

export async function listVstPresets(pluginName) {
  const msg = await bridgeRequest({ type: 'list_presets', pluginName });
  return msg.presets || [];
}

export async function deleteVstPreset(pluginName, presetName) {
  await bridgeRequest({ type: 'delete_preset', pluginName, presetName });
}

function waitForInstance(label, shouldExist, timeoutMs = 3000) {
  const ok = () => instanceRegistry.has(label) === shouldExist;
  if (ok()) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const unsubscribe = onInstancesChanged(() => {
      if (ok()) { clearTimeout(timer); unsubscribe(); resolve(); }
    });
    const timer = setTimeout(() => {
      unsubscribe();
      reject(new Error(`[vst] timeout waiting for instance "${label}"`));
    }, timeoutMs);
  });
}

// ─── Public API ─────────────────────────────────────────────────────────────

export function isVstBridgeConnected() { return wsReady; }
export function getLoadedVstPlugins() { return new Map(loadedPlugins); }
export function isVstBridgeInitialized() { return ws !== null; }

export function vstList(filter) {
  if (!ws) connectVstBridge();
  if (!wsReady) {
    const wait = () => {
      if (wsReady) ws.send(JSON.stringify({ type: 'list_plugins' }));
      else setTimeout(wait, 200);
    };
    wait();
    return;
  }
  ws.send(JSON.stringify({ type: 'list_plugins' }));

  if (filter) {
    setTimeout(() => {
      const f = filter.toLowerCase();
      const filtered = lastPluginList.filter(
        (p) => p.name.toLowerCase().includes(f) || p.manufacturer.toLowerCase().includes(f),
      );
      for (const p of filtered) {
        logger(`[vst] ${p.pluginType}: ${p.name} (${p.manufacturer})`);
      }
    }, 500);
  }
}

export function vstGui(label) {
  if (!ws) connectVstBridge();

  let id = label;
  if (typeof id === 'object' && id !== null && typeof id.query === 'function') {
    const haps = id.queryArc(0, 1);
    if (haps.length > 0) id = haps[0].value;
  }
  if (typeof id === 'object' && id !== null) {
    id = id.s || id.vstplugin || id.value;
  }
  if (typeof id !== 'string') {
    logger(`[vst] vstGui expects a label string`);
    return;
  }

  const sendShowGui = () => {
    ws.send(JSON.stringify({ type: 'show_gui', pluginId: id }));
    logger(`[vst] requested GUI for: ${id}`);
  };

  if (!wsReady) {
    const wait = () => {
      if (wsReady) sendShowGui();
      else setTimeout(wait, 200);
    };
    wait();
    return;
  }
  sendShowGui();
}

export function vstListParams(label, filter) {
  const plugin = loadedPlugins.get(label);
  if (!plugin) {
    logger(`[vst] instance "${label}" not loaded. Loaded: ${[...loadedPlugins.keys()].join(', ')}`);
    return [];
  }
  let params = plugin.params || [];
  if (filter) {
    const f = filter.toLowerCase();
    params = params.filter((p) => p.name.toLowerCase().includes(f));
  }
  for (const p of params) {
    logger(`[vst] [${p.index}] ${p.name} (${p.min}-${p.max}, default=${p.default}) ${p.unit}`);
  }
  return params;
}
