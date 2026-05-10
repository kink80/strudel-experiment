/*
vst.mjs - VST3/CLAP bridge client for strudel.
Manages WebSocket connection to a local bridge server that hosts VST plugins
and renders audio on demand.

Copyright (C) 2024 Strudel contributors
This program is free software: you can redistribute it and/or modify it under the terms of the
GNU Affero General Public License as published by the Free Software Foundation, either version 3
of the License, or (at your option) any later version.
*/

import { registerSound } from './superdough.mjs';
import { getAudioContext } from './audioContext.mjs';
import { gainNode } from './helpers.mjs';
import { logger } from './logger.mjs';

const DEFAULT_BRIDGE_URL = 'ws://localhost:8765';

let ws = null;
let wsReady = false;
let wsUrl = DEFAULT_BRIDGE_URL;
let reconnectTimer = null;

const pendingRequests = new Map();
const loadedPlugins = new Map();
const registeredSounds = new Set();

// Instance registry: label -> { pluginName, pluginId (bridge-side) }
// Mirrored from the bridge via list_instances
const instanceRegistry = new Map();
let instanceListeners = [];

let nextRequestId = 1;

// ─── WebSocket connection ───────────────────────────────────────────────────

export function connectVstBridge(url) {
  wsUrl = url || wsUrl;
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
    return;
  }

  // Clean up old connection
  if (ws) {
    ws.onclose = null;
    ws.onerror = null;
    ws.onmessage = null;
    try { ws.close(); } catch (e) { /* ignore */ }
    ws = null;
  }
  wsReady = false;

  ws = new WebSocket(wsUrl);
  ws.binaryType = 'arraybuffer';

  ws.onopen = () => {
    wsReady = true;
    logger('[vst] connected to bridge at', wsUrl);
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    // Fetch instance registry from bridge
    refreshInstances();
  };

  ws.onclose = () => {
    wsReady = false;
    ws = null;
    // Immediately reject all pending render requests instead of waiting for 5s timeout
    for (const [id, pending] of pendingRequests) {
      pending.reject(new Error('[vst] bridge disconnected'));
    }
    pendingRequests.clear();
    logger('[vst] disconnected, reconnecting in 2s...');
    if (reconnectTimer) clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(() => connectVstBridge(), 2000);
  };

  ws.onerror = () => {
    logger('[vst] connection error');
  };

  ws.onmessage = (event) => {
    if (event.data instanceof ArrayBuffer) {
      handleAudioResponse(event.data);
    } else {
      handleJsonResponse(JSON.parse(event.data));
    }
  };
}

let lastPluginList = [];

function handleJsonResponse(msg) {
  if (msg.type === 'plugin_loaded') {
    loadedPlugins.set(msg.pluginId, { name: msg.name, params: msg.params });
    logger(`[vst] plugin loaded: ${msg.name} as "${msg.pluginId}"`);
  } else if (msg.type === 'plugin_list') {
    lastPluginList = msg.plugins || [];
    logger(`[vst] ${lastPluginList.length} plugins available`);
  } else if (msg.type === 'instance_list') {
    instanceRegistry.clear();
    for (const inst of (msg.instances || [])) {
      instanceRegistry.set(inst.label, { pluginName: inst.pluginName });
      // Auto-register sound for each known instance
      ensureVstSoundRegistered(inst.label);
    }
    notifyInstanceListeners();
  } else if (msg.type === 'instance_created') {
    instanceRegistry.set(msg.label, { pluginName: msg.pluginName });
    loadedPlugins.set(msg.label, { name: msg.pluginName, params: msg.params || [] });
    ensureVstSoundRegistered(msg.label);
    notifyInstanceListeners();
    logger(`[vst] instance created: "${msg.label}" (${msg.pluginName})`);
  } else if (msg.type === 'instance_deleted') {
    instanceRegistry.delete(msg.label);
    loadedPlugins.delete(msg.label);
    notifyInstanceListeners();
    logger(`[vst] instance deleted: "${msg.label}"`);
  } else if (msg.type === 'error') {
    logger(`[vst] error: ${msg.message}`);
    const pending = pendingRequests.get(msg.requestId);
    if (pending) {
      pendingRequests.delete(msg.requestId);
      pending.reject(new Error(msg.message));
    }
  }
}

// Binary protocol: [uint32 requestId] [uint32 numSamples] [float32[] L] [float32[] R]
function handleAudioResponse(buffer) {
  const view = new DataView(buffer);
  const requestId = view.getUint32(0, true);
  const numSamples = view.getUint32(4, true);
  // Copy data — Float32Array views into the WebSocket buffer can be invalidated
  // after the onmessage handler returns.
  const left = new Float32Array(buffer.slice(8, 8 + numSamples * 4));
  const right = new Float32Array(buffer.slice(8 + numSamples * 4, 8 + numSamples * 8));

  const pending = pendingRequests.get(requestId);
  if (pending) {
    pendingRequests.delete(requestId);
    pending.resolve({ left, right, numSamples });
  }
}

// ─── Instance registry ─────────────────────────────────────────────────────

export function createVstInstance(label, pluginName) {
  if (!wsReady) {
    logger('[vst] bridge not connected');
    return;
  }
  ws.send(JSON.stringify({ type: 'create_instance', label, pluginName }));
}

export function deleteVstInstance(label) {
  if (!wsReady) {
    logger('[vst] bridge not connected');
    return;
  }
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

// ─── Bridge requests ────────────────────────────────────────────────────────

function requestRender(label, note, velocity, duration, params) {
  if (!wsReady) {
    return Promise.reject(new Error('[vst] bridge not connected. Start with: cd ~/work2/strudel-vst-bridge && cargo run'));
  }

  const requestId = nextRequestId++;
  ws.send(
    JSON.stringify({
      type: 'render',
      requestId,
      pluginId: label,
      note,
      velocity,
      duration,
      params: params || {},
    }),
  );

  return new Promise((resolve, reject) => {
    pendingRequests.set(requestId, { resolve, reject });
    setTimeout(() => {
      if (pendingRequests.has(requestId)) {
        pendingRequests.delete(requestId);
        reject(new Error(`[vst] render timeout (request ${requestId})`));
      }
    }, 5000);
  });
}

// ─── Sound registration ─────────────────────────────────────────────────────

function simpleNoteToMidi(note) {
  const noteMap = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
  const match = String(note).toLowerCase().match(/^([a-g])(#|b)?(\d+)?$/);
  if (!match) return 60;
  let midi = noteMap[match[1]];
  if (match[2] === '#') midi++;
  if (match[2] === 'b') midi--;
  const octave = match[3] !== undefined ? parseInt(match[3]) : 4;
  return midi + (octave + 1) * 12;
}

/**
 * Ensures a VST instance label is registered as a strudel sound source.
 */
export function ensureVstSoundRegistered(label) {
  if (registeredSounds.has(label)) return;
  registeredSounds.add(label);

  registerSound(
    label,
    async (t, value, onended) => {
      // Skip render if instance was deleted
      if (!instanceRegistry.has(label)) {
        onended();
        return null;
      }
      const ac = getAudioContext();
      const { note, freq, velocity = 0.8, duration = 1, vstparams = {} } = value;

      let midiNote = 60;
      if (note !== undefined) {
        midiNote = typeof note === 'number' ? note : simpleNoteToMidi(note);
      } else if (freq !== undefined) {
        midiNote = Math.round(12 * Math.log2(freq / 440) + 69);
      }

      let audioData;
      try {
        audioData = await requestRender(label, midiNote, velocity, duration, vstparams);
      } catch (err) {
        logger(err.message);
        onended();
        return null;
      }

      const { left, right, numSamples } = audioData;
      const sampleRate = ac.sampleRate;

      const audioBuffer = ac.createBuffer(2, numSamples, sampleRate);
      audioBuffer.getChannelData(0).set(left);
      audioBuffer.getChannelData(1).set(right);

      const source = ac.createBufferSource();
      source.buffer = audioBuffer;

      const out = gainNode(1);
      source.connect(out);
      source.start(t);
      source.onended = () => {
        source.disconnect();
        out.disconnect();
        onended();
      };

      return {
        node: out,
        stop: (endTime) => {
          source.stop(endTime);
        },
      };
    },
    { type: 'synth', prebake: false },
  );
}

// ─── Public API ─────────────────────────────────────────────────────────────

export function isVstBridgeConnected() {
  return wsReady;
}

export function getLoadedVstPlugins() {
  return new Map(loadedPlugins);
}

export function isVstBridgeInitialized() {
  return ws !== null;
}

/**
 * List all available AudioUnit plugins on the system.
 * @param {string} [filter] - Optional filter by name substring
 */
export function vstList(filter) {
  if (!ws) {
    connectVstBridge();
  }
  if (!wsReady) {
    const wait = () => {
      if (wsReady) {
        ws.send(JSON.stringify({ type: 'list_plugins' }));
      } else {
        setTimeout(wait, 200);
      }
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

/**
 * Open the native GUI window for a loaded plugin instance.
 * @param {string} label - The instance label
 */
export function vstGui(label) {
  if (!ws) {
    connectVstBridge();
  }

  // Extract string from Pattern objects
  let id = label;
  if (typeof id === 'object' && id !== null && typeof id.query === 'function') {
    const haps = id.queryArc(0, 1);
    if (haps.length > 0) {
      id = haps[0].value;
    }
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
    const waitForReady = () => {
      if (wsReady) sendShowGui();
      else setTimeout(waitForReady, 200);
    };
    waitForReady();
    return;
  }

  sendShowGui();
}

/**
 * List available parameters for a loaded VST plugin instance.
 * @param {string} label - The instance label
 * @param {string} [filter] - Optional filter by name substring
 */
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
