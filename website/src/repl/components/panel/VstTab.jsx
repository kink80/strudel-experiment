import { useState, useEffect, useCallback } from 'react';
import {
  connectVstBridge,
  isVstBridgeConnected,
  isVstBridgeInitialized,
  getVstInstances,
  createVstInstance,
  deleteVstInstance,
  onInstancesChanged,
  vstGui,
} from '@strudel/webaudio';

export function VstTab() {
  const [connected, setConnected] = useState(false);
  const [plugins, setPlugins] = useState([]);
  const [instances, setInstances] = useState(new Map());
  const [filter, setFilter] = useState('');
  const [labelInput, setLabelInput] = useState({});

  // Check connection status periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setConnected(isVstBridgeConnected());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Subscribe to instance registry changes + read initial state
  useEffect(() => {
    setInstances(getVstInstances());
    const unsubscribe = onInstancesChanged(() => {
      setInstances(getVstInstances());
    });
    return unsubscribe;
  }, []);

  const connect = useCallback(() => {
    connectVstBridge();
    setTimeout(() => {
      setConnected(isVstBridgeConnected());
      requestPluginList();
    }, 1000);
  }, []);

  const requestPluginList = useCallback(() => {
    if (!isVstBridgeInitialized()) return;
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

  const handleCreateInstance = useCallback((pluginName) => {
    const label = labelInput[pluginName];
    if (!label || !label.trim()) return;
    createVstInstance(label.trim(), pluginName);
    setLabelInput((prev) => ({ ...prev, [pluginName]: '' }));
  }, [labelInput]);

  const handleDelete = useCallback((label) => {
    deleteVstInstance(label);
  }, []);

  const handleShowGui = useCallback((label) => {
    vstGui(label);
  }, []);

  const copySnippet = useCallback((label) => {
    const snippet = `note("c4 e4 g4").vst("${label}")`;
    navigator.clipboard.writeText(snippet).catch(() => {});
  }, []);

  const filteredPlugins = plugins.filter((p) => {
    if (!filter) return true;
    const f = filter.toLowerCase();
    return p.name.toLowerCase().includes(f) || p.manufacturer.toLowerCase().includes(f);
  });

  const instruments = filteredPlugins.filter((p) => p.pluginType === 'Instrument');
  const effects = filteredPlugins.filter((p) => p.pluginType !== 'Instrument');

  // Group instances by plugin name
  const instancesByPlugin = new Map();
  for (const [label, info] of instances) {
    const list = instancesByPlugin.get(info.pluginName) || [];
    list.push(label);
    instancesByPlugin.set(info.pluginName, list);
  }

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
              <PluginRow
                key={p.name}
                plugin={p}
                instances={instancesByPlugin.get(p.name) || []}
                labelInput={labelInput[p.name] || ''}
                onLabelChange={(val) => setLabelInput((prev) => ({ ...prev, [p.name]: val }))}
                onCreate={() => handleCreateInstance(p.name)}
                onDelete={handleDelete}
                onGui={handleShowGui}
                onCopy={copySnippet}
              />
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
              <PluginRow
                key={p.name}
                plugin={p}
                instances={instancesByPlugin.get(p.name) || []}
                labelInput={labelInput[p.name] || ''}
                onLabelChange={(val) => setLabelInput((prev) => ({ ...prev, [p.name]: val }))}
                onCreate={() => handleCreateInstance(p.name)}
                onDelete={handleDelete}
                onGui={handleShowGui}
                onCopy={copySnippet}
              />
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
          <p>Then create instances in this panel and use in code:</p>
          <code className="block bg-background p-2 rounded">
            note("c3 e3 g3").vst("bass")
          </code>
        </div>
      )}
    </div>
  );
}

function PluginRow({ plugin, instances, labelInput, onLabelChange, onCreate, onDelete, onGui, onCopy }) {
  return (
    <div>
      <div className="flex items-center justify-between py-1 px-2 rounded bg-background/50 hover:bg-background">
        <div className="flex-1 min-w-0">
          <span className="text-xs font-medium truncate block">{plugin.name}</span>
          <span className="text-xs opacity-50">{plugin.manufacturer}</span>
        </div>
      </div>
      {/* Create instance input */}
      <div className="ml-4 mt-0.5 flex gap-1">
        <input
          type="text"
          placeholder="label..."
          value={labelInput}
          onChange={(e) => onLabelChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onCreate()}
          className="flex-1 px-2 py-0.5 text-xs bg-background rounded border border-foreground/20 text-foreground"
        />
        <button
          className="text-xs px-2 py-0.5 rounded bg-foreground/10 hover:bg-foreground/20 cursor-pointer"
          onClick={onCreate}
        >
          +
        </button>
      </div>
      {/* Instances */}
      {instances.length > 0 && (
        <div className="ml-4 mt-0.5 space-y-0.5">
          {instances.map((label) => (
            <div key={label} className="flex items-center justify-between py-0.5 px-2 rounded bg-background/30">
              <span className="text-xs font-medium">{label}</span>
              <div className="flex gap-1">
                <button
                  className="text-xs px-2 py-0.5 rounded bg-foreground/10 hover:bg-foreground/20 cursor-pointer"
                  onClick={() => onCopy(label)}
                  title="Copy vst() snippet"
                >
                  copy
                </button>
                <button
                  className="text-xs px-2 py-0.5 rounded bg-green-900/50 hover:bg-green-800/50 cursor-pointer"
                  onClick={() => onGui(label)}
                >
                  GUI
                </button>
                <button
                  className="text-xs px-2 py-0.5 rounded bg-red-900/50 hover:bg-red-800/50 cursor-pointer"
                  onClick={() => onDelete(label)}
                  title="Delete instance"
                >
                  x
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
