# VST Instance Tagging Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every `vst()` call requires a `pluginName:tag` format, creating independent plugin instances with separate parameter state and GUI windows.

**Architecture:** Parse the colon-separated ID on the browser side into `pluginName` + `instanceId`. Send both to the bridge. The bridge loads the plugin binary by `pluginName` but keys instances by `instanceId`. No backward compatibility — bare names are rejected.

**Tech Stack:** JavaScript (strudel browser side), Rust (strudel-vst-bridge)

**Spec:** `docs/superpowers/specs/2026-05-09-vst-instance-tagging-design.md`

---

### Task 1: Add `parseVstId` helper to superdough

**Files:**
- Modify: `packages/superdough/vst.mjs`

- [ ] **Step 1: Add the `parseVstId` function**

Add this function near the top of the file, after the imports:

```js
/**
 * Parse a VST instance ID in the format "pluginName:tag".
 * Returns { pluginName, instanceId } or throws if no tag is present.
 */
function parseVstId(raw) {
  const idx = raw.indexOf(':');
  if (idx === -1 || idx === 0 || idx === raw.length - 1) {
    throw new Error(`vst() requires an instance tag, e.g. vst("${raw}:lead"). Got: "${raw}"`);
  }
  return {
    pluginName: raw.slice(0, idx),
    instanceId: raw,
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/superdough/vst.mjs
git commit -m "feat(vst): add parseVstId helper for instance tagging"
```

---

### Task 2: Update `loadVstPlugin` to send `pluginName` separately

**Files:**
- Modify: `packages/superdough/vst.mjs`

- [ ] **Step 1: Update `loadVstPlugin` to accept and parse instance IDs**

Replace the `loadVstPlugin` function:

```js
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
```

- [ ] **Step 2: Commit**

```bash
git add packages/superdough/vst.mjs
git commit -m "feat(vst): send pluginName separately in load_plugin protocol"
```

---

### Task 3: Update `ensureVstSoundRegistered` to use instance IDs

**Files:**
- Modify: `packages/superdough/vst.mjs`

- [ ] **Step 1: Update `ensureVstSoundRegistered`**

The function already takes a `pluginId` and registers a sound by that name. The only change: the render request must use `instanceId`. Since the function is called with the full `instanceId`, it already works — just rename the parameter for clarity and ensure the `requestRender` call uses it:

```js
export function ensureVstSoundRegistered(instanceId) {
  if (registeredSounds.has(instanceId)) return;
  registeredSounds.add(instanceId);

  registerSound(
    instanceId,
    async (t, value, onended) => {
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
        audioData = await requestRender(instanceId, midiNote, velocity, duration, vstparams);
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
```

- [ ] **Step 2: Commit**

```bash
git add packages/superdough/vst.mjs
git commit -m "feat(vst): update sound registration to use instance IDs"
```

---

### Task 4: Update `vstGui` and `vstListParams` to use instance IDs

**Files:**
- Modify: `packages/superdough/vst.mjs`

- [ ] **Step 1: Update `vstGui`**

The function already sends `pluginId` to the bridge. The main change: when auto-loading, use the full instance ID. Update the variable name for clarity. The `id` extraction logic (for Pattern objects) stays the same, but after extracting `id`, validate it has a tag:

In the `vstGui` function, after the `id` extraction block (after the line `if (typeof id !== 'string') { ... return; }`), add validation:

```js
  // Validate instance tag
  try {
    parseVstId(id);
  } catch (e) {
    logger(e.message);
    return;
  }
```

No other changes needed — the rest of the function already uses `id` as the identifier for load/gui requests.

- [ ] **Step 2: Update `vstListParams`**

No changes needed — it already looks up by the exact string passed in. Users will call `vstListParams("Odin2:pad")` instead of `vstListParams("Odin2")`.

- [ ] **Step 3: Commit**

```bash
git add packages/superdough/vst.mjs
git commit -m "feat(vst): validate instance tags in vstGui"
```

---

### Task 5: Update `packages/webaudio/vst.mjs` pattern functions

**Files:**
- Modify: `packages/webaudio/vst.mjs`

- [ ] **Step 1: Import `parseVstId` from superdough**

Update the import line:

```js
import { connectVstBridge, ensureVstSoundRegistered, loadVstPlugin, isVstBridgeInitialized, parseVstId } from 'superdough';
```

Note: `parseVstId` needs to be exported from `packages/superdough/vst.mjs`. Go back and add `export` to the function declaration:

```js
export function parseVstId(raw) {
```

Also ensure it's re-exported from whatever barrel file superdough uses.

- [ ] **Step 2: Check the superdough barrel export**

Check `packages/superdough/index.mjs` (or equivalent) and add `parseVstId` to the exports from `./vst.mjs`.

- [ ] **Step 3: Update `initBridgeAndRegister` to validate tags**

```js
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
```

- [ ] **Step 4: Update the `vst()` standalone function and `Pattern.prototype.vst`**

The `vst()` function and `Pattern.prototype.vst` both call `initBridgeAndRegister` which now validates. The `s` and `vstplugin` values should be the full `instanceId`:

```js
export function vst(pluginId) {
  const pat = reify(pluginId).withValue((id) => {
    initBridgeAndRegister(id);
    return { s: id, vstplugin: id };
  });
  return pat;
}

Pattern.prototype.vst = function (pluginId) {
  const vstPat = reify(pluginId).withValue((id) => {
    initBridgeAndRegister(id);
    return { s: id, vstplugin: id };
  });
  return this.set(vstPat);
};
```

These are unchanged from current code — the validation happens inside `initBridgeAndRegister`.

- [ ] **Step 5: Update `vst3()` and `Pattern.prototype.vst3`**

For `vst3()`, the format suffix goes on the pluginName portion. Parse first, then reconstruct:

```js
export function vst3(pluginId) {
  const pat = reify(pluginId).withValue((id) => {
    const { pluginName, instanceId } = parseVstId(id);
    const vst3InstanceId = `${pluginName} (VST3):${instanceId.slice(pluginName.length + 1)}`;
    initBridgeAndRegister(vst3InstanceId);
    return { s: vst3InstanceId, vstplugin: vst3InstanceId };
  });
  return pat;
}

Pattern.prototype.vst3 = function (pluginId) {
  const vstPat = reify(pluginId).withValue((id) => {
    const { pluginName, instanceId } = parseVstId(id);
    const vst3InstanceId = `${pluginName} (VST3):${instanceId.slice(pluginName.length + 1)}`;
    initBridgeAndRegister(vst3InstanceId);
    return { s: vst3InstanceId, vstplugin: vst3InstanceId };
  });
  return this.set(vstPat);
};
```

So `vst3("Odin2:pad")` → instance ID `"Odin2 (VST3):pad"`, plugin name `"Odin2 (VST3)"`.

- [ ] **Step 6: Update the JSDoc examples**

Update the doc comments at the top to show the new syntax:

```js
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
```

- [ ] **Step 7: Commit**

```bash
git add packages/superdough/vst.mjs packages/webaudio/vst.mjs
git commit -m "feat(vst): require instance tags in vst() pattern functions"
```

---

### Task 6: Update the bridge (Rust) to use `pluginName` for loading

**Files:**
- Modify: `~/work2/strudel-vst-bridge/src/main.rs`

- [ ] **Step 1: Add `pluginName` field to `LoadPlugin` variant**

Update the `IncomingMessage` enum:

```rust
#[serde(rename = "load_plugin")]
LoadPlugin {
    #[serde(rename = "pluginId")]
    plugin_id: String,
    #[serde(rename = "pluginName")]
    plugin_name: Option<String>,
    path: Option<String>,
},
```

`plugin_name` is `Option<String>` for protocol flexibility — if not provided, fall back to extracting from `plugin_id` by splitting on `:`.

- [ ] **Step 2: Update `load_plugin` method to use `pluginName` for binary lookup**

Update `PluginManager::load_plugin` to accept a separate name for loading:

```rust
fn load_plugin(&mut self, plugin_id: &str, plugin_name: &str) -> Result<PluginLoadedMsg, String> {
    if self.plugins.contains_key(plugin_id) {
        let handle = self.plugins.get(plugin_id).unwrap().lock().unwrap();
        return Ok(PluginLoadedMsg {
            msg_type: "plugin_loaded",
            plugin_id: plugin_id.to_string(),
            name: handle.name.clone(),
            params: vec![],
        });
    }

    let c_name = CString::new(plugin_name).map_err(|e| format!("Invalid name: {e}"))?;
    let ptr = unsafe { auv3_load_plugin(c_name.as_ptr(), SAMPLE_RATE, BLOCK_SIZE) };
    if ptr.is_null() {
        return Err(format!("Failed to load plugin: {plugin_name}"));
    }

    let name = unsafe {
        let cstr = auv3_get_name(ptr);
        CStr::from_ptr(cstr).to_string_lossy().to_string()
    };

    info!("Plugin loaded: {} as instance '{}'", name, plugin_id);

    let handle = PluginHandle { ptr, name: name.clone() };
    self.plugins.insert(plugin_id.to_string(), Arc::new(StdMutex::new(handle)));

    Ok(PluginLoadedMsg {
        msg_type: "plugin_loaded",
        plugin_id: plugin_id.to_string(),
        name,
        params: vec![],
    })
}
```

Key change: `CString::new(plugin_name)` instead of `CString::new(plugin_id)`. The HashMap key is `plugin_id` (the full instance ID like `"Odin2:pad"`), but the AUv3 host receives just the plugin name (`"Odin2"`).

- [ ] **Step 3: Update the `LoadPlugin` match arm in the WebSocket handler**

```rust
IncomingMessage::LoadPlugin { plugin_id, plugin_name, path } => {
    let load_name = plugin_name
        .or(path)
        .unwrap_or_else(|| {
            // Fallback: extract plugin name from "name:tag" format
            plugin_id.split(':').next().unwrap_or(&plugin_id).to_string()
        });
    let mut mgr = manager.lock().await;
    match mgr.load_plugin(&plugin_id, &load_name) {
        Ok(msg) => { let _ = write.send(Message::Text(serde_json::to_string(&msg).unwrap())).await; }
        Err(e) => {
            let err = ErrorMsg { msg_type: "error", plugin_id: Some(plugin_id), request_id: None, message: e };
            let _ = write.send(Message::Text(serde_json::to_string(&err).unwrap())).await;
        }
    }
}
```

- [ ] **Step 4: Update auto-load in `Render` and `ShowGui` handlers**

In the `Render` handler, the auto-load call also needs to extract the plugin name:

```rust
IncomingMessage::Render { request_id, plugin_id, note, velocity, duration, params } => {
    let plugin_arc = {
        let mut mgr = manager.lock().await;
        if mgr.get_plugin(&plugin_id).is_none() {
            let load_name = plugin_id.split(':').next().unwrap_or(&plugin_id).to_string();
            info!("Auto-loading plugin for render: {plugin_id} (name: {load_name})");
            if let Err(e) = mgr.load_plugin(&plugin_id, &load_name) {
                let err = ErrorMsg { msg_type: "error", plugin_id: Some(plugin_id), request_id: Some(request_id), message: e };
                let _ = write.send(Message::Text(serde_json::to_string(&err).unwrap())).await;
                continue;
            }
        }
        mgr.get_plugin(&plugin_id)
    };
    // ... rest unchanged
```

Same pattern for `ShowGui`:

```rust
IncomingMessage::ShowGui { plugin_id } => {
    let plugin_arc = {
        let mut mgr = manager.lock().await;
        if mgr.get_plugin(&plugin_id).is_none() {
            let load_name = plugin_id.split(':').next().unwrap_or(&plugin_id).to_string();
            info!("Auto-loading plugin for GUI: {plugin_id} (name: {load_name})");
            let _ = mgr.load_plugin(&plugin_id, &load_name);
        }
        mgr.get_plugin(&plugin_id)
    };
    // ... rest unchanged
```

- [ ] **Step 5: Build and verify**

```bash
cd ~/work2/strudel-vst-bridge && cargo build
```

Expected: compiles without errors.

- [ ] **Step 6: Commit**

```bash
cd ~/work2/strudel-vst-bridge && git add src/main.rs && git commit -m "feat: support instance-tagged plugin IDs (name:tag format)"
```

---

### Task 7: Update the superdough barrel exports

**Files:**
- Modify: `packages/superdough/index.mjs` (or equivalent barrel file)

- [ ] **Step 1: Find and update the barrel export**

Search for where `ensureVstSoundRegistered` is exported from superdough's main entry point. Add `parseVstId` to the same export list.

- [ ] **Step 2: Commit**

```bash
git add packages/superdough/index.mjs
git commit -m "feat(vst): export parseVstId from superdough"
```

---

### Task 8: Update `VstTab.jsx` — loaded instances display

**Files:**
- Modify: `website/src/repl/components/panel/VstTab.jsx`

- [ ] **Step 1: Update the "Loaded" section**

No structural changes needed — the loaded plugins list already displays the keys from `getLoadedVstPlugins()`. Since those keys will now be instance IDs like `"Odin2:pad"`, they'll display correctly. The GUI button already passes the full key to `showGui()`.

Verify the `loadPlugin` callback uses the full instance ID. Currently it receives `name` from the plugin browser and calls `ensureVstSoundRegistered(name)` and `loadVstPlugin(name)`. This flow is for the plugin list (available plugins), not loaded instances — users would typically load via code, not the UI. But if someone clicks "load" from the browser, it would need a tag.

For the plugin browser "load" button: this is a discovery/browsing UI. Loading from the UI without a tag doesn't make sense in the new model since the user needs to choose a tag. Change the "load" button to a "copy" button that copies `vst("PluginName:tag")` to clipboard with a placeholder tag:

```jsx
const copySnippet = useCallback((name) => {
  const snippet = `note("c4 e4 g4").vst("${name}:lead")`;
  navigator.clipboard.writeText(snippet).catch(() => {});
}, []);
```

Update `PluginRow` to use copy instead of load:

```jsx
function PluginRow({ plugin, onCopy, onGui, loaded }) {
  const id = pluginLoadId(plugin);
  return (
    <div className="flex items-center justify-between py-1 px-2 rounded bg-background/50 hover:bg-background">
      <div className="flex-1 min-w-0">
        <span className="text-xs font-medium truncate block">{plugin.name}</span>
        <span className="text-xs opacity-50">{plugin.manufacturer}</span>
      </div>
      <div className="flex gap-1 ml-2">
        {loaded ? (
          <button
            className="text-xs px-2 py-0.5 rounded bg-green-900/50 hover:bg-green-800/50 cursor-pointer"
            onClick={() => onGui(id)}
          >
            GUI
          </button>
        ) : (
          <button
            className="text-xs px-2 py-0.5 rounded bg-foreground/10 hover:bg-foreground/20 cursor-pointer"
            onClick={() => onCopy(id)}
            title='Copy vst() snippet to clipboard'
          >
            copy
          </button>
        )}
      </div>
    </div>
  );
}
```

Update the parent to pass `onCopy={copySnippet}` instead of `onLoad={loadPlugin}`.

- [ ] **Step 2: Commit**

```bash
git add website/src/repl/components/panel/VstTab.jsx
git commit -m "feat(vst): update VstTab to show instance IDs, copy snippet instead of load"
```

---

### Task 9: Update reconnection logic

**Files:**
- Modify: `packages/superdough/vst.mjs`

- [ ] **Step 1: Update the `ws.onopen` re-registration loop**

Currently on reconnect, the code iterates `registeredSounds` and calls `loadVstPlugin(id)`. Since `registeredSounds` now contains instance IDs like `"Odin2:pad"`, and `loadVstPlugin` now sends `pluginName` separately, this should work without changes.

Verify by reading the reconnect block — no code change needed, just confirm.

- [ ] **Step 2: Commit (skip if no changes)**

---

### Task 10: End-to-end manual test

- [ ] **Step 1: Start the bridge**

```bash
cd ~/work2/strudel-vst-bridge && cargo run
```

- [ ] **Step 2: In strudel REPL, test independent instances**

```js
note("c3 e3 g3").vst("Odin2:pad")
note("a2 f2").vst("Odin2:bass")
```

Verify: two separate plugin instances appear in the VST panel's "Loaded" section.

- [ ] **Step 3: Test GUI independence**

Click GUI on "Odin2:pad" — opens a window. Click GUI on "Odin2:bass" — opens a second window. Change parameters in one — the other is unaffected.

- [ ] **Step 4: Test error on missing tag**

```js
note("c3").vst("Odin2")
```

Verify: error message appears: `vst() requires an instance tag, e.g. vst("Odin2:lead"). Got: "Odin2"`

- [ ] **Step 5: Test vst3 variant**

```js
note("c3 e3").vst3("Odin2:bright")
```

Verify: loads as `"Odin2 (VST3):bright"`.
