# VST Instance Tagging

## Problem

The VST bridge maintains a single plugin instance per plugin name. When two loops both use `.vst("Odin2")`, they share the same instance — same parameter state, same GUI. There is no way to have two independent copies of the same plugin with different sounds.

## Design

### Syntax

Every `vst()` call requires an instance tag in the format `pluginName:tag`:

```js
note("c3 e3 g3").vst("Odin2:pad")
note("a2 f2").vst("Odin2:bass")
```

Calling `vst("Odin2")` without a tag is an error. The error message tells the user what to do:

```
vst() requires an instance tag, e.g. vst("Odin2:pad")
```

### Parsing (browser side)

In `packages/webaudio/vst.mjs` and `packages/superdough/vst.mjs`, split the argument on the first `:`:

- `pluginName` = everything before the first `:` (e.g. `"Odin2"`)
- `instanceId` = the full string including the tag (e.g. `"Odin2:pad"`)

The `pluginName` is sent to the bridge so it knows which plugin binary to load. The `instanceId` is used everywhere else: render requests, GUI commands, the `loadedPlugins` map, sound registration.

### Bridge protocol changes

#### `load_plugin`

Current:
```json
{ "type": "load_plugin", "pluginId": "Odin2", "path": "Odin2" }
```

New:
```json
{ "type": "load_plugin", "pluginId": "Odin2:pad", "pluginName": "Odin2", "path": "Odin2" }
```

The bridge uses `pluginName` (or `path`) to find the plugin binary. It keys the instantiated `AUAudioUnit` by `pluginId` (`"Odin2:pad"`). Two requests with different `pluginId` but the same `pluginName` create two separate plugin instances.

#### `render`

No protocol change needed — `pluginId` is already sent per request. It just needs to carry the full instance ID (`"Odin2:pad"`) instead of the bare plugin name.

#### `show_gui`

Same — `pluginId` carries the full instance ID. Each instance gets its own native GUI window.

#### `plugin_loaded` response

The bridge responds with `pluginId: "Odin2:pad"` so the browser can track which instance was loaded.

### Browser-side changes

#### `packages/superdough/vst.mjs`

1. **`parseVstId(raw)`** — new helper. Splits on first `:`, returns `{ pluginName, instanceId }`. Throws if no `:` found.

2. **`ensureVstSoundRegistered(instanceId)`** — register sound with the full `instanceId` as the sound name. The `registerSound` callback sends render requests using `instanceId`.

3. **`loadVstPlugin(instanceId)`** — sends `load_plugin` with both `pluginId: instanceId` and `pluginName` extracted from parsing.

4. **`loadedPlugins` map** — keyed by `instanceId`.

5. **`vstGui(instanceId)`** — sends `show_gui` with the full `instanceId`.

6. **`vstListParams(instanceId)`** — looks up by `instanceId`.

#### `packages/webaudio/vst.mjs`

1. **`vst(pluginId)`** and **`Pattern.prototype.vst`** — call `parseVstId` on the resolved value. If it throws (no tag), log the error and return a silence pattern or throw. Otherwise proceed with `instanceId` as the sound name.

2. **`vst3(pluginId)`** — same treatment. The `(VST3)` suffix is appended to the `pluginName` portion, not the tag: `"Odin2 (VST3):pad"`.

#### `website/src/repl/components/panel/VstTab.jsx`

1. The "Loaded" section lists each `instanceId` separately (e.g. "Odin2:pad", "Odin2:bass"), each with its own GUI button.

2. No changes needed to the plugin browser section (instruments/effects list) — that shows available plugins, not instances.

### Bridge-side changes (Rust)

1. The plugin instance map changes from `HashMap<String, PluginInstance>` keyed by plugin name to keyed by the full `pluginId` (instance ID).

2. On `load_plugin`, use the `pluginName` field to locate and instantiate the plugin binary, but store it under the `pluginId` key.

3. On `render` and `show_gui`, look up by `pluginId`.

4. Each instance gets its own `AUAudioUnit`, its own parameter state, and its own GUI window.

### What about `vst3()` specifically

The `vst3()` helper currently appends `" (VST3)"` to force the VST3 format. With tagging:

```js
note("c3 e3").vst3("Odin2:pad")
// pluginName = "Odin2 (VST3)", instanceId = "Odin2 (VST3):pad"
```

The format suffix goes on the plugin name, not the tag.

## Testing

- Two loops with `vst("Odin2:pad")` and `vst("Odin2:bass")` produce independent audio
- Changing parameters via GUI of one instance does not affect the other
- `vst("Odin2")` without a tag produces a clear error
- Loading the same plugin with different tags creates separate entries in the Loaded panel
- Each instance's GUI opens independently
