/**
 * MS-20 Patch Library for Strudel
 *
 * Recreates famous Korg MS-20 patches using Strudel's synthesis capabilities.
 * The MS-20 is known for its aggressive filters, raw oscillators, and powerful modulation.
 *
 * Usage:
 * import { ms20bass, ms20lead, ms20sync } from './ms20-patches.mjs';
 *
 * note("c2").apply(ms20bass)
 * note("c4 eb4 g4").apply(ms20lead)
 */

/**
 * Classic MS-20 Bass Patch
 * Characteristics: Deep, punchy bass with aggressive filter sweep
 * Uses: Basslines, sub bass, techno bass
 */
export const ms20bass = (pat) => pat
  .s("sawtooth")
  .lpf(400)           // Start with closed filter
  .resonance(8)       // High resonance for MS-20 character
  .ftype("ladder")    // Use ladder filter for analog character
  .lpenv(2)           // Moderate filter envelope depth
  .lpa(0.01)          // Fast attack
  .lpd(0.15)          // Quick decay
  .lps(0.1)           // Low sustain
  .lpr(0.05)          // Short release
  .attack(0.001)      // Immediate attack
  .decay(0.2)         // Punchy decay
  .sustain(0.3)       // Moderate sustain
  .release(0.05)      // Quick release
  .gain(0.7);

/**
 * MS-20 Bass with Pulse Wave
 * Characteristics: Thicker, more aggressive bass using pulse oscillator
 * Uses: Acid bass, resonant bass, aggressive basslines
 */
export const ms20pulsebass = (pat) => pat
  .s("pulse")
  .pw(0.5)            // Square wave
  .lpf(500)
  .resonance(10)      // Very high resonance
  .ftype("ladder")
  .lpenv(3)           // Deeper filter modulation
  .lpa(0.005)
  .lpd(0.18)
  .lps(0.05)
  .lpr(0.08)
  .attack(0.001)
  .decay(0.25)
  .sustain(0.2)
  .release(0.08)
  .gain(0.65);

/**
 * MS-20 Classic Lead
 * Characteristics: Cutting lead sound with vibrato and filter modulation
 * Uses: Melodic leads, solos, hooky lines
 */
export const ms20lead = (pat) => pat
  .s("sawtooth")
  .lpf(1200)
  .resonance(6)
  .ftype("ladder")
  .lpenv(4)           // Strong filter sweep
  .lpa(0.02)
  .lpd(0.3)
  .lps(0.4)
  .lpr(0.2)
  .attack(0.01)
  .decay(0.1)
  .sustain(0.7)
  .release(0.15)
  .vib(5)             // Add vibrato
  .vibmod(0.15)       // Moderate vibrato depth
  .gain(0.6);

/**
 * MS-20 Sync Lead
 * Characteristics: Aggressive sync-style lead using supersaw
 * Uses: Aggressive leads, trance sounds, powerful melodies
 */
export const ms20sync = (pat) => pat
  .s("supersaw")
  .detune(0.25)       // Slight detuning for width
  .lpf(2000)
  .resonance(7)
  .ftype("ladder")
  .lpenv(5)
  .lpa(0.01)
  .lpd(0.25)
  .lps(0.3)
  .lpr(0.15)
  .attack(0.005)
  .decay(0.15)
  .sustain(0.6)
  .release(0.2)
  .gain(0.55);

/**
 * MS-20 Pad/String
 * Characteristics: Lush, evolving pad using slow attack
 * Uses: Atmospheric pads, strings, ambient textures
 */
export const ms20pad = (pat) => pat
  .s("sawtooth")
  .lpf(800)
  .resonance(4)
  .ftype("ladder")
  .lpenv(2)
  .lpa(0.5)           // Slow attack
  .lpd(0.8)
  .lps(0.6)
  .lpr(1.0)           // Long release
  .attack(0.4)        // Slow volume attack
  .decay(0.6)
  .sustain(0.8)
  .release(1.5)
  .gain(0.5)
  .room(0.4);         // Add reverb for space

/**
 * MS-20 Pluck/Bell
 * Characteristics: Percussive pluck with pitch envelope
 * Uses: Plucked sounds, bells, melodic percussion
 */
export const ms20pluck = (pat) => pat
  .s("triangle")
  .lpf(2500)
  .resonance(8)
  .ftype("12db")      // Use 12db filter for brighter sound
  .lpenv(6)
  .lpa(0.001)
  .lpd(0.08)
  .lps(0)             // No sustain - percussive
  .lpr(0.05)
  .attack(0.001)
  .decay(0.15)
  .sustain(0)
  .release(0.05)
  .penv(12)           // Add pitch envelope
  .pattack(0.001)
  .pdecay(0.06)       // Quick pitch drop
  .gain(0.7);

/**
 * MS-20 Self-Oscillating Filter
 * Characteristics: Pure sine-like tone from resonant filter
 * Uses: FM-style tones, whistles, sine bass
 */
export const ms20sine = (pat) => pat
  .s("sine")
  .lpf(800)
  .resonance(15)      // Maximum resonance for self-oscillation
  .ftype("ladder")
  .lpenv(8)           // Use filter as oscillator
  .lpa(0.01)
  .lpd(0.2)
  .lps(0.5)
  .lpr(0.1)
  .attack(0.01)
  .decay(0.1)
  .sustain(0.7)
  .release(0.1)
  .gain(0.5);

/**
 * MS-20 Noise Sweep (Hi-hat/FX)
 * Characteristics: Filtered white noise for percussion and effects
 * Uses: Hi-hats, cymbals, risers, swooshes
 */
export const ms20hihat = (pat) => pat
  .s("white")
  .hpf(4000)          // High-pass to thin it out
  .hresonance(2)
  .lpf(8000)
  .resonance(3)
  .lpenv(2)
  .lpa(0.001)
  .lpd(0.05)
  .lps(0)
  .attack(0.001)
  .decay(0.04)
  .sustain(0)
  .release(0.02)
  .gain(0.4);

/**
 * MS-20 Noise Sweep (Rising Effect)
 * Characteristics: Filtered noise with upward sweep
 * Uses: Risers, build-ups, transitions
 */
export const ms20riser = (pat) => pat
  .s("pink")
  .hpf(200)
  .lpf(400)
  .resonance(10)
  .ftype("ladder")
  .lpenv(-8)          // Negative envelope for upward sweep
  .lpa(0.5)           // Slow attack creates the rise
  .lpd(0.3)
  .lps(1)
  .attack(0.3)
  .decay(0.2)
  .sustain(1)
  .gain(0.5);

/**
 * MS-20 PWM Bass
 * Characteristics: Modulating pulse width for movement
 * Uses: Evolving bass, rhythmic bass, animated basslines
 */
export const ms20pwmbass = (pat) => pat
  .s("pulse")
  .pw(0.3)
  .pwrate(4)          // Modulate pulse width
  .pwsweep(0.4)
  .lpf(600)
  .resonance(9)
  .ftype("ladder")
  .lpenv(2.5)
  .lpa(0.01)
  .lpd(0.2)
  .lps(0.15)
  .attack(0.001)
  .decay(0.25)
  .sustain(0.25)
  .release(0.1)
  .gain(0.65);

/**
 * MS-20 FM Bass
 * Characteristics: FM-modulated bass for metallic character
 * Uses: Digital-style bass, bell bass, complex bass
 */
export const ms20fmbass = (pat) => pat
  .s("triangle")
  .fm(2)              // Add FM modulation
  .fmh(2)             // Harmonic FM
  .fmenv(4)           // Modulate FM amount
  .fmattack(0.01)
  .fmdecay(0.15)
  .lpf(800)
  .resonance(8)
  .ftype("ladder")
  .attack(0.001)
  .decay(0.2)
  .sustain(0.3)
  .release(0.08)
  .gain(0.6);

/**
 * MS-20 Acid Bassline Template
 * Characteristics: Classic TB-303-style sequenced bass with MS-20 filters
 * Uses: Acid house, techno, electronic dance music
 */
export const ms20acid = (pat) => pat
  .s("sawtooth")
  .lpf(300)
  .resonance(12)      // Very high resonance
  .ftype("ladder")
  .lpenv(6)
  .lpa(0.005)
  .lpd(0.12)
  .lps(0)             // No sustain for staccato
  .attack(0.001)
  .decay(0.15)
  .sustain(0)
  .release(0.05)
  .gain(0.7)
  .distort(0.2);      // Add slight distortion

/**
 * MS-20 Aggressive Lead with Distortion
 * Characteristics: Overdriven lead with filter distortion
 * Uses: Rock/industrial leads, aggressive melodies
 */
export const ms20distlead = (pat) => pat
  .s("sawtooth")
  .lpf(1500)
  .resonance(12)
  .ftype("ladder")
  .lpenv(5)
  .lpa(0.01)
  .lpd(0.2)
  .lps(0.5)
  .attack(0.01)
  .decay(0.15)
  .sustain(0.7)
  .release(0.2)
  .distort(0.4)       // Add distortion
  .vib(6)
  .vibmod(0.2)
  .gain(0.5);

/**
 * Combined patch for fat, detuned unison sound
 * Characteristics: Multiple oscillators for thickness
 * Uses: Fat leads, super saws, rich textures
 */
export const ms20unison = (pat) => pat
  .s("supersaw")
  .unison(7)          // Multiple voices
  .spread(0.8)        // Wide stereo spread
  .detune(0.3)        // Detune for width
  .lpf(1800)
  .resonance(6)
  .ftype("ladder")
  .lpenv(4)
  .lpa(0.02)
  .lpd(0.25)
  .lps(0.5)
  .attack(0.02)
  .decay(0.2)
  .sustain(0.6)
  .release(0.25)
  .gain(0.45);        // Lower gain for multiple voices

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
