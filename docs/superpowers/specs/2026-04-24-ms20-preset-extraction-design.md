# MS-20 Factory Preset Extraction & Modulation Matrix

## Summary

Extract all ~250 Korg MS-20 factory presets from `.fxp` files and import them into Strudel as playable patches, backed by an enhanced MS-20 AudioWorklet that faithfully models the patch bay modulation routing.

## Context

- 161 presets across 4 banks: Factory 1 (64), Factory 2 (96), Korg USA (64), Devine (32)
- 78% of presets use patch cables (up to 8 per preset) — the patch bay is essential
- Each `.fxp` contains a `prog` chunk: 16-byte header, 32-byte name, 84 floats (knob values), then cable data
- Cable format: 15 slots of 4 bytes each — `[dst_jack, src_jack, slot_index, 0x00]`, `0xFF 0xFF` = empty
- 35 jack IDs (0-34) in a flat namespace covering all patch points

## Architecture

Three components:

### 1. FXP Parser (Python, one-time extraction tool)

`tools/ms20-extract-presets.py` — reads all `.fxp` files, outputs a single JS module.

**Parameter mapping** (Korg normalized 0-1 → worklet values):

| Idx | Korg Param | Worklet Param | Mapping |
|-----|-----------|---------------|---------|
| 0 | VCO1 Scale | — | 0/0.333/0.667/1 → 32'/16'/8'/4' (octave selector, baked into frequency) |
| 1 | VCO1 Waveform | vco1wave | Continuous 0-1 → nearest: 0=tri, 0.33=saw, 0.67=square, 1=PWM |
| 2 | VCO2 Scale | — | Same as VCO1 Scale |
| 3 | VCO2 Tune | vco2tune | 0-1 → -12 to +12 semitones (0.5 = center) |
| 4 | VCO2 Waveform | vco2wave | Same as VCO1 |
| 5 | Portamento | portamento | 0-1 → 0-5 seconds exponential |
| 6 | VCO1 Level | vco1level | 0/0.333/0.667/1 → 0/0.33/0.67/1.0 |
| 7 | VCO2 Level | vco2level | 0-1 direct |
| 8 | Noise Level | noiselevel | 0-1 direct |
| 9-15 | ExtMod1 routing | modmatrix entries | Amounts for VCO1PW, VCO2Pitch, HPFCut, LPFCut, Amp, FM |
| 16 | HPF Cutoff | hpfcutoff | 0-1 → 20-20000 Hz exponential |
| 17 | HPF Peak | hpfpeak | 0-1 direct |
| 18 | LPF Cutoff | lpfcutoff | 0-1 → 20-20000 Hz exponential |
| 19 | LPF Peak | lpfpeak | 0-1 direct |
| 20 | LPF EG2/Ext | lpfenv | 0-1 → -8 to +8 octaves (0.5 = 0) |
| 21 | HPF EG2/Ext | hpfenv | 0-1 → -8 to +8 octaves (0.5 = 0) |
| 22 | HPF MG/T.Ext | hpfmg | 0-1 → MG depth to HPF |
| 23 | LPF MG/T.Ext | lpfmg | 0-1 → MG depth to LPF |
| 24 | Pitch EG1/Ext | pitcheg | 0-1 → pitch envelope depth |
| 25 | Pitch MG/T.Ext | pitchmg | 0-1 → MG depth to pitch |
| 26 | VCO1 Pulse Width | vco1pw | 0-1 → 0.01-0.99 |
| 27 | EG1 Delay/Attack | eg1attack | 0-1 → 0.001-10s exponential |
| 28 | EG1 Release | eg1release | 0-1 → 0.001-10s exponential |
| 29 | EG2 Attack | eg2attack | 0-1 → 0.001-10s exponential |
| 30 | EG2 Decay | eg2decay | 0-1 → 0.001-10s exponential |
| 31 | EG2 Hold | eg2hold | 0-1 → 0-20s |
| 32 | EG2 Sustain | eg2sustain | 0-1 direct (inverted: 1=max, 0=min) |
| 33 | EG2 Release | eg2release | 0-1 → 0.001-10s exponential |
| 34 | EG2 REV | — | 0 or 1, polarity inversion flag |
| 35 | EG1 REV | — | 0 or 1, polarity inversion flag |
| 39 | MG Frequency | mgfreq | 0-1 → 0-50 Hz exponential |
| 40 | MG Waveform | mgwave | 0=saw, 0.33=square, 0.67=tri, 1=sine |
| 42 | VCA Mode | — | Gate vs EG1 control |
| 44 | Fine Tune | — | Baked into frequency offset |
| 47 | Poly Mode | — | Mono/poly flag |
| 50 | Unison Detune | — | Detune amount for unison voices |
| 51 | EG1 REV flag | eg1rev | Boolean |

**Cable mapping** (raw → modMatrix entries):

Each cable `[dst_jack, src_jack, slot, 0]` maps to `{src: <jack_id>, dst: <jack_id>}`.

### 2. Enhanced MS-20 AudioWorklet (JS)

Extend `MS20Processor` in `worklets.mjs` with:

**New signal generators:**
- `SampleAndHold` — latches input on clock edge, outputs held value
- `RingModulator` — VCO1 * VCO2 output
- `EnvelopeFollower` — tracks amplitude of input signal (for ESP)
- `ClockGenerator` — simple trigger/clock output

**New AudioParams for hardwired modulation depths:**
- `hpfmg`, `lpfmg` — MG-to-filter amounts
- `pitcheg`, `pitchmg` — pitch modulation amounts
- `eg1rev`, `eg2rev` — envelope polarity inversion flags

**Modulation matrix** (received via `port.postMessage`):
```javascript
// Array of cable connections
modMatrix = [
  { src: 4, dst: 22 },  // EG1 OUT → LPF CUTOFF IN
  { src: 14, dst: 18 }, // MG OUT → VCO 1+2 CV IN
  // ... up to 15 cables
]
```

**Per-sample processing flow:**

```
1. Compute all source signals:
   sources[0..16] = [kbd_cv, vca_out, env_follow, pink_noise, 
                     eg1, eg1_rev, eg2_rev, clock, white_noise, 
                     trig, sh_out, ringmod, hpf_out, lpf_out,
                     mg, vco1_out, vco2_out]

2. Zero all mod destinations:
   dests[17..34] = 0

3. Apply modulation matrix (sum cables):
   for each {src, dst} in modMatrix:
     dests[dst] += sources[src]

4. Process signal chain using modulated values:
   vco1_freq = base_freq + dests[VCO_CV_IN] + dests[VCO_FREQ_MOD_IN]
   vco2_freq = vco1_freq + dests[VCO2_CV_IN] + vco2tune
   vco1_out = oscillator(vco1_freq, vco1wave, vco1pw + dests[VCO1_PW_IN])
   vco2_out = oscillator(vco2_freq, vco2wave)
   ring_out = vco1_out * (vco2_out + dests[RING_MOD_IN])
   mix = vco1*lvl + vco2*lvl + noise*lvl + ring_out + dests[TOTAL_IN]
   hpf_out = hpf(mix, hpf_cutoff + dests[HPF_CUTOFF_IN])
   lpf_out = lpf(hpf_out, lpf_cutoff + dests[LPF_CUTOFF_IN])
   vca_out = lpf_out * (eg1 * vca_mode + dests[VCA_CONTROL_IN]) 
             * (initial_gain + dests[VCA_INIT_GAIN_IN])
   output = vca_out
```

**Jack ID constants (shared between parser and worklet):**
```javascript
const JACK = {
  // Sources (0-16)
  KBD_CV: 0, VCA_OUT: 1, ENV_FOLLOW: 2, PINK_NOISE: 3,
  EG1: 4, EG1_REV: 5, EG2_REV: 6, CLOCK: 7,
  WHITE_NOISE: 8, TRIG: 9, SH_OUT: 10, RING_MOD: 11,
  HPF_OUT: 12, LPF_OUT: 13, MG_OUT: 14, VCO1_OUT: 15, VCO2_OUT: 16,
  // Destinations (17-34)  
  TOTAL_IN: 17, VCO_CV_IN: 18, VCO2_CV_IN: 19,
  VCO_FREQ_MOD_IN: 20, HPF_CUTOFF_IN: 21, LPF_CUTOFF_IN: 22,
  VCA_INIT_GAIN_IN: 23, VCA_CONTROL_IN: 24, EG1_TRIG_IN: 25,
  EG12_TRIG_IN: 26, VCO_FREQ_IN: 27, SH_CLOCK_IN: 28,
  SH_SIGNAL_IN: 29, ESP_IN: 30, MOD_VCA_IN: 31,
  VCO1_PW_IN: 32, RING_MOD_IN: 33, EXT_TRIG_IN: 34,
};
```

### 3. Generated Preset Library (JS output)

`packages/superdough/ms20-factory-presets.mjs`

Auto-generated by the Python extractor. Contains all presets as named Strudel pattern functions:

```javascript
export const ms20_acid_bass = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.33)
  .lpfcutoff(1200).lpfpeak(0.78).lpfenv(0)
  .hpfcutoff(400).hpfpeak(0.6)
  .drive(1.5)
  .eg1attack(0.005).eg1release(0.18)
  .eg2attack(0.001).eg2decay(0.15).eg2sustain(1.0).eg2release(0.05)
  .eg1rev(1)
  .modmatrix([{src:0, dst:27}])  // KBD CV → VCO FREQ IN
  .gain(0.6);
```

**Naming convention:** Bank/preset name → snake_case slug with `ms20_` prefix:
- "Acid Bass" → `ms20_acid_bass`
- "Ring Mod Bell" → `ms20_ring_mod_bell`
- "80 States" → `ms20_80_states`

**Bank-level grouping:**
```javascript
export const ms20_factory1 = { ms20_acid_bass, ms20_pwm_lead, ... };
export const ms20_factory2 = { ms20_sub_bass, ms20_edm_lead, ... };
export const ms20_korg_usa = { ms20_razor_bass, ms20_classic_synth, ... };
export const ms20_devine = { ms20_mean_bass_grit, ms20_ob_bass, ... };
export const ms20_all = { ...ms20_factory1, ...ms20_factory2, ...ms20_korg_usa, ...ms20_devine };
```

### Usage in Tunes

```javascript
// Direct preset use
note("c2 eb2 g2 c3").apply(ms20_acid_bass)

// Customize a factory preset
note("c4 eb4 g4").apply(ms20_ring_mod_bell).lpfcutoff(2000).drive(4)

// Layer factory presets
stack(
  note("c2 ~ eb2 ~").apply(ms20_sub_bass),
  note("c4 eb4 g4 c5").apply(ms20_edm_lead).delay(0.25)
)

// Browse by bank
note("c2").apply(ms20_factory1.ms20_acid_bass)
```

## Implementation Order

1. Extend worklet with modulation matrix, S&H, ring mod, envelope follower, clock
2. Add new AudioParams (hpfmg, lpfmg, pitcheg, pitchmg, eg1rev, eg2rev, modmatrix)
3. Register `modmatrix` control in Strudel core
4. Build Python FXP parser with parameter + cable mapping
5. Run parser to generate `ms20-factory-presets.mjs`
6. Update `ms20-patches.mjs` examples to reference factory presets
7. Test with known presets (Acid Bass, Ring Mod Bell, PWM Lead, Sub Bass)

## Testing

- Compare worklet output against the Korg VST playing the same preset at the same note
- Verify cable routing makes musical sense for named presets
- Check that presets without cables still produce correct sound
- Performance: 8 cables + full signal chain must stay under 1ms per 128-sample block
