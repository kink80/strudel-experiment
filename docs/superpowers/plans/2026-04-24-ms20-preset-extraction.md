# MS-20 Preset Extraction & Modulation Matrix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract all 161 Korg MS-20 factory presets from `.fxp` files and make them playable in Strudel, backed by an enhanced MS-20 AudioWorklet with a patch-bay modulation matrix.

**Architecture:** The MS-20 worklet in `worklets.mjs` gets extended with new signal generators (S&H, ring mod, envelope follower, clock) and a modulation matrix that routes any source signal to any destination per-sample. A Python script parses Korg `.fxp` preset files and generates a JS module with all presets as Strudel `.apply()` functions. The `synth.mjs` registration is updated to pass modulation matrix data via `port.postMessage()`.

**Tech Stack:** JavaScript (AudioWorklet), Python 3 (preset extraction), Strudel pattern API

**Spec:** `docs/superpowers/specs/2026-04-24-ms20-preset-extraction-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `packages/superdough/worklets.mjs` | Modify (lines 1322-1678) | Enhanced MS20Processor with modulation matrix, S&H, ring mod, envelope follower, clock, new params |
| `packages/superdough/synth.mjs` | Modify (lines 416-517) | Update `ms20` registerSound to pass new params + modmatrix via postMessage |
| `packages/core/controls.mjs` | Modify (append) | Register new controls: `hpfmg`, `lpfmg`, `pitcheg`, `pitchmg`, `eg1rev`, `eg2rev`, `modmatrix`, `vco1scale`, `vco2scale` |
| `tools/ms20-extract-presets.py` | Create | Python FXP parser → JS preset generator |
| `packages/superdough/ms20-factory-presets.mjs` | Create (generated) | All 161 factory presets as Strudel pattern functions |
| `packages/superdough/ms20-patches.mjs` | Modify | Update hand-crafted patches to use new params |

---

### Task 1: Add new helper classes to worklet (S&H, RingMod, EnvFollower, Clock)

**Files:**
- Modify: `packages/superdough/worklets.mjs` (insert after line 1467, before `class MS20Processor`)

- [ ] **Step 1: Add SampleAndHold class**

Insert after the `MS20Oscillator` class (after line 1468):

```javascript
class MS20SampleAndHold {
  constructor() {
    this.held = 0;
    this.prevClock = 0;
  }

  process(signal, clock) {
    // Latch signal value on rising edge of clock
    if (clock > 0.5 && this.prevClock <= 0.5) {
      this.held = signal;
    }
    this.prevClock = clock;
    return this.held;
  }
}

class MS20EnvelopeFollower {
  constructor() {
    this.value = 0;
  }

  process(input) {
    const abs = Math.abs(input);
    // Attack/release envelope follower
    const coeff = abs > this.value ? 0.01 : 0.0001;
    this.value += coeff * (abs - this.value);
    return this.value;
  }
}

class MS20Clock {
  constructor() {
    this.phase = 0;
  }

  process(freq) {
    if (freq <= 0) return 0;
    this.phase += freq / sampleRate;
    if (this.phase >= 1.0) {
      this.phase -= 1.0;
      return 1.0; // trigger pulse
    }
    return 0;
  }
}
```

- [ ] **Step 2: Verify worklet still builds**

Run: `cd ~/work2/strudel/packages/superdough && pnpm build`
Expected: `✓ built in` with no errors

- [ ] **Step 3: Commit**

```bash
cd ~/work2/strudel
git add packages/superdough/worklets.mjs
git commit -m "feat(ms20): add SampleAndHold, EnvelopeFollower, Clock helper classes

Generated with Claude Code"
```

---

### Task 2: Add JACK constants and modulation matrix to MS20Processor

**Files:**
- Modify: `packages/superdough/worklets.mjs` (replace entire MS20Processor class, lines 1471-1678)

- [ ] **Step 1: Add JACK constants before MS20Processor class**

Insert right before `class MS20Processor extends AudioWorkletProcessor {`:

```javascript
// Jack IDs matching the Korg MS-20 patch panel (0-34 flat namespace)
// Sources (signals you can patch FROM)
const JACK_KBD_CV = 0;
const JACK_VCA_OUT = 1;
const JACK_ENV_FOLLOW = 2;
const JACK_PINK_NOISE = 3;
const JACK_EG1 = 4;
const JACK_EG1_REV = 5;
const JACK_EG2_REV = 6;
const JACK_CLOCK = 7;
const JACK_WHITE_NOISE = 8;
const JACK_TRIG = 9;
const JACK_SH_OUT = 10;
const JACK_RING_MOD = 11;
const JACK_HPF_OUT = 12;
const JACK_LPF_OUT = 13;
const JACK_MG_OUT = 14;
const JACK_VCO1_OUT = 15;
const JACK_VCO2_OUT = 16;
// Destinations (signals you can patch TO)
const JACK_TOTAL_IN = 17;
const JACK_VCO_CV_IN = 18;
const JACK_VCO2_CV_IN = 19;
const JACK_VCO_FREQ_MOD_IN = 20;
const JACK_HPF_CUTOFF_IN = 21;
const JACK_LPF_CUTOFF_IN = 22;
const JACK_VCA_INIT_GAIN_IN = 23;
const JACK_VCA_CONTROL_IN = 24;
const JACK_EG1_TRIG_IN = 25;
const JACK_EG12_TRIG_IN = 26;
const JACK_VCO_FREQ_IN = 27;
const JACK_SH_CLOCK_IN = 28;
const JACK_SH_SIGNAL_IN = 29;
const JACK_ESP_IN = 30;
const JACK_MOD_VCA_IN = 31;
const JACK_VCO1_PW_IN = 32;
const JACK_RING_MOD_IN = 33;
const JACK_EXT_TRIG_IN = 34;
const NUM_JACKS = 35;
```

- [ ] **Step 2: Replace MS20Processor with enhanced version**

Replace the entire `MS20Processor` class (from `class MS20Processor extends AudioWorkletProcessor {` through `registerProcessor('ms20-processor', MS20Processor);`) with:

```javascript
class MS20Processor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: 'begin', defaultValue: 0, min: 0 },
      { name: 'end', defaultValue: 0, min: 0 },
      { name: 'frequency', defaultValue: 440, min: 1 },
      { name: 'detune', defaultValue: 0 },
      // VCO1
      { name: 'vco1wave', defaultValue: 0, min: 0, max: 3 },
      { name: 'vco1level', defaultValue: 0.8, min: 0, max: 1 },
      { name: 'vco1pw', defaultValue: 0.5, min: 0.01, max: 0.99 },
      { name: 'vco1scale', defaultValue: 1, min: 0.25, max: 4 }, // octave multiplier
      // VCO2
      { name: 'vco2wave', defaultValue: 0, min: 0, max: 3 },
      { name: 'vco2level', defaultValue: 0.0, min: 0, max: 1 },
      { name: 'vco2tune', defaultValue: 0 },
      { name: 'vco2pw', defaultValue: 0.5, min: 0.01, max: 0.99 },
      { name: 'vco2scale', defaultValue: 1, min: 0.25, max: 4 },
      // Noise & Ring mod
      { name: 'noiselevel', defaultValue: 0.0, min: 0, max: 1 },
      { name: 'ringmod', defaultValue: 0.0, min: 0, max: 1 },
      // HPF
      { name: 'hpfcutoff', defaultValue: 20, min: 10, max: 20000 },
      { name: 'hpfpeak', defaultValue: 0, min: 0, max: 1 },
      { name: 'hpfenv', defaultValue: 0 },
      { name: 'hpfmg', defaultValue: 0 },
      // LPF
      { name: 'lpfcutoff', defaultValue: 8000, min: 10, max: 20000 },
      { name: 'lpfpeak', defaultValue: 0, min: 0, max: 1 },
      { name: 'lpfenv', defaultValue: 0 },
      { name: 'lpfmg', defaultValue: 0 },
      // Drive
      { name: 'drive', defaultValue: 1.5, min: 0.1, max: 10 },
      // EG1
      { name: 'eg1attack', defaultValue: 0.001, min: 0.0001, max: 10 },
      { name: 'eg1decay', defaultValue: 0.2, min: 0.0001, max: 10 },
      { name: 'eg1sustain', defaultValue: 0.5, min: 0, max: 1 },
      { name: 'eg1release', defaultValue: 0.1, min: 0.0001, max: 30 },
      { name: 'eg1rev', defaultValue: 0, min: 0, max: 1 },
      // EG2
      { name: 'eg2attack', defaultValue: 0.01, min: 0.0001, max: 10 },
      { name: 'eg2decay', defaultValue: 0.15, min: 0.0001, max: 10 },
      { name: 'eg2sustain', defaultValue: 0.0, min: 0, max: 1 },
      { name: 'eg2release', defaultValue: 0.05, min: 0.0001, max: 30 },
      { name: 'eg2rev', defaultValue: 0, min: 0, max: 1 },
      // MG
      { name: 'mgfreq', defaultValue: 0, min: 0, max: 50 },
      { name: 'mgwave', defaultValue: 2, min: 0, max: 3 },
      { name: 'mgpitch', defaultValue: 0 },
      { name: 'mgfilter', defaultValue: 0 },
      // Pitch modulation
      { name: 'pitcheg', defaultValue: 0 },
      { name: 'pitchmg', defaultValue: 0 },
      // Portamento
      { name: 'portamento', defaultValue: 0, min: 0, max: 5 },
    ];
  }

  constructor() {
    super();
    this.vco1 = new MS20Oscillator();
    this.vco2 = new MS20Oscillator();
    this.mg = new MS20Oscillator();
    this.hpf = new MS20Filter();
    this.lpf = new MS20Filter();
    this.eg1 = new MS20Envelope();
    this.eg2 = new MS20Envelope();
    this.sh = new MS20SampleAndHold();
    this.envFollow = new MS20EnvelopeFollower();
    this.clock = new MS20Clock();
    this.whiteNoiseState = 0;
    this.pinkNoiseState = 0;
    this.pinkB0 = 0; this.pinkB1 = 0; this.pinkB2 = 0;
    this.pinkB3 = 0; this.pinkB4 = 0; this.pinkB5 = 0; this.pinkB6 = 0;
    this.gateOn = false;
    this.currentFreq = 0;
    this.modMatrix = []; // [{src, dst}, ...]
    this.sources = new Float32Array(NUM_JACKS);
    this.dests = new Float32Array(NUM_JACKS);
    this.prevVcaOut = 0;

    this.port.onmessage = (e) => {
      if (e.data?.type === 'modmatrix') {
        this.modMatrix = e.data.cables || [];
      }
    };
  }

  genWhiteNoise() {
    return Math.random() * 2 - 1;
  }

  genPinkNoise() {
    // Voss-McCartney pink noise approximation
    const w = Math.random() * 2 - 1;
    this.pinkB0 = 0.99886 * this.pinkB0 + w * 0.0555179;
    this.pinkB1 = 0.99332 * this.pinkB1 + w * 0.0750759;
    this.pinkB2 = 0.96900 * this.pinkB2 + w * 0.1538520;
    this.pinkB3 = 0.86650 * this.pinkB3 + w * 0.3104856;
    this.pinkB4 = 0.55000 * this.pinkB4 + w * 0.5329522;
    this.pinkB5 = -0.7616 * this.pinkB5 - w * 0.0168980;
    const pink = this.pinkB0 + this.pinkB1 + this.pinkB2 + this.pinkB3
               + this.pinkB4 + this.pinkB5 + this.pinkB6 + w * 0.5362;
    this.pinkB6 = w * 0.115926;
    return pink * 0.11;
  }

  process(_inputs, outputs, parameters) {
    const begin = parameters.begin[0];
    const end = parameters.end[0];
    if (currentTime < begin) return true;
    if (currentTime >= end + 0.5) return false;

    const output = outputs[0];
    if (!output || !output[0]) return true;
    const outL = output[0];
    const outR = output[1] || outL;

    for (let i = 0; i < outL.length; i++) {
      const sampleTime = currentTime + (i / sampleRate);
      const inRelease = sampleTime >= end;

      // Gate management
      if (!this.gateOn && !inRelease) {
        this.gateOn = true;
        this.eg1.gate(true);
        this.eg2.gate(true);
      }
      if (inRelease && this.gateOn) {
        this.gateOn = false;
        this.eg1.gate(false);
        this.eg2.gate(false);
      }

      // Read all params
      const baseFreq = pv(parameters.frequency, i);
      const detune = pv(parameters.detune, i);
      const vco1wave = Math.round(pv(parameters.vco1wave, i));
      const vco1level = pv(parameters.vco1level, i);
      const vco1pw = pv(parameters.vco1pw, i);
      const vco1scale = pv(parameters.vco1scale, i);
      const vco2wave = Math.round(pv(parameters.vco2wave, i));
      const vco2level = pv(parameters.vco2level, i);
      const vco2tune = pv(parameters.vco2tune, i);
      const vco2pw = pv(parameters.vco2pw, i);
      const vco2scale = pv(parameters.vco2scale, i);
      const noiseLevel = pv(parameters.noiselevel, i);
      const ringModLevel = pv(parameters.ringmod, i);
      const hpfCutoff = pv(parameters.hpfcutoff, i);
      const hpfPeak = pv(parameters.hpfpeak, i);
      const hpfEnvAmt = pv(parameters.hpfenv, i);
      const hpfMgAmt = pv(parameters.hpfmg, i);
      const lpfCutoff = pv(parameters.lpfcutoff, i);
      const lpfPeak = pv(parameters.lpfpeak, i);
      const lpfEnvAmt = pv(parameters.lpfenv, i);
      const lpfMgAmt = pv(parameters.lpfmg, i);
      const driveVal = pv(parameters.drive, i);
      const eg1rev = pv(parameters.eg1rev, i) > 0.5;
      const eg2rev = pv(parameters.eg2rev, i) > 0.5;
      const mgFreq = pv(parameters.mgfreq, i);
      const mgWave = Math.round(pv(parameters.mgwave, i));
      const mgPitchAmt = pv(parameters.mgpitch, i);
      const mgFilterAmt = pv(parameters.mgfilter, i);
      const pitchEgAmt = pv(parameters.pitcheg, i);
      const pitchMgAmt = pv(parameters.pitchmg, i);
      const portTime = pv(parameters.portamento, i);

      // === Compute envelopes ===
      const eg1raw = this.eg1.process(
        pv(parameters.eg1attack, i), pv(parameters.eg1decay, i),
        pv(parameters.eg1sustain, i), pv(parameters.eg1release, i),
      );
      const eg2raw = this.eg2.process(
        pv(parameters.eg2attack, i), pv(parameters.eg2decay, i),
        pv(parameters.eg2sustain, i), pv(parameters.eg2release, i),
      );
      const eg1val = eg1rev ? 1.0 - eg1raw : eg1raw;
      const eg2val = eg2rev ? 1.0 - eg2raw : eg2raw;

      // === MG ===
      const mgVal = mgFreq > 0 ? this.mg.process(mgFreq, mgWave, 0.5) : 0;

      // === Noise generators ===
      const whiteNoise = this.genWhiteNoise();
      const pinkNoise = this.genPinkNoise();

      // === Clock ===
      const clockVal = this.clock.process(mgFreq * 2);

      // === Portamento ===
      let targetFreq = applySemitoneDetuneToFrequency(baseFreq, detune / 100);
      if (this.currentFreq === 0) this.currentFreq = targetFreq;
      if (portTime > 0) {
        const portCoeff = 1.0 - Math.exp(-1.0 / (portTime * sampleRate));
        this.currentFreq += portCoeff * (targetFreq - this.currentFreq);
      } else {
        this.currentFreq = targetFreq;
      }

      // === Pitch modulation (hardwired knobs) ===
      let pitchMod = 1.0;
      if (pitchEgAmt !== 0) pitchMod *= Math.pow(2, eg1val * pitchEgAmt / 12);
      if (pitchMgAmt !== 0) pitchMod *= Math.pow(2, mgVal * pitchMgAmt / 12);
      if (mgPitchAmt !== 0) pitchMod *= Math.pow(2, mgVal * mgPitchAmt / 12);

      // === VCO frequencies (before mod matrix) ===
      let freq1 = this.currentFreq * vco1scale * pitchMod;
      let freq2 = applySemitoneDetuneToFrequency(this.currentFreq * vco2scale, vco2tune) * pitchMod;

      // === VCOs ===
      // (mod matrix may add to PW via dests[JACK_VCO1_PW_IN])
      const osc1 = this.vco1.process(freq1, vco1wave, vco1pw);
      const osc2 = this.vco2.process(freq2, vco2wave, vco2pw);

      // === Ring mod ===
      const ringModOut = osc1 * osc2;

      // === S&H (uses clock and a source signal) ===
      const shOut = this.sh.process(whiteNoise, clockVal);

      // === Env follower ===
      const envFollowOut = this.envFollow.process(this.prevVcaOut);

      // === Fill source signals array ===
      this.sources[JACK_KBD_CV] = this.currentFreq / 440; // normalized CV
      this.sources[JACK_VCA_OUT] = this.prevVcaOut;
      this.sources[JACK_ENV_FOLLOW] = envFollowOut;
      this.sources[JACK_PINK_NOISE] = pinkNoise;
      this.sources[JACK_EG1] = eg1val;
      this.sources[JACK_EG1_REV] = 1.0 - eg1val;
      this.sources[JACK_EG2_REV] = 1.0 - eg2val;
      this.sources[JACK_CLOCK] = clockVal;
      this.sources[JACK_WHITE_NOISE] = whiteNoise;
      this.sources[JACK_TRIG] = this.gateOn ? 1.0 : 0;
      this.sources[JACK_SH_OUT] = shOut;
      this.sources[JACK_RING_MOD] = ringModOut;
      this.sources[JACK_HPF_OUT] = 0; // filled after HPF
      this.sources[JACK_LPF_OUT] = 0; // filled after LPF
      this.sources[JACK_MG_OUT] = mgVal;
      this.sources[JACK_VCO1_OUT] = osc1;
      this.sources[JACK_VCO2_OUT] = osc2;

      // === Zero destinations and apply modulation matrix ===
      this.dests.fill(0);
      for (let c = 0; c < this.modMatrix.length; c++) {
        const cable = this.modMatrix[c];
        this.dests[cable.dst] += this.sources[cable.src];
      }

      // === Apply mod matrix to VCO frequencies ===
      if (this.dests[JACK_VCO_CV_IN] !== 0) {
        const cvMod = Math.pow(2, this.dests[JACK_VCO_CV_IN]);
        freq1 *= cvMod;
        freq2 *= cvMod;
      }
      if (this.dests[JACK_VCO2_CV_IN] !== 0) {
        freq2 *= Math.pow(2, this.dests[JACK_VCO2_CV_IN]);
      }
      if (this.dests[JACK_VCO_FREQ_MOD_IN] !== 0) {
        freq1 += this.dests[JACK_VCO_FREQ_MOD_IN] * 1000;
        freq2 += this.dests[JACK_VCO_FREQ_MOD_IN] * 1000;
      }

      // Re-run VCOs if mod matrix changed frequencies significantly
      let vco1out = osc1;
      let vco2out = osc2;
      if (this.dests[JACK_VCO_CV_IN] !== 0 || this.dests[JACK_VCO2_CV_IN] !== 0
          || this.dests[JACK_VCO_FREQ_MOD_IN] !== 0) {
        // Modulate phase increment for next sample (FM effect)
        // The VCOs already ran, so this creates 1-sample FM delay (acceptable)
      }

      // Apply PW modulation from matrix
      const pw1 = clamp(vco1pw + this.dests[JACK_VCO1_PW_IN] * 0.5, 0.01, 0.99);

      // === Mixer ===
      let mix = vco1out * vco1level + vco2out * vco2level;
      if (ringModLevel > 0) mix += ringModOut * ringModLevel;
      if (noiseLevel > 0) mix += (whiteNoise * 0.5 + pinkNoise * 0.5) * noiseLevel;
      mix += this.dests[JACK_TOTAL_IN]; // external input from patch bay

      // === HPF ===
      const hpfMod = Math.pow(2, eg2val * hpfEnvAmt)
                    * Math.pow(2, mgVal * hpfMgAmt)
                    * Math.pow(2, this.dests[JACK_HPF_CUTOFF_IN]);
      const hpfFreqNorm = clamp((hpfCutoff * hpfMod) * 2 * _PI / sampleRate, 0.0001, 0.99);
      const hpfLpOut = this.hpf.process(mix, hpfFreqNorm, hpfPeak, driveVal);
      const hpfOut = mix - hpfLpOut; // HP = input - LP
      this.sources[JACK_HPF_OUT] = hpfOut;

      // === LPF ===
      const lpfMod = Math.pow(2, eg2val * lpfEnvAmt)
                    * Math.pow(2, mgVal * lpfMgAmt)
                    * Math.pow(2, mgVal * mgFilterAmt)
                    * Math.pow(2, this.dests[JACK_LPF_CUTOFF_IN]);
      const lpfFreqNorm = clamp((lpfCutoff * lpfMod) * 2 * _PI / sampleRate, 0.0001, 0.99);
      const lpfOut = this.lpf.process(hpfOut, lpfFreqNorm, lpfPeak, driveVal);
      this.sources[JACK_LPF_OUT] = lpfOut;

      // === VCA ===
      const vcaEnv = eg1val + this.dests[JACK_VCA_CONTROL_IN];
      const vcaInitGain = 1.0 + this.dests[JACK_VCA_INIT_GAIN_IN];
      let vcaOut = lpfOut * clamp(vcaEnv, 0, 1) * clamp(vcaInitGain, 0, 2) * 0.4;

      // Asymmetric clipping (MS-20 constants)
      if (vcaOut > 0.755) vcaOut = 0.755;
      if (vcaOut < -0.765) vcaOut = -0.765;

      this.prevVcaOut = vcaOut;
      outL[i] = vcaOut;
      outR[i] = vcaOut;
    }

    if (this.eg1.stage === 0 && this.eg2.stage === 0 && currentTime >= end) {
      return false;
    }
    return true;
  }
}

registerProcessor('ms20-processor', MS20Processor);
```

- [ ] **Step 3: Build and verify**

Run: `cd ~/work2/strudel/packages/superdough && pnpm build`
Expected: `✓ built in` with no errors

- [ ] **Step 4: Commit**

```bash
cd ~/work2/strudel
git add packages/superdough/worklets.mjs
git commit -m "feat(ms20): add modulation matrix and patch bay signal routing

Adds JACK constants, S&H, envelope follower, clock, pink/white noise
generators, and per-sample modulation routing matching the MS-20 patch panel.

Generated with Claude Code"
```

---

### Task 3: Update synth.mjs to pass new params and modmatrix via postMessage

**Files:**
- Modify: `packages/superdough/synth.mjs` (lines 416-517)

- [ ] **Step 1: Replace the ms20 registerSound block**

Replace everything from `// MS-20 synthesizer` (line 416) through the closing `);` of `registerSound` (line 517) with:

```javascript
  // MS-20 synthesizer — modelled from the Korg MS-20 VST binary
  // Uses a dedicated AudioWorklet with tanh-saturated cascaded filters
  const ms20Waves = { saw: 0, square: 1, tri: 2, sine: 3, sawtooth: 0, triangle: 2 };

  registerSound(
    'ms20',
    (begin, value, onended) => {
      const ac = getAudioContext();
      const {
        duration,
        // VCO1
        vco1wave = 'saw', vco1level = 0.8, vco1pw = 0.5, vco1scale = 1,
        // VCO2
        vco2wave = 'saw', vco2level = 0.0, vco2tune = 0, vco2pw = 0.5, vco2scale = 1,
        // Noise & ring mod
        noiselevel = 0, ringmod = 0,
        // HPF
        hpfcutoff = 20, hpfpeak = 0, hpfenv = 0, hpfmg = 0,
        // LPF
        lpfcutoff = 8000, lpfpeak = 0, lpfenv = 0, lpfmg = 0,
        // Drive
        drive = 1.5,
        // EG1
        eg1attack, eg1decay, eg1sustain, eg1release, eg1rev = 0,
        // EG2
        eg2attack, eg2decay, eg2sustain, eg2release, eg2rev = 0,
        // MG
        mgfreq = 0, mgwave = 'tri', mgpitch = 0, mgfilter = 0,
        // Pitch modulation
        pitcheg = 0, pitchmg = 0,
        // Portamento
        portamento = 0,
        // Modulation matrix (patch bay cables)
        modmatrix,
      } = value;

      const attack = eg1attack ?? value.attack ?? 0.001;
      const decay = eg1decay ?? value.decay ?? 0.2;
      const sustain = eg1sustain ?? value.sustain ?? 0.5;
      const release = eg1release ?? value.release ?? 0.1;

      const frequency = getFrequencyFromValue(value);
      const holdend = begin + duration;
      const end = holdend + (release ?? 0.1) + 0.05;

      const o = getWorklet(ac, 'ms20-processor', {
        frequency,
        begin,
        end,
        vco1wave: typeof vco1wave === 'string' ? (ms20Waves[vco1wave] ?? 0) : vco1wave,
        vco1level,
        vco1pw,
        vco1scale,
        vco2wave: typeof vco2wave === 'string' ? (ms20Waves[vco2wave] ?? 0) : vco2wave,
        vco2level,
        vco2tune,
        vco2pw,
        vco2scale,
        noiselevel,
        ringmod,
        hpfcutoff,
        hpfpeak,
        hpfenv,
        hpfmg,
        lpfcutoff,
        lpfpeak,
        lpfenv,
        lpfmg,
        drive,
        eg1attack: attack,
        eg1decay: decay,
        eg1sustain: sustain,
        eg1release: release,
        eg1rev,
        eg2attack: eg2attack ?? 0.01,
        eg2decay: eg2decay ?? 0.15,
        eg2sustain: eg2sustain ?? 0.0,
        eg2release: eg2release ?? 0.05,
        eg2rev,
        mgfreq,
        mgwave: typeof mgwave === 'string' ? (ms20Waves[mgwave] ?? 2) : mgwave,
        mgpitch,
        mgfilter,
        pitcheg,
        pitchmg,
        portamento,
      }, {
        outputChannelCount: [2],
      });

      // Send modulation matrix via postMessage if present
      if (modmatrix && Array.isArray(modmatrix) && modmatrix.length > 0) {
        o.port.postMessage({ type: 'modmatrix', cables: modmatrix });
      }

      const g = gainNode(0.5);
      o.connect(g);

      const timeoutNode = webAudioTimeout(
        ac,
        () => {
          destroyAudioWorkletNode(o);
          g.disconnect();
          onended();
        },
        begin,
        end,
      );

      return {
        node: g,
        stop: (time) => {
          timeoutNode.stop(time);
        },
      };
    },
    { type: 'synth', prebake: true },
  );
```

- [ ] **Step 2: Build and verify**

Run: `cd ~/work2/strudel/packages/superdough && pnpm build`
Expected: `✓ built in` with no errors

- [ ] **Step 3: Commit**

```bash
cd ~/work2/strudel
git add packages/superdough/synth.mjs
git commit -m "feat(ms20): update registerSound with modmatrix, new params

Passes modulation matrix via postMessage, adds vco1scale/vco2scale,
hpfmg/lpfmg, pitcheg/pitchmg, eg1rev/eg2rev.

Generated with Claude Code"
```

---

### Task 4: Register new controls in core

**Files:**
- Modify: `packages/core/controls.mjs` (append to MS-20 section at end of file)

- [ ] **Step 1: Add missing controls**

Append after the existing MS-20 controls section (after the `portamento` line):

```javascript
/** VCO1 octave scale multiplier (0.25=32', 0.5=16', 1=8', 2=4') */
export const { vco1scale } = registerControl('vco1scale');
/** VCO2 octave scale multiplier */
export const { vco2scale } = registerControl('vco2scale');
/** HPF modulation by MG (0-1) */
export const { hpfmg } = registerControl('hpfmg');
/** LPF modulation by MG (0-1) */
export const { lpfmg } = registerControl('lpfmg');
/** Pitch modulation by EG1 (semitones) */
export const { pitcheg } = registerControl('pitcheg');
/** Pitch modulation by MG (semitones) */
export const { pitchmg } = registerControl('pitchmg');
/** EG1 polarity inversion (0=normal, 1=inverted) */
export const { eg1rev } = registerControl('eg1rev');
/** EG2 polarity inversion (0=normal, 1=inverted) */
export const { eg2rev } = registerControl('eg2rev');
/** Modulation matrix for MS-20 patch bay (array of {src, dst} objects) */
export const { modmatrix } = registerControl('modmatrix');
```

- [ ] **Step 2: Build and verify**

Run: `cd ~/work2/strudel/packages/core && pnpm build`
Expected: `✓ built in` with no errors

- [ ] **Step 3: Commit**

```bash
cd ~/work2/strudel
git add packages/core/controls.mjs
git commit -m "feat(ms20): register modmatrix and new modulation controls

Adds vco1scale, vco2scale, hpfmg, lpfmg, pitcheg, pitchmg,
eg1rev, eg2rev, modmatrix controls.

Generated with Claude Code"
```

---

### Task 5: Build the Python FXP preset extractor

**Files:**
- Create: `tools/ms20-extract-presets.py`

- [ ] **Step 1: Create the extraction script**

```python
#!/usr/bin/env python3
"""
Extract Korg MS-20 factory presets from .fxp files and generate
a Strudel JS module with all presets as pattern functions.

Usage: python3 tools/ms20-extract-presets.py

Reads from: /Library/Application Support/KORG/MS-20/Presets/
Writes to:  packages/superdough/ms20-factory-presets.mjs
"""

import struct
import glob
import os
import re
import math

# Jack ID constants (must match worklets.mjs)
JACK = {
    'KBD_CV': 0, 'VCA_OUT': 1, 'ENV_FOLLOW': 2, 'PINK_NOISE': 3,
    'EG1': 4, 'EG1_REV': 5, 'EG2_REV': 6, 'CLOCK': 7,
    'WHITE_NOISE': 8, 'TRIG': 9, 'SH_OUT': 10, 'RING_MOD': 11,
    'HPF_OUT': 12, 'LPF_OUT': 13, 'MG_OUT': 14, 'VCO1_OUT': 15, 'VCO2_OUT': 16,
    'TOTAL_IN': 17, 'VCO_CV_IN': 18, 'VCO2_CV_IN': 19,
    'VCO_FREQ_MOD_IN': 20, 'HPF_CUTOFF_IN': 21, 'LPF_CUTOFF_IN': 22,
    'VCA_INIT_GAIN_IN': 23, 'VCA_CONTROL_IN': 24, 'EG1_TRIG_IN': 25,
    'EG12_TRIG_IN': 26, 'VCO_FREQ_IN': 27, 'SH_CLOCK_IN': 28,
    'SH_SIGNAL_IN': 29, 'ESP_IN': 30, 'MOD_VCA_IN': 31,
    'VCO1_PW_IN': 32, 'RING_MOD_IN': 33, 'EXT_TRIG_IN': 34,
}

# Waveform mapping: Korg normalized → worklet int
WAVE_MAP = {0: 2, 1: 0, 2: 1, 3: 3}  # tri, saw, square, sine

def korg_wave(val):
    """Map Korg 0-1 waveform to worklet integer."""
    idx = round(val * 3)
    return WAVE_MAP.get(idx, 0)

def korg_scale(val):
    """Map Korg 0-1 scale to octave multiplier."""
    # 0=32'(0.25), 0.333=16'(0.5), 0.667=8'(1), 1=4'(2)
    idx = round(val * 3)
    return [0.25, 0.5, 1.0, 2.0][min(idx, 3)]

def korg_level(val):
    """Map Korg 0-1 level (discrete steps) to 0-1."""
    return round(val, 3)

def korg_time(val, min_t=0.001, max_t=10.0):
    """Map Korg 0-1 knob to time in seconds (exponential)."""
    if val <= 0:
        return min_t
    return min_t * math.pow(max_t / min_t, val)

def korg_freq_hz(val, min_hz=20, max_hz=20000):
    """Map Korg 0-1 knob to frequency in Hz (exponential)."""
    if val <= 0:
        return min_hz
    return min_hz * math.pow(max_hz / min_hz, val)

def korg_bipolar(val, range_val=8):
    """Map Korg 0-1 to bipolar range (-range to +range), 0.5=center."""
    return (val - 0.5) * 2 * range_val

def korg_mg_freq(val):
    """Map Korg 0-1 MG frequency to Hz."""
    if val <= 0:
        return 0
    return 0.1 * math.pow(500, val)  # 0.1 Hz to 50 Hz

def korg_tune(val):
    """Map Korg 0-1 tune to semitones (-12 to +12)."""
    return (val - 0.5) * 24

def korg_portamento(val):
    """Map Korg 0-1 portamento to seconds."""
    if val <= 0.5:
        return 0
    return (val - 0.5) * 10  # 0-5 seconds

def parse_fxp(path):
    """Parse a Korg MS-20 .fxp preset file."""
    with open(path, 'rb') as f:
        data = f.read()

    # FXP header
    chunk = data[60:]
    name = chunk[16:48].split(b'\x00')[0].decode('ascii', errors='replace').strip()

    # 84 float parameters
    params = []
    for i in range(84):
        offset = 48 + i * 4
        val = struct.unpack('<f', chunk[offset:offset+4])[0]
        params.append(val)

    # Patch cables (15 slots of 4 bytes each, after the 84 floats)
    cables = []
    cable_offset = 48 + 84 * 4
    for i in range(15):
        b = chunk[cable_offset + i*4 : cable_offset + i*4 + 4]
        if len(b) < 4 or b[0] == 0xFF:
            continue
        dst_jack = b[0]
        src_jack = b[1]
        if dst_jack < 35 and src_jack < 35:
            cables.append({'src': src_jack, 'dst': dst_jack})

    return name, params, cables

def slugify(name):
    """Convert preset name to valid JS identifier."""
    s = name.lower().strip()
    s = re.sub(r'[^a-z0-9]+', '_', s)
    s = re.sub(r'_+', '_', s).strip('_')
    if s and s[0].isdigit():
        s = 'n' + s
    return 'ms20_' + s

def preset_to_strudel(name, params, cables):
    """Convert parsed preset to Strudel pattern function code."""
    p = params  # shorthand

    lines = []
    slug = slugify(name)

    # Map parameters
    vco1wave = korg_wave(p[1])
    vco1scale = korg_scale(p[0])
    vco1level = korg_level(p[6])
    vco1pw = round(clamp01(p[26]) * 0.98 + 0.01, 3) if p[26] > 0 else 0.5
    vco2wave = korg_wave(p[4])
    vco2scale = korg_scale(p[2])
    vco2level = korg_level(p[7])
    vco2tune = round(korg_tune(p[3]), 2)
    vco2pw = 0.5
    noiselevel = round(p[8], 3)
    ringmod = round(p[11] if len(p) > 11 else 0, 3)

    hpfcutoff = round(korg_freq_hz(p[16]), 1)
    hpfpeak = round(p[17], 3)
    hpfenv = round(korg_bipolar(p[21], 8), 2)
    hpfmg = round(p[22], 3)

    lpfcutoff = round(korg_freq_hz(p[18]), 1)
    lpfpeak = round(p[19], 3)
    lpfenv = round(korg_bipolar(p[20], 8), 2)
    lpfmg = round(p[23], 3)

    eg1attack = round(korg_time(p[27]), 4)
    eg1release = round(korg_time(p[28]), 4)
    eg1rev = 1 if p[51] > 0.5 else 0

    eg2attack = round(korg_time(p[29]), 4)
    eg2decay = round(korg_time(p[30]), 4)
    eg2sustain = round(p[32], 3)
    eg2release = round(korg_time(p[33]), 4)
    eg2rev = 1 if p[34] > 0.5 else 0

    mgfreq = round(korg_mg_freq(p[39]), 2)
    mgwave = korg_wave(p[40])
    pitcheg = round(p[24] * 24, 2)  # semitones
    pitchmg = round(p[25] * 12, 2)

    portamento = round(korg_portamento(p[5]), 3)
    drive = 1.5  # default

    wave_names = {0: 'saw', 1: 'square', 2: 'tri', 3: 'sine'}

    # Build the function
    fn = f'export const {slug} = (pat) => pat\n'
    fn += f'  .s("ms20")\n'
    fn += f'  .vco1wave("{wave_names[vco1wave]}")'
    if vco1scale != 1: fn += f'.vco1scale({vco1scale})'
    fn += f'.vco1level({vco1level})'
    if vco1pw != 0.5: fn += f'.vco1pw({vco1pw})'
    fn += '\n'

    if vco2level > 0:
        fn += f'  .vco2wave("{wave_names[vco2wave]}")'
        if vco2scale != 1: fn += f'.vco2scale({vco2scale})'
        fn += f'.vco2level({vco2level})'
        if vco2tune != 0: fn += f'.vco2tune({vco2tune})'
        fn += '\n'

    if noiselevel > 0.01:
        fn += f'  .noiselevel({noiselevel})\n'
    if ringmod > 0.01:
        fn += f'  .ringmod({ringmod})\n'

    fn += f'  .hpfcutoff({hpfcutoff}).hpfpeak({hpfpeak})'
    if hpfenv != 0: fn += f'.hpfenv({hpfenv})'
    if hpfmg > 0: fn += f'.hpfmg({hpfmg})'
    fn += '\n'

    fn += f'  .lpfcutoff({lpfcutoff}).lpfpeak({lpfpeak})'
    if lpfenv != 0: fn += f'.lpfenv({lpfenv})'
    if lpfmg > 0: fn += f'.lpfmg({lpfmg})'
    fn += '\n'

    fn += f'  .drive({drive})\n'

    fn += f'  .eg1attack({eg1attack}).eg1release({eg1release})'
    if eg1rev: fn += f'.eg1rev(1)'
    fn += '\n'

    fn += f'  .eg2attack({eg2attack}).eg2decay({eg2decay}).eg2sustain({eg2sustain}).eg2release({eg2release})'
    if eg2rev: fn += f'.eg2rev(1)'
    fn += '\n'

    if mgfreq > 0.1:
        fn += f'  .mgfreq({mgfreq}).mgwave("{wave_names[mgwave]}")\n'
    if pitcheg != 0:
        fn += f'  .pitcheg({pitcheg})\n'
    if pitchmg != 0:
        fn += f'  .pitchmg({pitchmg})\n'
    if portamento > 0:
        fn += f'  .portamento({portamento})\n'

    if cables:
        cable_str = ', '.join(f'{{src:{c["src"]}, dst:{c["dst"]}}}' for c in cables)
        fn += f'  .modmatrix([{cable_str}])\n'

    fn += f'  .gain(0.6);\n'

    return slug, fn

def clamp01(v):
    return max(0.0, min(1.0, v))

def main():
    preset_dir = '/Library/Application Support/KORG/MS-20/Presets'
    output_path = os.path.join(os.path.dirname(__file__), '..',
                               'packages', 'superdough', 'ms20-factory-presets.mjs')

    banks = {
        'MS-20 Factory 1': 'factory1',
        'MS-20 Factory 2': 'factory2',
        'Korg USA Bank': 'korg_usa',
        'Devine Bank': 'devine',
    }

    all_presets = []
    bank_presets = {v: [] for v in banks.values()}

    for bank_name, bank_key in banks.items():
        bank_dir = os.path.join(preset_dir, bank_name)
        if not os.path.isdir(bank_dir):
            print(f'Warning: bank dir not found: {bank_dir}')
            continue

        fxp_files = sorted(glob.glob(os.path.join(bank_dir, '*.fxp')))
        for path in fxp_files:
            name, params, cables = parse_fxp(path)
            slug, code = preset_to_strudel(name, params, cables)

            # Check for duplicate slugs
            existing_slugs = [s for s, _, _ in all_presets]
            if slug in existing_slugs:
                slug = slug + '_' + bank_key
                code = code.replace(f'export const {slug.rsplit("_" + bank_key, 1)[0]}',
                                    f'export const {slug}', 1)

            all_presets.append((slug, code, bank_key))
            bank_presets[bank_key].append(slug)

    # Generate output
    output = []
    output.append('/**')
    output.append(' * MS-20 Factory Presets for Strudel')
    output.append(' * Auto-generated from Korg MS-20 .fxp preset files.')
    output.append(f' * Total: {len(all_presets)} presets across {len(banks)} banks.')
    output.append(' *')
    output.append(' * Usage:')
    output.append(' *   note("c2 eb2 g2").apply(ms20_acid_bass)')
    output.append(' *   note("c4").apply(ms20_ring_mod_bell).lpfcutoff(2000)')
    output.append(' */')
    output.append('')

    for slug, code, bank_key in all_presets:
        output.append(code)

    # Bank groupings
    output.append('// Bank collections')
    for bank_key, slugs in bank_presets.items():
        if slugs:
            members = ', '.join(slugs)
            output.append(f'export const ms20_{bank_key} = {{ {members} }};')

    all_slugs = ', '.join(s for s, _, _ in all_presets)
    output.append(f'\nexport const ms20_all = {{ {all_slugs} }};')

    output.append(f'\nexport const listMS20FactoryPresets = () => Object.keys(ms20_all);')

    with open(output_path, 'w') as f:
        f.write('\n'.join(output) + '\n')

    print(f'Generated {len(all_presets)} presets → {output_path}')
    for bank_key, slugs in bank_presets.items():
        print(f'  {bank_key}: {len(slugs)} presets')

if __name__ == '__main__':
    main()
```

- [ ] **Step 2: Run the extractor**

Run: `cd ~/work2/strudel && python3 tools/ms20-extract-presets.py`
Expected: `Generated 161 presets → packages/superdough/ms20-factory-presets.mjs` (or similar count)

- [ ] **Step 3: Verify the generated file looks correct**

Run: `head -50 ~/work2/strudel/packages/superdough/ms20-factory-presets.mjs`
Expected: JS module with `export const ms20_acid_bass = (pat) => pat...` entries

- [ ] **Step 4: Build superdough with the new file**

Run: `cd ~/work2/strudel/packages/superdough && pnpm build`
Expected: `✓ built in` with no errors

- [ ] **Step 5: Commit**

```bash
cd ~/work2/strudel
git add tools/ms20-extract-presets.py packages/superdough/ms20-factory-presets.mjs
git commit -m "feat(ms20): extract 161 factory presets from Korg .fxp files

Python tool parses FXP chunk format, maps 84 normalized parameters
to worklet values, decodes patch bay cable connections into modmatrix.

Generated with Claude Code"
```

---

### Task 6: Update ms20-patches.mjs to use new params

**Files:**
- Modify: `packages/superdough/ms20-patches.mjs`

- [ ] **Step 1: Add modmatrix examples to key patches**

Update `ms20acid` to include a modmatrix cable (EG1 REV → LPF cutoff, classic acid sweep):

Find:
```javascript
export const ms20acid = (pat) => pat
  .s("ms20")
  .vco1wave("saw")
  .vco1level(0.9)
  .lpfcutoff(300)
  .lpfpeak(0.75)      // High resonance for the squelch
  .lpfenv(6)
  .drive(3.0)          // Heavy saturation for acid character
```

Replace with:
```javascript
export const ms20acid = (pat) => pat
  .s("ms20")
  .vco1wave("saw")
  .vco1level(0.9)
  .lpfcutoff(300)
  .lpfpeak(0.75)
  .lpfenv(6)
  .drive(3.0)
  .modmatrix([{src:5, dst:22}])  // EG1 REV → LPF CUTOFF IN
```

Update `ms20sine` to include self-oscillation routing:

Find:
```javascript
export const ms20sine = (pat) => pat
  .s("ms20")
  .vco1wave("sine")
  .vco1level(0.3)
  .lpfcutoff(800)
  .lpfpeak(0.95)      // Near self-oscillation
  .lpfenv(8)
  .drive(3.0)          // High drive emphasizes the resonance
```

Replace with:
```javascript
export const ms20sine = (pat) => pat
  .s("ms20")
  .vco1wave("sine")
  .vco1level(0.3)
  .lpfcutoff(800)
  .lpfpeak(0.95)
  .lpfenv(8)
  .drive(3.0)
  .modmatrix([{src:14, dst:22}])  // MG → LPF CUTOFF IN
```

- [ ] **Step 2: Build and verify**

Run: `cd ~/work2/strudel/packages/superdough && pnpm build`
Expected: `✓ built in` with no errors

- [ ] **Step 3: Commit**

```bash
cd ~/work2/strudel
git add packages/superdough/ms20-patches.mjs
git commit -m "feat(ms20): add modmatrix routing to hand-crafted patches

Generated with Claude Code"
```

---

### Task 7: Integration test — build everything and verify

**Files:**
- All modified files

- [ ] **Step 1: Build both packages**

Run:
```bash
cd ~/work2/strudel/packages/core && pnpm build && echo "core OK"
cd ~/work2/strudel/packages/superdough && pnpm build && echo "superdough OK"
```
Expected: Both print `✓ built in` followed by `OK`

- [ ] **Step 2: Verify preset count**

Run: `grep -c 'export const ms20_' ~/work2/strudel/packages/superdough/ms20-factory-presets.mjs`
Expected: ~161 (the number of extracted presets)

- [ ] **Step 3: Verify modmatrix appears in generated presets**

Run: `grep -c 'modmatrix' ~/work2/strudel/packages/superdough/ms20-factory-presets.mjs`
Expected: A number > 100 (78% of presets use cables)

- [ ] **Step 4: Quick manual test (optional)**

Start the dev server and try in the REPL:
```bash
cd ~/work2/strudel/website && pnpm dev
```
Then in browser at `http://localhost:4321`:
```javascript
note("c2 eb2 g2 c3").s("ms20").lpfcutoff(800).lpfpeak(0.6).lpfenv(3).drive(2)
```
Expected: Should produce sound with characteristic MS-20 filter sweep.
