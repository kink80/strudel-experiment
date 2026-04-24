/**
 * MS-20 Patch Library for Strudel
 *
 * Uses the dedicated MS-20 AudioWorklet synthesizer, modelled from
 * reverse-engineering the Korg MS-20 VST binary DSP engine.
 *
 * The MS-20 worklet implements:
 *   - 2x bandlimited VCOs (saw/square/tri/sine) with polyBLEP
 *   - Cascaded nonlinear Sallen-Key HPF & LPF with tanh saturation
 *   - 2x exponential envelope generators (amplitude + filter)
 *   - Modulation generator (LFO) for pitch and filter
 *   - White/pink noise, ring modulator, portamento
 *
 * Usage:
 *   note("c2").s("ms20")                           // Basic sound
 *   note("c2").s("ms20").lpfcutoff(800).lpfpeak(0.6)  // With filter
 *   note("c2").apply(ms20bass)                      // Use a preset patch
 */

/**
 * Classic MS-20 Bass Patch
 * Deep, punchy bass with aggressive filter sweep from the nonlinear LPF
 */
export const ms20bass = (pat) => pat
  .s("ms20")
  .vco1wave("saw")
  .vco1level(0.8)
  .lpfcutoff(400)
  .lpfpeak(0.5)
  .lpfenv(3)          // EG2 → LPF: 3 octaves
  .drive(2.0)         // Push the filters into saturation
  .eg1attack(0.001)
  .eg1decay(0.2)
  .eg1sustain(0.3)
  .eg1release(0.05)
  .eg2attack(0.005)
  .eg2decay(0.15)
  .eg2sustain(0.05)
  .eg2release(0.05)
  .gain(0.7);

/**
 * MS-20 Pulse Bass
 * Thicker bass using pulse wave with PWM-like character
 */
export const ms20pulsebass = (pat) => pat
  .s("ms20")
  .vco1wave("square")
  .vco1pw(0.4)
  .vco1level(0.8)
  .lpfcutoff(500)
  .lpfpeak(0.6)
  .lpfenv(3.5)
  .drive(2.5)
  .eg1attack(0.001)
  .eg1decay(0.25)
  .eg1sustain(0.2)
  .eg1release(0.08)
  .eg2attack(0.005)
  .eg2decay(0.18)
  .eg2sustain(0.0)
  .eg2release(0.08)
  .gain(0.65);

/**
 * MS-20 Classic Lead
 * Cutting lead with vibrato and filter modulation
 */
export const ms20lead = (pat) => pat
  .s("ms20")
  .vco1wave("saw")
  .vco1level(0.7)
  .vco2wave("saw")
  .vco2level(0.4)
  .vco2tune(0.08)     // Slight detune for thickness
  .lpfcutoff(1200)
  .lpfpeak(0.35)
  .lpfenv(4)
  .drive(1.8)
  .eg1attack(0.01)
  .eg1decay(0.1)
  .eg1sustain(0.7)
  .eg1release(0.15)
  .eg2attack(0.02)
  .eg2decay(0.3)
  .eg2sustain(0.4)
  .eg2release(0.2)
  .mgfreq(5)          // MG at 5Hz
  .mgwave("tri")
  .mgpitch(0.15)      // Subtle vibrato
  .gain(0.6);

/**
 * MS-20 Sync-style Lead
 * Aggressive lead using dual detuned oscillators
 */
export const ms20sync = (pat) => pat
  .s("ms20")
  .vco1wave("saw")
  .vco1level(0.6)
  .vco2wave("saw")
  .vco2level(0.6)
  .vco2tune(7)        // Perfect fifth detune
  .lpfcutoff(2000)
  .lpfpeak(0.4)
  .lpfenv(5)
  .drive(2.0)
  .eg1attack(0.005)
  .eg1decay(0.15)
  .eg1sustain(0.6)
  .eg1release(0.2)
  .eg2attack(0.01)
  .eg2decay(0.25)
  .eg2sustain(0.3)
  .eg2release(0.15)
  .gain(0.55);

/**
 * MS-20 Pad/String
 * Lush, evolving pad with slow attack and filter movement
 */
export const ms20pad = (pat) => pat
  .s("ms20")
  .vco1wave("saw")
  .vco1level(0.5)
  .vco2wave("saw")
  .vco2level(0.5)
  .vco2tune(0.05)     // Very slight detune for chorus effect
  .lpfcutoff(800)
  .lpfpeak(0.2)
  .lpfenv(2)
  .drive(1.2)
  .eg1attack(0.4)
  .eg1decay(0.6)
  .eg1sustain(0.8)
  .eg1release(1.5)
  .eg2attack(0.5)
  .eg2decay(0.8)
  .eg2sustain(0.6)
  .eg2release(1.0)
  .gain(0.5);

/**
 * MS-20 Pluck
 * Percussive pluck sound with fast filter and pitch envelopes
 */
export const ms20pluck = (pat) => pat
  .s("ms20")
  .vco1wave("tri")
  .vco1level(0.9)
  .lpfcutoff(2500)
  .lpfpeak(0.5)
  .lpfenv(6)
  .drive(1.5)
  .eg1attack(0.001)
  .eg1decay(0.15)
  .eg1sustain(0.0)
  .eg1release(0.05)
  .eg2attack(0.001)
  .eg2decay(0.08)
  .eg2sustain(0.0)
  .eg2release(0.05)
  .gain(0.7);

/**
 * MS-20 Self-Oscillating Filter
 * Pure tones from pushing filter resonance to self-oscillation
 */
export const ms20sine = (pat) => pat
  .s("ms20")
  .vco1wave("sine")
  .vco1level(0.3)
  .lpfcutoff(800)
  .lpfpeak(0.95)
  .lpfenv(8)
  .drive(3.0)
  .modmatrix([{src:14, dst:22}])  // MG → LPF CUTOFF IN
  .eg1attack(0.01)
  .eg1decay(0.1)
  .eg1sustain(0.7)
  .eg1release(0.1)
  .eg2attack(0.01)
  .eg2decay(0.2)
  .eg2sustain(0.5)
  .eg2release(0.1)
  .gain(0.5);

/**
 * MS-20 Hi-Hat
 * Filtered noise for percussion
 */
export const ms20hihat = (pat) => pat
  .s("ms20")
  .vco1wave("saw")
  .vco1level(0.0)
  .noiselevel(1.0)
  .hpfcutoff(4000)
  .hpfpeak(0.2)
  .lpfcutoff(12000)
  .lpfpeak(0.15)
  .lpfenv(2)
  .drive(1.0)
  .eg1attack(0.001)
  .eg1decay(0.04)
  .eg1sustain(0.0)
  .eg1release(0.02)
  .eg2attack(0.001)
  .eg2decay(0.05)
  .eg2sustain(0.0)
  .gain(0.4);

/**
 * MS-20 Riser
 * Filtered noise with upward sweep for transitions
 */
export const ms20riser = (pat) => pat
  .s("ms20")
  .vco1level(0.0)
  .noiselevel(0.8)
  .hpfcutoff(200)
  .lpfcutoff(400)
  .lpfpeak(0.6)
  .lpfenv(-8)         // Negative = sweep upward
  .drive(2.0)
  .eg1attack(0.3)
  .eg1decay(0.2)
  .eg1sustain(1.0)
  .eg1release(0.5)
  .eg2attack(0.5)
  .eg2decay(0.3)
  .eg2sustain(1.0)
  .eg2release(0.2)
  .gain(0.5);

/**
 * MS-20 PWM Bass
 * Animated bass using square wave with pulse width modulation via MG
 */
export const ms20pwmbass = (pat) => pat
  .s("ms20")
  .vco1wave("square")
  .vco1pw(0.3)
  .vco1level(0.8)
  .mgfreq(4)          // MG modulates at 4Hz
  .mgwave("tri")
  .mgfilter(0.5)      // Subtle filter movement from MG
  .lpfcutoff(600)
  .lpfpeak(0.55)
  .lpfenv(2.5)
  .drive(2.0)
  .eg1attack(0.001)
  .eg1decay(0.25)
  .eg1sustain(0.25)
  .eg1release(0.1)
  .eg2attack(0.01)
  .eg2decay(0.2)
  .eg2sustain(0.15)
  .eg2release(0.1)
  .gain(0.65);

/**
 * MS-20 FM Bass
 * Uses ring modulator for metallic character
 */
export const ms20fmbass = (pat) => pat
  .s("ms20")
  .vco1wave("tri")
  .vco1level(0.5)
  .vco2wave("tri")
  .vco2level(0.3)
  .vco2tune(12)       // Octave up
  .ringmod(0.4)       // Ring mod for metallic harmonics
  .lpfcutoff(800)
  .lpfpeak(0.4)
  .lpfenv(3)
  .drive(1.5)
  .eg1attack(0.001)
  .eg1decay(0.2)
  .eg1sustain(0.3)
  .eg1release(0.08)
  .eg2attack(0.01)
  .eg2decay(0.15)
  .eg2sustain(0.0)
  .eg2release(0.08)
  .gain(0.6);

/**
 * MS-20 Acid Bassline
 * Classic squelchy acid line with high resonance and short envelope
 */
export const ms20acid = (pat) => pat
  .s("ms20")
  .vco1wave("saw")
  .vco1level(0.9)
  .lpfcutoff(300)
  .lpfpeak(0.75)
  .lpfenv(6)
  .drive(3.0)
  .modmatrix([{src:5, dst:22}])  // EG1 REV → LPF CUTOFF IN
  .eg1attack(0.001)
  .eg1decay(0.15)
  .eg1sustain(0.0)
  .eg1release(0.05)
  .eg2attack(0.005)
  .eg2decay(0.12)
  .eg2sustain(0.0)
  .eg2release(0.05)
  .gain(0.7);

/**
 * MS-20 Distorted Lead
 * Aggressive overdriven lead
 */
export const ms20distlead = (pat) => pat
  .s("ms20")
  .vco1wave("saw")
  .vco1level(0.8)
  .lpfcutoff(1500)
  .lpfpeak(0.6)
  .lpfenv(5)
  .drive(5.0)          // Heavy drive for distortion
  .eg1attack(0.01)
  .eg1decay(0.15)
  .eg1sustain(0.7)
  .eg1release(0.2)
  .eg2attack(0.01)
  .eg2decay(0.2)
  .eg2sustain(0.5)
  .eg2release(0.2)
  .mgfreq(6)
  .mgpitch(0.2)
  .gain(0.5);

/**
 * MS-20 Unison
 * Fat detuned dual-oscillator lead
 */
export const ms20unison = (pat) => pat
  .s("ms20")
  .vco1wave("saw")
  .vco1level(0.6)
  .vco2wave("saw")
  .vco2level(0.6)
  .vco2tune(0.12)     // Detune for width
  .lpfcutoff(1800)
  .lpfpeak(0.3)
  .lpfenv(4)
  .drive(1.8)
  .eg1attack(0.02)
  .eg1decay(0.2)
  .eg1sustain(0.6)
  .eg1release(0.25)
  .eg2attack(0.02)
  .eg2decay(0.25)
  .eg2sustain(0.5)
  .eg2release(0.2)
  .gain(0.45);

// Export all patches as a collection
export const ms20patches = {
  ms20bass,
  ms20pulsebass,
  ms20lead,
  ms20sync,
  ms20pad,
  ms20pluck,
  ms20sine,
  ms20hihat,
  ms20riser,
  ms20pwmbass,
  ms20fmbass,
  ms20acid,
  ms20distlead,
  ms20unison,
};

// Export helper function to list all available patches
export const listMS20Patches = () => {
  return Object.keys(ms20patches);
};
