import { clamp } from './util.mjs';
import { registerSound, soundMap } from './superdough.mjs';
import { getAudioContext } from './audioContext.mjs';
import {
  applyFM,
  destroyAudioWorkletNode,
  gainNode,
  getADSRValues,
  getFrequencyFromValue,
  getLfo,
  getParamADSR,
  getPitchEnvelope,
  getVibratoOscillator,
  getWorklet,
  noises,
  webAudioTimeout,
} from './helpers.mjs';
import { getNoiseMix, getNoiseOscillator } from './noise.mjs';

const waveforms = ['triangle', 'square', 'sawtooth', 'sine'];
const waveformAliases = [
  ['tri', 'triangle'],
  ['sqr', 'square'],
  ['saw', 'sawtooth'],
  ['sin', 'sine'],
];

function makeSaturationCurve(amount, n_samples) {
  const k = typeof amount === 'number' ? amount : 50;
  const curve = new Float32Array(n_samples);

  for (let i = 0; i < n_samples; i++) {
    const x = (i * 2) / n_samples - 1;
    curve[i] = Math.tanh(x * k);
  }
  return curve;
}

export function registerSynthSounds() {
  [...waveforms].forEach((s) => {
    registerSound(
      s,
      (t, value, onended) => {
        const [attack, decay, sustain, release] = getADSRValues(
          [value.attack, value.decay, value.sustain, value.release],
          'linear',
          [0.001, 0.05, 0.6, 0.01],
        );

        let sound = getOscillator(s, t, value);
        let { node: o, stop, triggerRelease } = sound;

        // turn down
        const g = gainNode(0.3);

        const { duration } = value;

        o.onended = () => {
          o.disconnect();
          g.disconnect();
          onended();
        };

        const envGain = gainNode(1);
        let node = o.connect(g).connect(envGain);
        const holdEnd = t + duration;
        getParamADSR(node.gain, attack, decay, sustain, release, 0, 1, t, holdEnd, 'linear');
        const envEnd = holdEnd + release + 0.01;
        triggerRelease?.(envEnd);
        stop(envEnd);
        return {
          node,
          stop: (endTime) => {
            stop(endTime);
          },
        };
      },
      { type: 'synth', prebake: true },
    );
  });

  registerSound(
    'sbd',
    (t, value, onended) => {
      const { duration, decay = 0.5, pdecay = 0.5, penv = 36, clip } = value;
      const ctx = getAudioContext();
      const attackhold = 0.02;
      const noiselvl = 1.2;
      const noisedecay = 0.025;
      const mixGain = 1;

      const o = ctx.createOscillator();
      o.type = 'triangle';
      o.frequency.value = getFrequencyFromValue(value, 29);
      o.detune.setValueAtTime(penv * 100, 0);
      o.detune.setValueAtTime(penv * 100, t);
      o.detune.exponentialRampToValueAtTime(0.001, t + pdecay);
      const g = gainNode(1);
      g.gain.setValueAtTime(1, t + attackhold);
      g.gain.exponentialRampToValueAtTime(0.001, t + attackhold + decay);
      o.start(t);

      const noise = getNoiseOscillator('brown', t, 2);
      const noiseGain = gainNode(1);
      noiseGain.gain.setValueAtTime(noiselvl, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + noisedecay);

      const sat = new WaveShaperNode(ctx);
      // tri to sine diode shaper emulation
      sat.curve = makeSaturationCurve(2, ctx.sampleRate);

      const mix = gainNode(mixGain);

      o.onended = () => {
        o.disconnect();
        g.disconnect();
        sat.disconnect();
        noise.node.disconnect();
        noiseGain.disconnect();
        mix.disconnect();
        onended();
      };

      const node = o.connect(sat).connect(g).connect(mix);
      noise.node.connect(noiseGain).connect(mix);

      const holdEnd = t + decay;
      let end = holdEnd + 0.01;
      if (clip != null) {
        end = Math.min(t + clip * duration, end);
      }

      // prevent clicking
      mix.gain.setValueAtTime(mixGain, end - 0.01);
      mix.gain.linearRampToValueAtTime(0, end);

      o.stop(end);
      noise.stop(end);

      return {
        node,
        stop: (endTime) => {
          o.stop(endTime);
        },
      };
    },
    { type: 'synth', prebake: true },
  );

  registerSound(
    'supersaw',
    (begin, value, onended) => {
      const ac = getAudioContext();
      let { duration, n, unison = 5, spread = 0.6, detune } = value;
      detune = detune ?? n ?? 0.18;
      const frequency = getFrequencyFromValue(value);

      const [attack, decay, sustain, release] = getADSRValues(
        [value.attack, value.decay, value.sustain, value.release],
        'linear',
        [0.001, 0.05, 0.6, 0.01],
      );

      const holdend = begin + duration;
      const end = holdend + release + 0.01;
      const voices = clamp(unison, 1, 100);
      let panspread = voices > 1 ? clamp(spread, 0, 1) : 0;
      let o = getWorklet(
        ac,
        'supersaw-oscillator',
        {
          frequency,
          begin,
          end,
          freqspread: detune,
          voices,
          panspread,
        },
        {
          outputChannelCount: [2],
        },
      );

      const gainAdjustment = 1 / Math.sqrt(voices);
      getPitchEnvelope(o.parameters.get('detune'), value, begin, holdend);
      const vibratoOscillator = getVibratoOscillator(o.parameters.get('detune'), value, begin);
      const fm = applyFM(o.parameters.get('frequency'), value, begin);
      let envGain = gainNode(1);
      envGain = o.connect(envGain);

      getParamADSR(envGain.gain, attack, decay, sustain, release, 0, 0.3 * gainAdjustment, begin, holdend, 'linear');

      let timeoutNode = webAudioTimeout(
        ac,
        () => {
          destroyAudioWorkletNode(o);
          envGain.disconnect();
          onended();
          fm?.stop();
          vibratoOscillator?.stop();
        },
        begin,
        end,
      );

      return {
        node: envGain,
        stop: (time) => {
          timeoutNode.stop(time);
        },
      };
    },
    { prebake: true, type: 'synth' },
  );

  registerSound(
    'bytebeat',
    (begin, value, onended) => {
      const defaultBeats = [
        '(t%255 >= t/255%255)*255',
        '(t*(t*8%60 <= 300)|(-t)*(t*4%512 < 256))+t/400',
        't',
        't*(t >> 10^t)',
        't&128',
        't&t>>8',
        '((t%255+t%128+t%64+t%32+t%16+t%127.8+t%64.8+t%32.8+t%16.8)/3)',
        '((t%64+t%63.8+t%64.15+t%64.35+t%63.5)/1.25)',
        '(t&(t>>7)-t)',
        '(sin(t*PI/128)*127+127)',
        '((t^t/2+t+64*(sin((t*PI/64)+(t*PI/32768))+64))%128*2)',
        '((t^t/2+t+64*(cos >> 0))%127.85*2)',
        '((t^t/2+t+64)%128*2)',
        '(((t * .25)^(t * .25)/100+(t * .25))%128)*2',
        '((t^t/2+t+64)%7 * 24)',
      ];
      const { n = 0 } = value;
      const frequency = getFrequencyFromValue(value);
      const { byteBeatExpression = defaultBeats[n % defaultBeats.length], byteBeatStartTime } = value;

      const ac = getAudioContext();

      let { duration } = value;
      const [attack, decay, sustain, release] = getADSRValues(
        [value.attack, value.decay, value.sustain, value.release],
        'linear',
        [0.001, 0.05, 0.6, 0.01],
      );
      const holdend = begin + duration;
      const end = holdend + release + 0.01;

      let o = getWorklet(
        ac,
        'byte-beat-processor',
        {
          frequency,
          begin,
          end,
        },
        {
          outputChannelCount: [2],
        },
      );

      o.port.postMessage({ codeText: byteBeatExpression, byteBeatStartTime, frequency });

      let envGain = gainNode(1);
      envGain = o.connect(envGain);

      getParamADSR(envGain.gain, attack, decay, sustain, release, 0, 1, begin, holdend, 'linear');

      let timeoutNode = webAudioTimeout(
        ac,
        () => {
          destroyAudioWorkletNode(o);
          envGain.disconnect();
          onended();
        },
        begin,
        end,
      );

      return {
        node: envGain,
        stop: (time) => {
          timeoutNode.stop(time);
        },
      };
    },
    { prebake: true, type: 'synth' },
  );

  registerSound(
    'pulse',
    (begin, value, onended) => {
      const ac = getAudioContext();
      let { pwrate, pwsweep } = value;
      if (pwsweep == null) {
        if (pwrate != null) {
          pwsweep = 0.3;
        } else {
          pwsweep = 0;
        }
      }

      if (pwrate == null && pwsweep != null) {
        pwrate = 1;
      }

      let { duration, pw: pulsewidth = 0.5 } = value;
      const frequency = getFrequencyFromValue(value);

      const [attack, decay, sustain, release] = getADSRValues(
        [value.attack, value.decay, value.sustain, value.release],
        'linear',
        [0.001, 0.05, 0.6, 0.01],
      );
      const holdend = begin + duration;
      const end = holdend + release + 0.01;
      let o = getWorklet(
        ac,
        'pulse-oscillator',
        {
          frequency,
          begin,
          end,
          pulsewidth,
        },
        {
          outputChannelCount: [2],
        },
      );

      getPitchEnvelope(o.parameters.get('detune'), value, begin, holdend);
      const vibratoOscillator = getVibratoOscillator(o.parameters.get('detune'), value, begin);
      const fm = applyFM(o.parameters.get('frequency'), value, begin);
      let envGain = gainNode(1);
      envGain = o.connect(envGain);

      getParamADSR(envGain.gain, attack, decay, sustain, release, 0, 1, begin, holdend, 'linear');
      let lfo;
      if (pwsweep != 0) {
        lfo = getLfo(ac, begin, end, { frequency: pwrate, depth: pwsweep });
        lfo.connect(o.parameters.get('pulsewidth'));
      }
      let timeoutNode = webAudioTimeout(
        ac,
        () => {
          destroyAudioWorkletNode(o);
          destroyAudioWorkletNode(lfo);
          envGain.disconnect();
          onended();
          fm?.stop();
          vibratoOscillator?.stop();
        },
        begin,
        end,
      );

      return {
        node: envGain,
        stop: (time) => {
          timeoutNode.stop(time);
        },
      };
    },
    { prebake: true, type: 'synth' },
  );

  [...noises].forEach((s) => {
    registerSound(
      s,
      (t, value, onended) => {
        const [attack, decay, sustain, release] = getADSRValues(
          [value.attack, value.decay, value.sustain, value.release],
          'linear',
          [0.001, 0.05, 0.6, 0.01],
        );

        let sound;

        let { density } = value;
        sound = getNoiseOscillator(s, t, density);

        let { node: o, stop, triggerRelease } = sound;

        // turn down
        const g = gainNode(0.3);

        const { duration } = value;

        o.onended = () => {
          o.disconnect();
          g.disconnect();
          onended();
        };

        const envGain = gainNode(1);
        let node = o.connect(g).connect(envGain);
        const holdEnd = t + duration;
        getParamADSR(node.gain, attack, decay, sustain, release, 0, 1, t, holdEnd, 'linear');
        const envEnd = holdEnd + release + 0.01;
        triggerRelease?.(envEnd);
        stop(envEnd);
        return {
          node,
          stop: (endTime) => {
            stop(endTime);
          },
        };
      },
      { type: 'synth', prebake: true },
    );
  });
  waveformAliases.forEach(([alias, actual]) => soundMap.set({ ...soundMap.get(), [alias]: soundMap.get()[actual] }));

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
}

export function registerMS20FactoryPresets() {
  // Dynamically import to avoid circular deps — this runs after registerSynthSounds
  const ms20Sound = soundMap.get()?.['ms20'];
  if (!ms20Sound) {
    console.warn('MS-20 synth not registered yet, skipping factory presets');
    return;
  }

  // Import all factory presets
  import('./ms20-factory-presets.mjs').then((module) => {
    const allPresets = module.ms20_all;
    if (!allPresets) return;

    for (const [name, patchFn] of Object.entries(allPresets)) {
      // Extract default values by running the patch function against a collector proxy
      const defaults = {};
      const collector = new Proxy({}, {
        get(_, prop) {
          return (val) => {
            if (prop !== 's') defaults[prop] = val;
            return collector;
          };
        }
      });
      patchFn(collector);

      // Register as a sound that triggers ms20 with preset defaults
      registerSound(
        name,
        (t, value, onended) => {
          const merged = { ...defaults, ...value };
          return ms20Sound.onTrigger(t, merged, onended);
        },
        { type: 'synth', tag: 'ms20', prebake: true },
      );
    }
  });
}

export function waveformN(partials, type) {
  const real = new Float32Array(partials + 1);
  const imag = new Float32Array(partials + 1);
  const ac = getAudioContext();
  const osc = ac.createOscillator();

  const terms = {
    sawtooth: (n) => [0, -1 / n],
    square: (n) => [0, n % 2 === 0 ? 0 : 1 / n],
    triangle: (n) => [n % 2 === 0 ? 0 : 1 / (n * n), 0],
  };

  if (!terms[type]) {
    throw new Error(`unknown wave type ${type}`);
  }

  real[0] = 0; // dc offset
  imag[0] = 0;
  let n = 1;
  while (n <= partials) {
    const [r, i] = terms[type](n);
    real[n] = r;
    imag[n] = i;
    n++;
  }

  const wave = ac.createPeriodicWave(real, imag);
  osc.setPeriodicWave(wave);
  return osc;
}

// expects one of waveforms as s
export function getOscillator(s, t, value) {
  let { n: partials, duration, noise = 0 } = value;
  let o;
  // If no partials are given, use stock waveforms
  if (!partials || s === 'sine') {
    o = getAudioContext().createOscillator();
    o.type = s || 'triangle';
  }
  // generate custom waveform if partials are given
  else {
    o = waveformN(partials, s);
  }
  // set frequency
  o.frequency.value = getFrequencyFromValue(value);
  o.start(t);

  let vibratoOscillator = getVibratoOscillator(o.detune, value, t);

  // pitch envelope
  getPitchEnvelope(o.detune, value, t, t + duration);
  const fmModulator = applyFM(o.frequency, value, t);

  let noiseMix;
  if (noise) {
    noiseMix = getNoiseMix(o, noise, t);
  }

  return {
    node: noiseMix?.node || o,
    stop: (time) => {
      fmModulator.stop(time);
      vibratoOscillator?.stop(time);
      noiseMix?.stop(time);
      o.stop(time);
    },
    triggerRelease: (time) => {
      // envGain?.stop(time);
    },
  };
}
