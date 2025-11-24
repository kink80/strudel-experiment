# MIDI CC Quick Start Guide

## Simple 2-Step Process

### Step 1: Define your sliders and evaluate
```javascript
cutoff = slider(1000, 100, 5000)
resonance = slider(0.5, 0, 1)

s("bd sd").lpf(cutoff).resonance(resonance)
```

Press **Ctrl+Enter** to evaluate this code.

### Step 2: Map your MS-20i knobs (in a new evaluation)
```javascript
await midicc('MS-20i', {
  74: 'cutoff',
  71: 'resonance'
})
```

Press **Ctrl+Enter** again. Now move your MS-20i knobs and the sliders will respond!

### Step 2b: If your knobs don't cover the full range
Some MIDI controllers send limited CC ranges (e.g., 0-10 instead of 0-127). Map the input range:

```javascript
await midicc('MS-20i', {
  74: { slider: 'cutoff', inputMin: 0, inputMax: 10 },
  71: { slider: 'resonance', inputMin: 0, inputMax: 7 }
})
```

This tells Strudel that your knob only sends values from 0-10, and it will scale that to the full slider range (600-8000).

## How to Find Your CC Numbers and Ranges

Don't know which CC numbers your MS-20i uses? Use this helper:

```javascript
// Listen to all CC messages from your controller
const device = WebMidi.inputs.find(d => d.name.includes('MS-20i'))
device.addListener('controlchange', (e) => {
  console.log(`CC ${e.controller.number} = ${e.value}`)
})
```

Now move each knob fully from minimum to maximum and watch the console:
- If you see `CC 74 = 0` to `CC 74 = 127`, your knob uses the full range (default)
- If you see `CC 74 = 0` to `CC 74 = 10`, your knob only sends 0-10 (use `inputMin: 0, inputMax: 10`)

This tells you both the CC number and the actual range your controller sends!

## Complete Example

```javascript
// Evaluation 1: Define sliders
freq = slider(440, 220, 880)
cutoff = slider(2000, 200, 5000)
res = slider(0.3, 0, 1)

note("c3 e3 g3").freq(freq).lpf(cutoff).resonance(res).s("sawtooth")
```

```javascript
// Evaluation 2: Map MS-20i (use your actual CC numbers)
await midicc('MS-20i', {
  16: 'freq',     // MS-20i VCO frequency knob
  74: 'cutoff',   // MS-20i filter cutoff
  71: 'res'       // MS-20i resonance
})
```

Now play with your MS-20i knobs in real-time!

## Tips

1. **Always evaluate slider code FIRST** - This registers the min/max values
2. **Evaluate midicc() SECOND** - This creates the mapping
3. **Check console for errors** - Helpful warnings will guide you
4. **List devices**: `WebMidi.inputs.map(i => i.name)` shows all connected MIDI devices
