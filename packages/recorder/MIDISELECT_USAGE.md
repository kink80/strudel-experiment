# MIDI Select - Discrete Option Control via MIDI

## Overview
The `midiselect()` function allows you to control discrete options (like sound names, scales, effects) using MIDI CC knobs with fixed positions (like rotary switches on the MS-20).

## Basic Usage

### Step 1: Define Selector in Code
```javascript
sound = select("sawtooth", ["sawtooth", "sine", "square", "triangle"])

s("bd sd").sound(sound)
```

### Step 2: Map MIDI CC to Selector
```javascript
await midiselect('MS-20 Controller', {
  16: { selector: 'sound', options: ["sawtooth", "sine", "square", "triangle"] }
})
```

That's it! Now turning your MS-20 knob will switch between the sounds.

## How It Works

**CC Value Mapping:**
- The CC range (0-127) is automatically divided by the number of options
- For 4 options: 0-31=option1, 32-63=option2, 64-95=option3, 96-127=option4
- Perfect for rotary switches with fixed positions!

**Visual Feedback:**
- A dropdown appears inline showing current selection
- Updates as you turn the MIDI knob
- Can also click dropdown to change manually

## Complete Example

```javascript
// Step 1: Define selectors
sound = select("sawtooth", ["sawtooth", "sine", "square", "triangle"])
scale = select("minor", ["major", "minor", "dorian", "phrygian"])
effect = select("none", ["none", "reverb", "delay"])

// Step 2: Map MS-20 knobs
await midiselect('MS-20 Controller', {
  16: { selector: 'sound', options: ["sawtooth", "sine", "square", "triangle"] },
  17: { selector: 'scale', options: ["major", "minor", "dorian", "phrygian"] },
  18: { selector: 'effect', options: ["none", "reverb", "delay"] }
})

// Step 3: Use in pattern
$: note("c3 e3 g3")
   .scale(scale)
   .s(sound)
   .room(effect === "reverb" ? 0.9 : 0)
   .delay(effect === "delay" ? 0.5 : 0)
```

## Combining with midicc()

You can use both `midicc()` for continuous controls and `midiselect()` for discrete switches:

```javascript
// Continuous controls
cutoff = slider(1000, 100, 5000)
resonance = slider(0.5, 0, 1)

await midicc('MS-20 Controller', {
  74: { slider: 'cutoff', inputMin: 0, inputMax: 7 },
  71: { slider: 'resonance', inputMin: 0, inputMax: 7 }
})

// Discrete switches
sound = select("sawtooth", ["sawtooth", "sine", "square"])

await midiselect('MS-20 Controller', {
  16: { selector: 'sound', options: ["sawtooth", "sine", "square"] }
})

// Use both
s("bd sd").sound(sound).lpf(cutoff).resonance(resonance)
```

## Tips

1. **Options must match exactly**: Make sure the options array in `midiselect()` matches the one in your `select()` definition
2. **Evaluate selector code first**: Just like with sliders, define the selector before mapping MIDI
3. **Use meaningful names**: `sound`, `scale`, `mode` are clearer than `s1`, `s2`, `s3`
4. **Perfect for 2-4 positions**: Works best with rotary switches that have 2-4 fixed positions

## Troubleshooting

**Selector not switching?**
- Make sure you evaluated the `select()` code first
- Check console for warnings
- Verify CC number is correct for your MS-20 knob

**Wrong options selected?**
- Your MS-20 might send different CC value ranges
- Try moving the knob to each position and check console
- Adjust if needed (though auto-division usually works well)

## Advanced: Dynamic Mapping

```javascript
const sel = await midiselect('MS-20 Controller')

// Set mapping dynamically
sel.setMapping(16, 'sound', ["sawtooth", "sine", "square"])

// Check what's mapped
console.log(sel.getMappings())
```
