# MIDI CC Control for Sliders - Usage Guide

## Overview
The `midicc()` function allows you to map physical knobs and faders on your MIDI controller directly to named sliders in your Strudel code. This works just like the existing `midin()` function but is specifically designed for slider control.

## Basic Usage

### Step 1: Create Named Sliders in Your Code

```javascript
// Define some sliders with variable names
cutoff = slider(1000, 100, 5000)
resonance = slider(0.5, 0, 1)
gain = slider(0.8, 0, 1)

// Use them in your pattern
s("bd sd").lpf(cutoff).resonance(resonance).gain(gain)
```

### Step 2: Map MIDI CC to Sliders

```javascript
// Connect your MS-20i and map CC controls to sliders
await midicc('MS-20i', {
  74: 'cutoff',      // CC 74 controls cutoff
  71: 'resonance',   // CC 71 controls resonance
  7: 'gain'          // CC 7 controls gain
})

// Set the min/max ranges for each slider (important for proper scaling!)
// This happens automatically if you evaluate the slider code first
```

### Step 3: Play!
Move the knobs on your MS-20i controller, and watch the sliders in your code move in real-time!

## Advanced Usage

### Dynamic Mapping

```javascript
// Create the MIDI CC controller first
const cc = await midicc('MS-20i')

// Then map CC numbers dynamically
cc.setMapping(74, 'cutoff', { min: 100, max: 5000 })
cc.setMapping(71, 'resonance', { min: 0, max: 1 })
cc.setMapping(7, 'gain', { min: 0, max: 1 })
```

### Finding Your CC Numbers

If you don't know which CC numbers your MS-20i knobs send:

1. Open browser console (F12)
2. Run this code to see all CC messages:

```javascript
const cc = await midicc('MS-20i')
// Now move a knob and watch console for warnings showing CC numbers
```

### Working with Multiple Controllers

```javascript
// Map different controllers to different sliders
await midicc('MS-20i', { 74: 'cutoff', 71: 'resonance' })
await midicc('nanoKONTROL', { 1: 'gain', 2: 'delay' })
```

### Removing Mappings

```javascript
const cc = await midicc('MS-20i')

// Remove a specific mapping
cc.removeMapping(74)

// Clear all mappings
cc.clearMappings()
```

## How It Works

1. **Named Sliders**: When you write `cutoff = slider(...)`, the transpiler automatically creates a "named slider" widget
2. **MIDI Input**: The `midicc()` function listens for Control Change messages from your MIDI device
3. **Value Scaling**: CC values (0-127) are automatically scaled to your slider's min/max range
4. **Real-time Update**: Both the code variable and the visual slider widget update instantly

## Comparison with `midin()`

### `midin()` - For pattern values
```javascript
let cc = await midin('MS-20i')
note("c e g").lpf(cc(74).range(100, 5000))  // Use CC as pattern value
```

### `midicc()` - For slider control
```javascript
await midicc('MS-20i', { 74: 'cutoff' })
cutoff = slider(1000, 100, 5000)             // Control the slider itself
s("bd sd").lpf(cutoff)
```

## Common MIDI CC Numbers (General MIDI)

- **1** - Modulation Wheel
- **7** - Volume
- **10** - Pan
- **11** - Expression
- **64** - Sustain Pedal
- **71** - Resonance (Filter)
- **74** - Brightness (Cutoff)
- **91** - Reverb
- **93** - Chorus

Your MS-20i may use different CC numbers - check the manual or use the console method above to discover them.

## Tips

1. **Evaluate slider code first**: Run your slider definitions before setting up `midicc()` so metadata is available
2. **Use descriptive names**: `cutoff`, `resonance`, `freq` are clearer than `x`, `y`, `z`
3. **Check the console**: Warnings will tell you if CC numbers aren't mapped or sliders aren't found
4. **Mappings don't persist**: Reload the page and you'll need to set them up again (by design)

## Troubleshooting

**Sliders not moving?**
- Make sure you've evaluated the slider code first
- Check browser console for warnings
- Verify CC numbers are correct for your controller

**Wrong range?**
- The slider min/max values from your code are used automatically
- If scaling feels off, double-check your `slider(default, min, max)` values

**Device not found?**
- Check the device name exactly matches (case-sensitive)
- Try using device index: `midicc(0)` for first device
- List devices: `WebMidi.inputs.map(i => i.name)`
