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

/**
 * Parse a VST instance ID in the format "pluginName:tag".
 * Returns { pluginName, instanceId } or throws if no tag is present.
 */
export function parseVstId(raw) {
  const idx = raw.indexOf(':');
  if (idx === -1 || idx === 0 || idx === raw.length - 1) {
    throw new Error(`vst() requires an instance tag, e.g. vst("${raw}:lead"). Got: "${raw}"`);
  }
  return {
    pluginName: raw.slice(0, idx),
    instanceId: raw,
  };
}

const DEFAULT_BRIDGE_URL = 'ws://localhost:8765';

let ws = null;
let wsReady = false;
let wsUrl = DEFAULT_BRIDGE_URL;
let reconnectTimer = null;

const pendingRequests = new Map();
const loadedPlugins = new Map();
const registeredSounds = new Set();

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
    // Re-register any previously loaded plugins
    for (const id of registeredSounds) {
      loadVstPlugin(id).catch(() => {});
    }
  };

  ws.onclose = () => {
    wsReady = false;
    ws = null;
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
    logger(`[vst] plugin loaded: ${msg.name}`);
  } else if (msg.type === 'plugin_list') {
    lastPluginList = msg.plugins || [];
    for (const p of lastPluginList) {
      logger(`[vst] ${p.pluginType}: ${p.name} (${p.manufacturer})`);
    }
    logger(`[vst] ${lastPluginList.length} plugins available`);
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
  const left = new Float32Array(buffer, 8, numSamples);
  const right = new Float32Array(buffer, 8 + numSamples * 4, numSamples);

  const pending = pendingRequests.get(requestId);
  if (pending) {
    pendingRequests.delete(requestId);
    pending.resolve({ left, right, numSamples });
  }
}

// ─── Bridge requests ────────────────────────────────────────────────────────

function requestRender(pluginId, note, velocity, duration, params) {
  if (!wsReady) {
    return Promise.reject(new Error('[vst] bridge not connected. Start with: npx strudel-vst-bridge'));
  }

  const requestId = nextRequestId++;
  ws.send(
    JSON.stringify({
      type: 'render',
      requestId,
      pluginId,
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

export function loadVstPlugin(instanceId) {
  if (!wsReady) {
    return Promise.reject(new Error('[vst] bridge not connected'));
  }
  if (loadedPlugins.has(instanceId)) {
    return Promise.resolve(instanceId);
  }

  const { pluginName } = parseVstId(instanceId);

  return new Promise((resolve, reject) => {
    const handler = (event) => {
      if (typeof event.data !== 'string') return;
      const msg = JSON.parse(event.data);
      if (msg.type === 'plugin_loaded' && msg.pluginId === instanceId) {
        ws.removeEventListener('message', handler);
        resolve(instanceId);
      } else if (msg.type === 'error' && msg.pluginId === instanceId) {
        ws.removeEventListener('message', handler);
        reject(new Error(msg.message));
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({
      type: 'load_plugin',
      pluginId: instanceId,
      pluginName,
      path: pluginName,
    }));

    setTimeout(() => {
      ws.removeEventListener('message', handler);
      reject(new Error(`[vst] timeout loading: ${instanceId}`));
    }, 10000);
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
 * Ensures a VST plugin is registered as a strudel sound source.
 * Called lazily when vst("instanceId") is first evaluated.
 */
export function ensureVstSoundRegistered(instanceId) {
  if (registeredSounds.has(instanceId)) return;
  registeredSounds.add(instanceId);

  registerSound(
    instanceId,
    async (t, value, onended) => {
      const ac = getAudioContext();
      const { note, freq, velocity = 0.8, duration = 1, vstparams = {} } = value;

      // Convert to MIDI note number
      let midiNote = 60;
      if (note !== undefined) {
        midiNote = typeof note === 'number' ? note : simpleNoteToMidi(note);
      } else if (freq !== undefined) {
        midiNote = Math.round(12 * Math.log2(freq / 440) + 69);
      }

      // logger(`[vst] render: note=${note}, freq=${freq}, midiNote=${midiNote}, vel=${velocity}, dur=${duration}`);

      let audioData;
      try {
        audioData = await requestRender(instanceId, midiNote, velocity, duration, vstparams);
      } catch (err) {
        logger(err.message);
        onended();
        return null;
      }

      const { left, right, numSamples } = audioData;
      const sampleRate = ac.sampleRate;

      // Create AudioBuffer from received PCM
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
 * Results are logged to the console.
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

  // If filter provided, log filtered results after a short delay
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
 * Open the native GUI window for a loaded plugin.
 * Call from the browser console or strudel REPL: vstGui("Odin2")
 */
export function vstGui(pluginId) {
  // Auto-connect if needed
  if (!ws) {
    connectVstBridge();
  }

  // Extract plugin ID — the REPL wraps strings as Pattern objects via reify()
  let id = pluginId;
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
    logger(`[vst] vstGui expects a plugin name string`);
    return;
  }

  // Validate instance tag
  try {
    parseVstId(id);
  } catch (e) {
    logger(e.message);
    return;
  }

  // Auto-load the plugin if not loaded, then show GUI
  const sendShowGui = () => {
    ws.send(JSON.stringify({ type: 'show_gui', pluginId: id }));
    logger(`[vst] requested GUI for: ${id}`);
  };

  if (!wsReady) {
    // Wait for connection then send
    const waitForReady = () => {
      if (wsReady) {
        // Ensure plugin is loaded first
        ensureVstSoundRegistered(id);
        loadVstPlugin(id).then(() => sendShowGui()).catch(() => sendShowGui());
      } else {
        setTimeout(waitForReady, 200);
      }
    };
    waitForReady();
    return;
  }

  // If plugin not yet loaded, load it first
  if (!loadedPlugins.has(id)) {
    ensureVstSoundRegistered(id);
    loadVstPlugin(id).then(() => sendShowGui()).catch(() => sendShowGui());
  } else {
    sendShowGui();
  }
}

/**
 * List available parameters for a loaded VST plugin.
 * Call from the browser console: vstListParams("Odin2")
 * Optionally filter by name substring: vstListParams("Odin2", "filter")
 */
export function vstListParams(pluginId, filter) {
  const plugin = loadedPlugins.get(pluginId);
  if (!plugin) {
    logger(`[vst] plugin "${pluginId}" not loaded. Loaded: ${[...loadedPlugins.keys()].join(', ')}`);
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
