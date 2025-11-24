/*
RecorderTab.jsx - MIDI Pattern Recorder UI
Copyright (C) 2024 Strudel contributors - see <https://codeberg.org/uzu/strudel>
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createRecorder, RecordingState, WebMidi } from '@strudel/recorder';
import { getAudioContext, soundMap, connectToDestination } from '@strudel/webaudio';
import * as strudel from '@strudel/core';
import cx from '@src/cx.mjs';
import { useStore } from '@nanostores/react';

// Sound categories (matching SoundsTab)
const SOUND_CATEGORIES = {
  DRUMS: 'drum-machines',
  SAMPLES: 'samples',
  SYNTHS: 'synths',
  WAVETABLES: 'wavetables',
  USER: 'user',
};

// Map pad index to MIDI note (starting from C3 = 60)
const getPadToNoteMap = (totalPads) => Array.from({ length: totalPads }, (_, i) => 60 + i);

// Calculate grid dimensions based on pattern length
function getGridDimensions(patternLength) {
  // Try to make a nice looking grid
  if (patternLength <= 8) {
    return { rows: 2, cols: 4 }; // 2x4 = 8
  } else if (patternLength <= 16) {
    return { rows: 4, cols: 4 }; // 4x4 = 16
  } else {
    return { rows: 4, cols: 8 }; // 4x8 = 32
  }
}

function FormItem({ label, children }) {
  return (
    <div className="grid gap-2">
      <label className="font-semibold">{label}</label>
      {children}
    </div>
  );
}

function NumberSlider({ value, onChange, step = 1, ...rest }) {
  return (
    <div className="flex space-x-2 gap-1">
      <input
        className="p-2 grow"
        type="range"
        value={value}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        {...rest}
      />
      <input
        type="number"
        value={value}
        step={step}
        className="w-16 bg-background rounded-md px-2"
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function PadGrid({ patternLength, activePads, currentBeat, onPadClick, stepsPerBar, manualPattern }) {
  const { rows, cols } = getGridDimensions(patternLength);
  const PAD_TO_NOTE = getPadToNoteMap(patternLength);

  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: patternLength }).map((_, index) => {
        const isActive = activePads.has(index);
        const isCurrentBeat = currentBeat === index;
        const hasToggledNote = manualPattern[index]?.size > 0;
        const barNumber = Math.floor(index / stepsPerBar);
        const isEvenBar = barNumber % 2 === 0;

        return (
          <button
            key={index}
            onClick={() => onPadClick(index)}
            className={cx(
              'aspect-square rounded-lg transition-all relative border-4',
              // Base background - show toggled notes, alternating for bars
              hasToggledNote
                ? 'bg-purple-600/80'
                : isEvenBar
                  ? 'bg-lineBackground'
                  : 'bg-lineBackground/60',
              // Border and effects - PLAYBACK POSITION NOW MUCH MORE VISIBLE
              // Keep border-4 consistent on all states to prevent size shift
              isActive && isCurrentBeat
                ? 'border-cyan-400 ring-4 ring-yellow-400 ring-offset-1 shadow-2xl shadow-yellow-500/70 animate-pulse'
                : isActive
                  ? 'border-cyan-400 shadow-lg shadow-cyan-500/50'
                  : isCurrentBeat
                    ? 'bg-yellow-400 border-yellow-300 shadow-2xl shadow-yellow-400/80 animate-pulse'
                    : hasToggledNote
                      ? 'border-purple-400 hover:bg-purple-500'
                      : 'border-foreground/20 hover:bg-lineHighlight hover:border-foreground/40',
            )}
            aria-label={`Pad ${index + 1} - Bar ${barNumber + 1} - Note ${PAD_TO_NOTE[index]}${hasToggledNote ? ' (toggled)' : ''}`}
          >
            <span className={cx('text-xs', isCurrentBeat || hasToggledNote ? 'opacity-90 font-bold' : 'opacity-50')}>
              {index + 1}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function RecorderTab({ context }) {
  const sounds = useStore(soundMap);

  // Get BPM from REPL's scheduler (cpm * 60 = bpm, assuming 1 cycle = 1 bar)
  const getReplBpm = useCallback(() => {
    if (context?.editor?.repl?.scheduler) {
      const cps = context.editor.repl.scheduler.cps;
      // cps = cycles per second, cpm = cycles per minute
      const cpm = cps * 60;
      // For 4/4 time: 1 cycle = 1 bar = 4 beats
      // So BPM = CPM * 4
      return Math.round(cpm * 4);
    }
    return 120; // default
  }, [context]);

  const [bpm, setBpm] = useState(getReplBpm());
  const [patternLength, setPatternLength] = useState(16);
  const [stepsPerBeat, setStepsPerBeat] = useState(4); // How many steps = 1 beat
  const [beatsPerBar, setBeatsPerBar] = useState(4); // Time signature
  const [midiDevices, setMidiDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(0);
  const [recordingState, setRecordingState] = useState(RecordingState.IDLE);
  const [generatedCode, setGeneratedCode] = useState('');
  const [activePads, setActivePads] = useState(new Set());
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [eventCount, setEventCount] = useState(0);
  const [error, setError] = useState(null);

  // Manual pattern editing state
  const [soundCategory, setSoundCategory] = useState(SOUND_CATEGORIES.DRUMS);
  const [selectedSound, setSelectedSound] = useState(''); // Which sound to use
  const [manualPattern, setManualPattern] = useState([]); // Array of Set objects, one per step
  const [livePreviewCode, setLivePreviewCode] = useState('');
  const [selectedNote, setSelectedNote] = useState(60); // C3 - for chromatic instruments
  const [playOnClick, setPlayOnClick] = useState(false); // Whether to play sound when clicking pads

  const recorderRef = useRef(null);
  const padTimersRef = useRef(new Map());
  const beatAnimationRef = useRef(null);

  // Get available sounds for current category
  const availableSounds = useMemo(() => {
    if (!sounds) return [];

    const allSounds = Object.entries(sounds)
      .filter(([key]) => !key.startsWith('_'))
      .sort((a, b) => a[0].localeCompare(b[0]));

    let filtered;
    if (soundCategory === SOUND_CATEGORIES.DRUMS) {
      filtered = allSounds.filter(([_, { data }]) => data.type === 'sample' && data.tag === 'drum-machines');
    } else if (soundCategory === SOUND_CATEGORIES.SAMPLES) {
      filtered = allSounds.filter(([_, { data }]) => data.type === 'sample' && data.tag !== 'drum-machines');
    } else if (soundCategory === SOUND_CATEGORIES.SYNTHS) {
      filtered = allSounds.filter(([_, { data }]) => ['synth', 'soundfont'].includes(data.type));
    } else if (soundCategory === SOUND_CATEGORIES.WAVETABLES) {
      filtered = allSounds.filter(([_, { data }]) => data.type === 'wavetable');
    } else if (soundCategory === SOUND_CATEGORIES.USER) {
      filtered = allSounds.filter(([_, { data }]) => !data.prebake);
    } else {
      filtered = allSounds;
    }

    return filtered.map(([name]) => name);
  }, [sounds, soundCategory]);

  // Auto-select first sound when category changes or sounds load
  useEffect(() => {
    if (availableSounds.length > 0 && !availableSounds.includes(selectedSound)) {
      setSelectedSound(availableSounds[0]);
    }
  }, [availableSounds, selectedSound]);

  // Check if current sound is chromatic (synth/soundfont)
  const isChromatic = useMemo(() => {
    if (!sounds || !selectedSound) return false;
    const soundData = sounds[selectedSound];
    return soundData?.data?.type === 'synth' || soundData?.data?.type === 'soundfont';
  }, [sounds, selectedSound]);

  // Calculate recording metrics
  const stepsPerBar = stepsPerBeat * beatsPerBar;
  const totalBeats = patternLength / stepsPerBeat;
  const totalBars = patternLength / stepsPerBar;

  // Function to get which bar a pad belongs to (0-indexed)
  const getBarForPad = useCallback((padIndex) => {
    return Math.floor(padIndex / stepsPerBar);
  }, [stepsPerBar]);

  // Initialize manual pattern when pattern length changes
  useEffect(() => {
    setManualPattern(Array(patternLength).fill(null).map(() => new Set()));
  }, [patternLength]);

  // Update pattern when sound changes (replace old sound with new one)
  const prevSoundRef = useRef(selectedSound);
  useEffect(() => {
    if (!isChromatic && prevSoundRef.current !== selectedSound && prevSoundRef.current) {
      const oldSound = prevSoundRef.current;
      const newSound = selectedSound;

      setManualPattern((prev) => {
        return prev.map((stepSet) => {
          const newSet = new Set(stepSet);
          if (newSet.has(oldSound)) {
            newSet.delete(oldSound);
            newSet.add(newSound);
          }
          return newSet;
        });
      });
    }
    prevSoundRef.current = selectedSound;
  }, [selectedSound, isChromatic]);

  // Play sound for a pad
  const playPadSound = useCallback(async (padIndex, midiNote = null, scheduledTime = null) => {
    if (!selectedSound) return;

    try {
      const ctx = getAudioContext();

      // Ensure audio context is running
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      let soundName, params;
      if (isChromatic) {
        // Chromatic instruments: use the selected note or MIDI input note
        const noteToPlay = midiNote || selectedNote;
        soundName = selectedSound;
        params = {
          note: noteToPlay,
          s: soundName,
          clip: 1,
          release: 0.5,
          sustain: 1,
          duration: 0.5,
        };
      } else {
        // Samples/drums: use the selected sound
        soundName = selectedSound;
        params = {
          s: soundName,
          clip: 1,
          release: 0.5,
          sustain: 1,
          duration: 0.5,
        };
      }

      // Use the same approach as SoundsTab
      const soundData = sounds?.[soundName];
      console.log('playPadSound:', { soundName, soundData: !!soundData, onTrigger: !!soundData?.onTrigger, midiNote, isChromatic });
      if (soundData?.onTrigger) {
        // If scheduledTime is provided (during playback), use it; otherwise add a small delay for immediate playback
        const time = scheduledTime !== null ? scheduledTime : ctx.currentTime + 0.01;
        const ref = await soundData.onTrigger(time, params, () => {});
        if (ref?.node) {
          connectToDestination(ref.node);
        }
      } else {
        console.warn('No sound data or onTrigger for:', soundName);
      }
    } catch (err) {
      console.error('Failed to play sound:', err);
    }
  }, [selectedSound, selectedNote, isChromatic, sounds]);

  // Generate strudel code from manual pattern
  const generateManualPatternCode = useCallback(() => {
    const steps = [];

    for (let i = 0; i < patternLength; i++) {
      const stepNotes = manualPattern[i];
      if (!stepNotes || stepNotes.size === 0) {
        steps.push('~');
      } else if (stepNotes.size === 1) {
        const note = Array.from(stepNotes)[0];
        steps.push(isChromatic ? note : `"${note}"`);
      } else {
        // Multiple notes (chord)
        const notes = Array.from(stepNotes);
        steps.push(isChromatic ? `[${notes.join(':')}]` : `[${notes.map((n) => `"${n}"`).join(' ')}]`);
      }
    }

    // Build pattern string
    const patternStr = steps.join(' ');

    if (isChromatic) {
      return `note("${patternStr}").sound("${selectedSound}")`;
    } else {
      // For drums/samples, use the selected sound
      return `s("${patternStr}")`; // The pattern already contains the correct sound name
    }
  }, [manualPattern, isChromatic, selectedSound, patternLength]);

  // Update live preview whenever pattern changes
  useEffect(() => {
    const hasNotes = manualPattern.some((step) => step && step.size > 0);
    if (hasNotes) {
      setLivePreviewCode(generateManualPatternCode());
    } else {
      setLivePreviewCode('');
    }
  }, [manualPattern, generateManualPatternCode]);

  // Initialize WebMidi and recorder
  useEffect(() => {
    let mounted = true;

    const initWebMidi = async () => {
      try {
        if (!WebMidi.enabled) {
          await WebMidi.enable({ sysex: true });
        }

        if (!mounted) return;

        // Get available MIDI inputs
        const inputs = WebMidi.inputs.map((input, index) => ({
          index,
          name: input.name,
        }));
        setMidiDevices(inputs);

        // Create recorder instance
        const recorder = createRecorder({
          bpm,
          patternLength,
          stepsPerBeat: 4,
          midiDevice: selectedDevice,
          getAudioContext,
          onStateChange: (state) => {
            if (!mounted) return;
            setRecordingState(state.state);
            setEventCount(state.eventCount);
          },
          onNoteEvent: (event) => {
            console.log('MIDI event received:', event);
            if (!mounted) return;
            // Always play the MIDI note sound
            playPadSound(0, event.note);

            // Find pad index for visual feedback
            const PAD_TO_NOTE = getPadToNoteMap(patternLength);
            const padIndex = PAD_TO_NOTE.indexOf(event.note);
            if (padIndex >= 0) {
              triggerPad(padIndex);
            }
          },
        });

        recorderRef.current = recorder;

        // Initialize MIDI immediately so preview works
        try {
          if (inputs.length > 0) {
            await recorder.initializeMidi(selectedDevice);
            console.log('MIDI initialized for device:', selectedDevice);
          }
        } catch (midiErr) {
          console.warn('Could not initialize MIDI:', midiErr);
        }
      } catch (err) {
        if (!mounted) return;
        setError(err.message);
        console.error('Failed to initialize recorder:', err);
      }
    };

    initWebMidi();

    return () => {
      mounted = false;
      if (recorderRef.current) {
        recorderRef.current.destroy();
      }
      // Clear all pad timers
      padTimersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, [playPadSound, selectedSound, isChromatic, patternLength, selectedDevice, bpm]);

  // Sync BPM with REPL's scheduler
  useEffect(() => {
    const syncBpm = () => {
      const replBpm = getReplBpm();
      if (replBpm !== bpm) {
        setBpm(replBpm);
      }
    };

    // Check BPM every second when REPL is playing
    const interval = setInterval(syncBpm, 1000);
    return () => clearInterval(interval);
  }, [bpm, getReplBpm]);

  // Track current beat position for visualization and playback
  const lastPlayedStepRef = useRef(-1);

  useEffect(() => {
    const trackBeat = () => {
      // Try multiple possible paths to scheduler
      const scheduler =
        context?.editor?.repl?.scheduler ||
        context?.editorRef?.current?.repl?.scheduler ||
        window.strudelMirror?.repl?.scheduler;

      if (scheduler && scheduler.started) {
        // Get current time - prefer getTime() method if available
        const time = typeof scheduler.getTime === 'function' ? scheduler.getTime() : getAudioContext().currentTime;

        // Calculate current cycle using Cyclist's properties
        const cyclesSinceChange = (time - scheduler.seconds_at_cps_change) * scheduler.cps;
        const currentCycle = scheduler.num_cycles_at_cps_change + cyclesSinceChange;

        // Convert cycle position to step position
        const stepInCycle = (currentCycle * patternLength) % patternLength;
        const currentStep = Math.floor(stepInCycle);

        setCurrentBeat(currentStep);

        // Play manual pattern notes if we've moved to a new step (always during playback)
        if (currentStep !== lastPlayedStepRef.current && currentStep >= 0 && currentStep < manualPattern.length) {
          lastPlayedStepRef.current = currentStep;
          const stepNotes = manualPattern[currentStep];

          if (stepNotes && stepNotes.size > 0) {
            // Calculate the ideal start time for this step
            const stepDuration = 1 / scheduler.cps / patternLength;
            const cyclesSinceStart = currentCycle - scheduler.num_cycles_at_cps_change;
            const idealStepStartTime = scheduler.seconds_at_cps_change + cyclesSinceStart / scheduler.cps;

            // Add a small lookahead to account for processing time
            const ctx = getAudioContext();
            const lookahead = 0.12; // 120ms lookahead
            const playTime = Math.max(idealStepStartTime, ctx.currentTime + lookahead);

            // Play all notes in this step at the scheduled time
            stepNotes.forEach((noteOrSound) => {
              if (isChromatic) {
                // For chromatic instruments, noteOrSound is a MIDI note number
                playPadSound(currentStep, noteOrSound, playTime);
              } else {
                // For drums/samples, noteOrSound is the sound name - play it
                playPadSound(currentStep, null, playTime);
              }
            });
          }
        }
      } else {
        setCurrentBeat(-1);
        lastPlayedStepRef.current = -1;
      }

      beatAnimationRef.current = requestAnimationFrame(trackBeat);
    };

    // Initial call
    trackBeat();

    return () => {
      if (beatAnimationRef.current) {
        cancelAnimationFrame(beatAnimationRef.current);
      }
    };
  }, [context, patternLength, manualPattern, isChromatic, playPadSound]);

  // Update recorder settings when they change
  useEffect(() => {
    if (recorderRef.current) {
      recorderRef.current.setBpm(bpm);
    }
  }, [bpm]);

  useEffect(() => {
    if (recorderRef.current) {
      recorderRef.current.setPatternLength(patternLength);
    }
  }, [patternLength]);

  // Trigger pad visual feedback
  const triggerPad = useCallback((padIndex) => {
    setActivePads((prev) => new Set(prev).add(padIndex));

    // Clear existing timer for this pad
    if (padTimersRef.current.has(padIndex)) {
      clearTimeout(padTimersRef.current.get(padIndex));
    }

    // Set timer to deactivate pad after 200ms
    const timer = setTimeout(() => {
      setActivePads((prev) => {
        const next = new Set(prev);
        next.delete(padIndex);
        return next;
      });
      padTimersRef.current.delete(padIndex);
    }, 200);

    padTimersRef.current.set(padIndex, timer);
  }, []);

  // Handle pad click - toggle note and play sound
  const handlePadClick = useCallback(
    (padIndex) => {
      // Play sound only if enabled
      if (playOnClick) {
        playPadSound(padIndex);
      }

      // Trigger visual feedback
      triggerPad(padIndex);

      // Toggle note in manual pattern
      setManualPattern((prev) => {
        const newPattern = [...prev];
        const stepSet = new Set(newPattern[padIndex]);

        // Get the sound identifier for this pad
        let soundId;

        if (isChromatic) {
          // For chromatic: use the selected note (same for all pads)
          soundId = selectedNote;
        } else {
          // For samples/drums: use the selected sound (same for all pads)
          soundId = selectedSound;
        }

        // Toggle the sound
        if (stepSet.has(soundId)) {
          stepSet.delete(soundId);
        } else {
          stepSet.add(soundId);
        }

        newPattern[padIndex] = stepSet;
        return newPattern;
      });
    },
    [playPadSound, triggerPad, isChromatic, selectedNote, selectedSound, playOnClick],
  );

  // Recording controls
  const handleStartRecording = async () => {
    try {
      setError(null);
      setGeneratedCode('');
      setEventCount(0);
      await recorderRef.current?.startRecording();
    } catch (err) {
      setError(err.message);
      console.error('Failed to start recording:', err);
    }
  };

  const handleStopRecording = () => {
    try {
      const code = recorderRef.current?.stopRecording();
      setGeneratedCode(code || '');
    } catch (err) {
      setError(err.message);
      console.error('Failed to stop recording:', err);
    }
  };

  const handleCancelRecording = () => {
    recorderRef.current?.cancelRecording();
    setGeneratedCode('');
    setEventCount(0);
  };

  const handleInsertToEditor = () => {
    if (!generatedCode || !context) return;

    // Insert code into the editor
    const editor = context.editor;
    if (editor && editor.view) {
      const currentCode = editor.view.state.doc.toString();
      const newCode = currentCode ? `${currentCode}\n\n${generatedCode}` : generatedCode;
      editor.setCode(newCode);
    }
  };

  const getRecordButtonLabel = () => {
    switch (recordingState) {
      case RecordingState.READY:
        return 'Pre-roll...';
      case RecordingState.RECORDING:
        return 'Stop Recording';
      case RecordingState.IDLE:
      default:
        return 'Start Recording';
    }
  };

  const isRecording = recordingState === RecordingState.RECORDING || recordingState === RecordingState.READY;

  return (
    <div className="text-foreground p-4 space-y-4 w-full">
      <h2 className="text-xl font-bold">MIDI Pattern Recorder</h2>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded-md">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Configuration */}
      <div className="space-y-3">
        <FormItem label="MIDI Input Device">
          <select
            className="p-2 bg-background rounded-md text-foreground border border-foreground/20"
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(Number(e.target.value))}
            disabled={isRecording}
          >
            {midiDevices.length === 0 ? (
              <option>No MIDI devices found</option>
            ) : (
              midiDevices.map((device) => (
                <option key={device.index} value={device.index}>
                  {device.name}
                </option>
              ))
            )}
          </select>
        </FormItem>

        <FormItem label={`BPM: ${bpm} (synced with REPL)`}>
          <div className="text-xs opacity-60 -mt-1 mb-1">
            Automatically synced with REPL tempo
          </div>
        </FormItem>

        <FormItem label={`Pattern Length: ${patternLength} steps`}>
          <NumberSlider
            value={patternLength}
            onChange={setPatternLength}
            min={8}
            max={32}
            step={4}
            disabled={isRecording}
          />
        </FormItem>

        <FormItem label={`Steps per Beat: ${stepsPerBeat}`}>
          <select
            className="p-2 bg-background rounded-md text-foreground border border-foreground/20"
            value={stepsPerBeat}
            onChange={(e) => setStepsPerBeat(Number(e.target.value))}
            disabled={isRecording}
          >
            <option value={1}>1 (whole notes)</option>
            <option value={2}>2 (half notes)</option>
            <option value={4}>4 (quarter notes/16th notes)</option>
            <option value={8}>8 (32nd notes)</option>
          </select>
        </FormItem>

        <FormItem label={`Beats per Bar: ${beatsPerBar}`}>
          <select
            className="p-2 bg-background rounded-md text-foreground border border-foreground/20"
            value={beatsPerBar}
            onChange={(e) => setBeatsPerBar(Number(e.target.value))}
            disabled={isRecording}
          >
            <option value={2}>2 (2/4 time)</option>
            <option value={3}>3 (3/4 time)</option>
            <option value={4}>4 (4/4 time)</option>
            <option value={6}>6 (6/8 time)</option>
            <option value={8}>8 (8/8 time)</option>
          </select>
        </FormItem>

        <FormItem label="Sound Category">
          <select
            className="p-2 bg-background rounded-md text-foreground border border-foreground/20"
            value={soundCategory}
            onChange={(e) => setSoundCategory(e.target.value)}
          >
            <option value={SOUND_CATEGORIES.DRUMS}>Drum Machines</option>
            <option value={SOUND_CATEGORIES.SAMPLES}>Samples</option>
            <option value={SOUND_CATEGORIES.SYNTHS}>Synths</option>
            <option value={SOUND_CATEGORIES.WAVETABLES}>Wavetables</option>
            <option value={SOUND_CATEGORIES.USER}>User</option>
          </select>
          <div className="text-xs opacity-60 mt-1">
            Choose a category to filter available sounds
          </div>
        </FormItem>

        <FormItem label="Sound">
          <select
            className="p-2 bg-background rounded-md text-foreground border border-foreground/20"
            value={selectedSound}
            onChange={(e) => setSelectedSound(e.target.value)}
            disabled={availableSounds.length === 0}
          >
            {availableSounds.length === 0 ? (
              <option>No sounds available</option>
            ) : (
              availableSounds.map((sound) => (
                <option key={sound} value={sound}>
                  {sound}
                </option>
              ))
            )}
          </select>
          <div className="text-xs opacity-60 mt-1">
            {isChromatic ? 'Chromatic instrument (plays MIDI notes)' : 'Sample (plays as-is)'}
          </div>
        </FormItem>

        {isChromatic && (
          <FormItem label={`Note for Manual Input: ${selectedNote} (MIDI)`}>
            <NumberSlider
              value={selectedNote}
              onChange={setSelectedNote}
              min={0}
              max={127}
              step={1}
            />
            <div className="text-xs opacity-60 mt-1">
              Select which note to add when clicking pads (MIDI: 0-127, C3=60)
            </div>
          </FormItem>
        )}

        {/* Recording Info Display */}
        <div className="bg-lineHighlight p-3 rounded-md border border-foreground/20">
          <div className="text-sm font-semibold mb-1">Recording Info:</div>
          <div className="text-xs space-y-1">
            <p>Will record: <strong>{totalBars.toFixed(1)} bar{totalBars !== 1 ? 's' : ''}</strong> ({totalBeats.toFixed(1)} beats)</p>
            <p>Bars alternate background shades for visual grouping</p>
            {recordingState === RecordingState.RECORDING && (
              <p className="text-green-400 animate-pulse">🔴 Recording in progress...</p>
            )}
          </div>
        </div>
      </div>

      {/* Pad Grid */}
      <FormItem label="Pad Controller (Click to toggle notes)">
        <PadGrid
          patternLength={patternLength}
          activePads={activePads}
          currentBeat={currentBeat}
          onPadClick={handlePadClick}
          stepsPerBar={stepsPerBar}
          manualPattern={manualPattern}
        />
        <div className="text-xs opacity-60 mt-2">
          <span className="inline-block w-3 h-3 bg-purple-600 rounded mr-1"></span>Purple pads = toggled notes
        </div>
      </FormItem>

      {/* Live Preview of Manual Pattern */}
      {livePreviewCode && (
        <FormItem label="Live Pattern Preview">
          <pre className="bg-background p-3 rounded-md text-sm overflow-x-auto border border-purple-500/50">
            {livePreviewCode}
          </pre>
          <div className="flex items-center gap-2 mt-2 mb-2">
            <input
              type="checkbox"
              id="playOnClick"
              checked={playOnClick}
              onChange={(e) => setPlayOnClick(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="playOnClick" className="text-sm cursor-pointer">
              Play sound when clicking pads
            </label>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const editor = context?.editorRef?.current;
                if (editor && editor.view) {
                  const currentCode = editor.view.state.doc.toString();
                  const newCode = currentCode ? `${currentCode}\n\n${livePreviewCode}` : livePreviewCode;
                  editor.setCode(newCode);
                }
              }}
              className="flex-1 px-4 py-2 rounded-md font-semibold bg-green-600 hover:bg-green-700 text-white"
            >
              Insert to Editor
            </button>
            <button
              onClick={() => setManualPattern(Array(patternLength).fill(null).map(() => new Set()))}
              className="px-4 py-2 rounded-md font-semibold bg-gray-600 hover:bg-gray-700 text-white"
            >
              Clear Pattern
            </button>
          </div>
        </FormItem>
      )}

      {/* Recording Controls */}
      <div className="flex gap-2">
        <button
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          disabled={midiDevices.length === 0}
          className={cx(
            'px-4 py-2 rounded-md font-semibold transition-colors flex-1',
            isRecording
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-cyan-600 hover:bg-cyan-700 text-white disabled:bg-gray-600 disabled:cursor-not-allowed',
          )}
        >
          {getRecordButtonLabel()}
        </button>

        {isRecording && (
          <button
            onClick={handleCancelRecording}
            className="px-4 py-2 rounded-md font-semibold bg-gray-600 hover:bg-gray-700 text-white"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Status */}
      <div className="text-sm opacity-75">
        <p>
          Status: <strong>{recordingState}</strong>
        </p>
        <p>
          Events recorded: <strong>{eventCount}</strong>
        </p>
      </div>

      {/* Generated Code */}
      {generatedCode && (
        <FormItem label="Generated Pattern">
          <div className="space-y-2">
            <pre className="bg-background p-3 rounded-md text-sm overflow-x-auto border border-foreground/20">
              {generatedCode}
            </pre>
            <button
              onClick={handleInsertToEditor}
              className="w-full px-4 py-2 rounded-md font-semibold bg-green-600 hover:bg-green-700 text-white"
            >
              Insert to Editor
            </button>
          </div>
        </FormItem>
      )}

      {/* Help Text */}
      <div className="text-xs opacity-60 space-y-1">
        <p><strong>Features:</strong></p>
        <p>• BPM auto-syncs with REPL tempo</p>
        <p>• Pads change layout based on pattern length (8/16/32 steps)</p>
        <p>• Green pads show current beat position when REPL is playing</p>
        <p>• Cyan pads show MIDI input triggers</p>
        <p className="pt-1"><strong>Quick Start:</strong></p>
        <p>1. Select MIDI device and set pattern length</p>
        <p>2. Click "Start Recording" (1-bar pre-roll countdown)</p>
        <p>3. Play your pattern on MIDI controller</p>
        <p>4. Click "Stop" to generate strudel code</p>
        <p>5. Click "Insert to Editor" to use it!</p>
        <p className="pt-1"><strong>MIDI CC for Sliders:</strong></p>
        <p>Use <code>midicc()</code> function in your code - see docs!</p>
      </div>
    </div>
  );
}
