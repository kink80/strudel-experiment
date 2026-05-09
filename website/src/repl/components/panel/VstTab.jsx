import { useState, useEffect, useCallback } from 'react';
import {
  connectVstBridge,
  isVstBridgeConnected,
  isVstBridgeInitialized,
  getLoadedVstPlugins,
} from '@strudel/webaudio';

export function VstTab() {
  const [connected, setConnected] = useState(false);
  const [plugins, setPlugins] = useState([]);
  const [loadedPlugins, setLoadedPlugins] = useState([]);
  const [filter, setFilter] = useState('');
  const [ws, setWs] = useState(null);

  // Check connection status periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setConnected(isVstBridgeConnected());
      const loaded = getLoadedVstPlugins();
      setLoadedPlugins([...loaded.keys()]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const connect = useCallback(() => {
    connectVstBridge();
    // Give it a moment then request plugin list
    setTimeout(() => {
      setConnected(isVstBridgeConnected());
      requestPluginList();
    }, 1000);
  }, []);

  const requestPluginList = useCallback(() => {
    if (!isVstBridgeInitialized()) return;
    // Access the websocket directly via a message
    try {
      const wsUrl = 'ws://localhost:8765';
      const tempWs = new WebSocket(wsUrl);
      tempWs.onopen = () => {
        tempWs.send(JSON.stringify({ type: 'list_plugins' }));
      };
      tempWs.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === 'plugin_list') {
            setPlugins(msg.plugins || []);
            tempWs.close();
          }
        } catch (e) {
          /* ignore binary messages */
        }
      };
      tempWs.onerror = () => tempWs.close();
    } catch (e) {
      /* ignore */
    }
  }, []);

  // Auto-connect and fetch list on mount
  useEffect(() => {
    if (!isVstBridgeInitialized()) {
      connectVstBridge();
    }
    const timer = setTimeout(requestPluginList, 1500);
    return () => clearTimeout(timer);
  }, []);

  const copySnippet = useCallback((name) => {
    const snippet = `note("c4 e4 g4").vst("${name}:lead")`;
    navigator.clipboard.writeText(snippet).catch(() => {});
  }, []);

  const showGui = useCallback((name) => {
    import('@strudel/webaudio').then((mod) => {
      if (mod.vstGui) {
        mod.vstGui(name);
      }
    });
  }, []);

  const filteredPlugins = plugins.filter((p) => {
    if (!filter) return true;
    const f = filter.toLowerCase();
    return p.name.toLowerCase().includes(f) || p.manufacturer.toLowerCase().includes(f);
  });

  const instruments = filteredPlugins.filter((p) => p.pluginType === 'Instrument');
  const effects = filteredPlugins.filter((p) => p.pluginType !== 'Instrument');

  return (
    <div className="text-foreground p-4 space-y-4 text-sm max-h-full overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold">VST Bridge</h2>
        <div className="flex items-center gap-2">
          <span className={`inline-block w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-xs opacity-70">{connected ? 'connected' : 'disconnected'}</span>
          {!connected && (
            <button
              className="text-xs px-2 py-1 bg-background rounded hover:opacity-70 cursor-pointer"
              onClick={connect}
            >
              connect
            </button>
          )}
          {connected && (
            <button
              className="text-xs px-2 py-1 bg-background rounded hover:opacity-70 cursor-pointer"
              onClick={requestPluginList}
            >
              refresh
            </button>
          )}
        </div>
      </div>

      {loadedPlugins.length > 0 && (
        <div>
          <h3 className="text-xs font-bold opacity-50 uppercase mb-1">Loaded</h3>
          <div className="flex flex-wrap gap-1">
            {loadedPlugins.map((name) => (
              <button
                key={name}
                className="text-xs px-2 py-1 bg-background rounded hover:opacity-70 cursor-pointer border border-green-800"
                onClick={() => showGui(name)}
                title="Open GUI"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <input
          type="text"
          placeholder="filter plugins..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-2 py-1 text-xs bg-background rounded border border-foreground/20 text-foreground"
        />
      </div>

      {instruments.length > 0 && (
        <div>
          <h3 className="text-xs font-bold opacity-50 uppercase mb-1">
            Instruments ({instruments.length})
          </h3>
          <div className="space-y-1">
            {instruments.map((p) => (
              <PluginRow key={p.name} plugin={p} onCopy={copySnippet} onGui={showGui} loaded={loadedPlugins.includes(pluginLoadId(p))} />
            ))}
          </div>
        </div>
      )}

      {effects.length > 0 && (
        <div>
          <h3 className="text-xs font-bold opacity-50 uppercase mb-1">
            Effects ({effects.length})
          </h3>
          <div className="space-y-1">
            {effects.map((p) => (
              <PluginRow key={p.name} plugin={p} onCopy={copySnippet} onGui={showGui} loaded={loadedPlugins.includes(pluginLoadId(p))} />
            ))}
          </div>
        </div>
      )}

      {plugins.length === 0 && connected && (
        <p className="text-xs opacity-50">No plugins found. Click refresh to scan.</p>
      )}

      {!connected && (
        <div className="text-xs opacity-70 space-y-2">
          <p>Start the VST bridge to use AudioUnit plugins:</p>
          <code className="block bg-background p-2 rounded">
            cd ~/work2/strudel-vst-bridge && cargo run
          </code>
          <p>Then use in strudel:</p>
          <code className="block bg-background p-2 rounded">
            note("c3 e3 g3").vst("Odin2")
          </code>
        </div>
      )}
    </div>
  );
}

function pluginLoadId(plugin) {
  // The bridge already includes the format suffix in the name (e.g. "Odin2 (VST3)", "Odin2 (AU)")
  return plugin.name;
}

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
