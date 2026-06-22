import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  connectVstBridge,
  isVstBridgeConnected,
  isVstBridgeInitialized,
  getVstInstances,
  createVstInstance,
  deleteVstInstance,
  onInstancesChanged,
  vstGui,
  saveVstPreset,
  loadVstPreset,
  listVstPresets,
  deleteVstPreset,
} from '@strudel/webaudio';

// ─── Style tokens (kept in one place so the tab feels coherent) ──────────────

const cn = {
  // Containers
  card: 'rounded-md bg-background/60 border border-foreground/10',
  cardHover: 'hover:border-foreground/25 transition-colors',
  // Inputs
  input:
    'px-2 py-1 text-xs bg-background rounded border border-foreground/15 text-foreground ' +
    'focus:outline-none focus:border-foreground/40 placeholder:opacity-40',
  // Buttons
  btn:
    'text-xs px-2 py-1 rounded border border-foreground/10 bg-foreground/5 ' +
    'hover:bg-foreground/15 hover:border-foreground/25 cursor-pointer ' +
    'disabled:opacity-30 disabled:cursor-not-allowed transition-colors',
  btnAccent:
    'text-xs px-2 py-1 rounded border border-green-700/30 bg-green-900/30 ' +
    'hover:bg-green-800/50 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors',
  btnDanger:
    'text-xs px-2 py-1 rounded border border-red-700/30 bg-red-900/20 ' +
    'hover:bg-red-800/40 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors',
  // Misc
  badge:
    'inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full ' +
    'text-[10px] font-mono bg-foreground/10 text-foreground/80',
  mono: 'font-mono',
  muted: 'opacity-50',
  caption: 'text-[10px] uppercase tracking-wider opacity-50 font-semibold',
};

// ─── Main tab ───────────────────────────────────────────────────────────────

export function VstTab() {
  const [connected, setConnected] = useState(false);
  const [plugins, setPlugins] = useState([]);
  const [instances, setInstances] = useState(new Map());
  const [filter, setFilter] = useState('');
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [labelInput, setLabelInput] = useState({});
  const [expanded, setExpanded] = useState({}); // pluginName -> bool

  useEffect(() => {
    const interval = setInterval(() => setConnected(isVstBridgeConnected()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setInstances(getVstInstances());
    return onInstancesChanged(() => setInstances(getVstInstances()));
  }, []);

  const requestPluginList = useCallback(() => {
    if (!isVstBridgeInitialized()) return;
    try {
      const tempWs = new WebSocket('ws://localhost:8765');
      tempWs.onopen = () => tempWs.send(JSON.stringify({ type: 'list_plugins' }));
      tempWs.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === 'plugin_list') {
            setPlugins(msg.plugins || []);
            tempWs.close();
          }
        } catch (e) { /* ignore */ }
      };
      tempWs.onerror = () => tempWs.close();
    } catch (e) { /* ignore */ }
  }, []);

  const connect = useCallback(() => {
    connectVstBridge();
    setTimeout(() => {
      setConnected(isVstBridgeConnected());
      requestPluginList();
    }, 1000);
  }, [requestPluginList]);

  useEffect(() => {
    if (!isVstBridgeInitialized()) connectVstBridge();
    const timer = setTimeout(requestPluginList, 1500);
    return () => clearTimeout(timer);
  }, [requestPluginList]);

  const handleCreateInstance = useCallback((pluginName) => {
    const label = labelInput[pluginName];
    if (!label || !label.trim()) return;
    createVstInstance(label.trim(), pluginName);
    setLabelInput((prev) => ({ ...prev, [pluginName]: '' }));
    setExpanded((prev) => ({ ...prev, [pluginName]: true }));
  }, [labelInput]);

  const handleDelete = useCallback((label) => deleteVstInstance(label), []);
  const handleShowGui = useCallback((label) => vstGui(label), []);
  const copySnippet = useCallback((label) => {
    navigator.clipboard.writeText(`note("c4 e4 g4").vst("${label}")`).catch(() => {});
  }, []);

  // Group instances by plugin name
  const instancesByPlugin = useMemo(() => {
    const map = new Map();
    for (const [label, info] of instances) {
      const list = map.get(info.pluginName) || [];
      list.push(label);
      map.set(info.pluginName, list);
    }
    return map;
  }, [instances]);

  const filtered = useMemo(() => {
    const f = filter.toLowerCase();
    return plugins.filter((p) => {
      if (showOnlyActive && !(instancesByPlugin.get(p.name)?.length)) return false;
      if (!f) return true;
      return p.name.toLowerCase().includes(f) || p.manufacturer.toLowerCase().includes(f);
    });
  }, [plugins, filter, showOnlyActive, instancesByPlugin]);

  const instruments = filtered.filter((p) => p.pluginType === 'Instrument');
  const effects = filtered.filter((p) => p.pluginType !== 'Instrument');
  const totalActive = instances.size;

  return (
    <div className="text-foreground p-4 space-y-3 text-sm max-h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <h2 className="text-base font-bold">VST Bridge</h2>
          {totalActive > 0 && (
            <span className={cn.badge} title="active instances">{totalActive}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              connected ? 'bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.7)]' : 'bg-red-500'
            }`}
          />
          <span className="text-xs opacity-70">{connected ? 'connected' : 'disconnected'}</span>
          <button className={cn.btn} onClick={connected ? requestPluginList : connect}>
            {connected ? 'refresh' : 'connect'}
          </button>
        </div>
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="filter plugins..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={`${cn.input} flex-1`}
        />
        <label className="flex items-center gap-1.5 text-xs opacity-70 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={showOnlyActive}
            onChange={(e) => setShowOnlyActive(e.target.checked)}
            className="accent-green-500"
          />
          active only
        </label>
      </div>

      {!connected && <DisconnectedHelp />}

      {/* Sections */}
      {instruments.length > 0 && (
        <Section title="Instruments" count={instruments.length}>
          {instruments.map((p) => (
            <PluginRow
              key={p.name}
              plugin={p}
              instances={instancesByPlugin.get(p.name) || []}
              labelInput={labelInput[p.name] || ''}
              expanded={expanded[p.name] ?? false}
              onToggle={() => setExpanded((prev) => ({ ...prev, [p.name]: !prev[p.name] }))}
              onLabelChange={(val) => setLabelInput((prev) => ({ ...prev, [p.name]: val }))}
              onCreate={() => handleCreateInstance(p.name)}
              onDelete={handleDelete}
              onGui={handleShowGui}
              onCopy={copySnippet}
            />
          ))}
        </Section>
      )}

      {effects.length > 0 && (
        <Section title="Effects" count={effects.length}>
          {effects.map((p) => (
            <PluginRow
              key={p.name}
              plugin={p}
              instances={instancesByPlugin.get(p.name) || []}
              labelInput={labelInput[p.name] || ''}
              expanded={expanded[p.name] ?? false}
              onToggle={() => setExpanded((prev) => ({ ...prev, [p.name]: !prev[p.name] }))}
              onLabelChange={(val) => setLabelInput((prev) => ({ ...prev, [p.name]: val }))}
              onCreate={() => handleCreateInstance(p.name)}
              onDelete={handleDelete}
              onGui={handleShowGui}
              onCopy={copySnippet}
            />
          ))}
        </Section>
      )}

      {plugins.length === 0 && connected && (
        <p className="text-xs opacity-50 italic">No plugins found. Click refresh to scan.</p>
      )}
      {plugins.length > 0 && filtered.length === 0 && (
        <p className="text-xs opacity-50 italic">No matches.</p>
      )}
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function Section({ title, count, children }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 px-1">
        <h3 className={cn.caption}>{title}</h3>
        <span className="flex-1 border-t border-foreground/10" />
        <span className={cn.badge}>{count}</span>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function DisconnectedHelp() {
  return (
    <div className={`${cn.card} p-3 space-y-2 text-xs opacity-80`}>
      <p>Start the VST bridge to use AudioUnit plugins:</p>
      <code className={`block ${cn.mono} bg-background p-2 rounded border border-foreground/10`}>
        cd ~/work2/strudel-vst-bridge && cargo run
      </code>
      <p className="opacity-60">Then create instances below and reference them in code:</p>
      <code className={`block ${cn.mono} bg-background p-2 rounded border border-foreground/10`}>
        note(&quot;c3 e3 g3&quot;).vst(&quot;bass&quot;)
      </code>
    </div>
  );
}

function PluginRow({
  plugin, instances, labelInput, expanded, onToggle,
  onLabelChange, onCreate, onDelete, onGui, onCopy,
}) {
  const hasInstances = instances.length > 0;
  // Auto-expand on first interaction by parent; keep manual toggle too.
  const isOpen = expanded || hasInstances;

  return (
    <div
      className={`${cn.card} ${cn.cardHover} overflow-hidden ${
        hasInstances ? 'border-l-2 border-l-green-600/60' : ''
      }`}
    >
      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-1.5 px-2 hover:bg-foreground/5 cursor-pointer text-left"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className={`text-[10px] opacity-40 inline-block w-3 ${isOpen ? '' : '-rotate-90'} transition-transform`}>
            ▾
          </span>
          <div className="min-w-0">
            <span className="text-xs font-medium truncate block">{plugin.name}</span>
            <span className="text-[10px] opacity-50">{plugin.manufacturer}</span>
          </div>
        </div>
        {hasInstances && <span className={cn.badge}>{instances.length}</span>}
      </button>

      {isOpen && (
        <div className="px-2 pb-2 pt-1 space-y-2 border-t border-foreground/5">
          {/* Create alias */}
          <div className="flex gap-1.5">
            <input
              type="text"
              placeholder="new alias..."
              value={labelInput}
              onChange={(e) => onLabelChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onCreate()}
              className={`${cn.input} ${cn.mono} flex-1`}
            />
            <button
              className={cn.btn}
              onClick={onCreate}
              disabled={!labelInput.trim()}
              title="Create instance"
            >
              + alias
            </button>
          </div>

          {/* Instances */}
          {hasInstances && (
            <div className="space-y-0.5">
              {instances.map((label) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-1 px-2 rounded bg-foreground/5 hover:bg-foreground/10 group"
                >
                  <span className={`text-xs ${cn.mono}`} title={`MIDI: strudel-vst:${label}`}>
                    <span className="opacity-40">vst(</span>
                    <span className="font-medium">&quot;{label}&quot;</span>
                    <span className="opacity-40">)</span>
                    <span className="opacity-30 ml-2">→ strudel-vst:{label}</span>
                  </span>
                  <div className="flex gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button className={cn.btn} onClick={() => onCopy(label)} title="Copy snippet">copy</button>
                    <button className={cn.btnAccent} onClick={() => onGui(label)} title="Open plugin GUI">GUI</button>
                    <button
                      className={cn.btnDanger}
                      onClick={() => onDelete(label)}
                      title="Delete instance"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Presets */}
          <PresetBar pluginName={plugin.name} hasInstances={hasInstances} />
        </div>
      )}
    </div>
  );
}

function PresetBar({ pluginName, hasInstances }) {
  const [presets, setPresets] = useState([]);
  const [name, setName] = useState('');
  const [selected, setSelected] = useState('');
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const list = await listVstPresets(pluginName);
      setPresets(list);
      if (list.length && !list.includes(selected)) setSelected(list[0]);
      if (!list.length) setSelected('');
    } catch (e) { /* bridge not connected */ }
  }, [pluginName, selected]);

  useEffect(() => { refresh(); }, [refresh]);

  const onSave = useCallback(async () => {
    const presetName = (name || selected).trim();
    if (!presetName) return;
    setBusy(true);
    try { await saveVstPreset(pluginName, presetName); setName(''); await refresh(); setSelected(presetName); }
    finally { setBusy(false); }
  }, [pluginName, name, selected, refresh]);

  const onLoad = useCallback(async () => {
    if (!selected) return;
    setBusy(true);
    try { await loadVstPreset(pluginName, selected); }
    finally { setBusy(false); }
  }, [pluginName, selected]);

  const onDel = useCallback(async () => {
    if (!selected) return;
    if (!confirm(`Delete preset "${selected}" for ${pluginName}?`)) return;
    setBusy(true);
    try { await deleteVstPreset(pluginName, selected); await refresh(); }
    finally { setBusy(false); }
  }, [pluginName, selected, refresh]);

  if (!hasInstances && presets.length === 0) return null;

  return (
    <div className="pt-1.5 border-t border-foreground/5 space-y-1">
      <div className={cn.caption}>Presets</div>
      <div className="flex flex-wrap items-center gap-1.5">
        <input
          type="text"
          placeholder="name…"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSave()}
          className={`${cn.input} ${cn.mono} w-28`}
          disabled={busy || !hasInstances}
          title={hasInstances ? '' : 'Create an alias first'}
        />
        <button
          className={cn.btn}
          onClick={onSave}
          disabled={busy || !hasInstances || !(name || selected).trim()}
          title="Save current alias states as a preset"
        >
          save
        </button>

        {presets.length > 0 && (
          <>
            <span className="opacity-30 text-xs">|</span>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className={`${cn.input} ${cn.mono} pr-6`}
              disabled={busy}
            >
              {presets.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <button className={cn.btnAccent} onClick={onLoad} disabled={busy || !selected}>load</button>
            <button className={cn.btnDanger} onClick={onDel} disabled={busy || !selected} title="Delete preset">×</button>
          </>
        )}
      </div>
    </div>
  );
}
