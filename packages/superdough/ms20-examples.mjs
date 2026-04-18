/**
 * MS-20 Example Patterns for Strudel
 *
 * Demonstration patterns showcasing the MS-20 patch library in action.
 * These examples recreate classic MS-20 sounds and techniques.
 *
 * To use in Strudel REPL, copy and paste examples.
 */

/**
 * Example 1: Classic MS-20 Bassline
 * A punchy, filtered bassline with the characteristic MS-20 sound
 */
export const example1_classicBass = `
// Import the patch
import { ms20bass } from './ms20-patches.mjs';

note("c2 c2 [~ c2] c2")
  .apply(ms20bass)
  .sometimes(x => x.lpenv(4)) // Vary filter depth
`;

/**
 * Example 2: Acid Bassline Sequence
 * 303-style acid sequence with MS-20 character
 */
export const example2_acidBass = `
import { ms20acid } from './ms20-patches.mjs';

note("c2 [eb2 <g2 bb2>] f2 <c2 ab2>")
  .apply(ms20acid)
  .lpf(perlin.range(200, 800).slow(4)) // Modulate cutoff
  .sometimes(x => x.n(2)) // Accent some notes
`;

/**
 * Example 3: Evolving Lead Melody
 * Expressive lead with vibrato and filter modulation
 */
export const example3_lead = `
import { ms20lead } from './ms20-patches.mjs';

note("<[c4 eb4 g4] [d4 f4 a4] [e4 g4 b4] [c4 e4 g4]>".slow(2))
  .apply(ms20lead)
  .vib("5 5.5 6 5.5".slow(4)) // Vary vibrato
  .sometimes(x => x.add(note(12))) // Octave jumps
`;

/**
 * Example 4: Aggressive Sync Lead
 * Powerful sync-style lead for dance music
 */
export const example4_sync = `
import { ms20sync } from './ms20-patches.mjs';

note("c5 [eb5 g5] <f5 [g5 bb5]>".fast(2))
  .apply(ms20sync)
  .lpenv(sine.range(4, 7).slow(8)) // Modulate filter depth
  .room(0.3) // Add reverb
`;

/**
 * Example 5: Atmospheric Pad
 * Lush, evolving pad texture
 */
export const example5_pad = `
import { ms20pad } from './ms20-patches.mjs';

note("<[c3,e3,g3,b3] [d3,f3,a3,c4] [e3,g3,b3,d4] [f3,a3,c4,e4]>".slow(4))
  .apply(ms20pad)
  .lpf(sine.range(600, 1200).slow(16)) // Slow filter movement
  .roomsize(8)
`;

/**
 * Example 6: Percussive Pluck Pattern
 * Melodic plucks with pitch envelope
 */
export const example6_pluck = `
import { ms20pluck } from './ms20-patches.mjs';

note("c5 g4 <e5 d5> g4 c5 g4 <f5 e5> g4".fast(2))
  .apply(ms20pluck)
  .penv("<12 18 24 12>".slow(4)) // Vary pitch envelope
  .sometimes(x => x.delay(0.5))
`;

/**
 * Example 7: Filtered Noise Hi-Hats
 * MS-20 style noise percussion
 */
export const example7_hats = `
import { ms20hihat } from './ms20-patches.mjs';

s("~ ~ ~ ~".apply(ms20hihat))
  .struct("t*16")
  .gain("<0.6 0.4 0.8 0.4>*4") // Vary velocity
  .sometimes(x => x.hpf(8000)) // Vary timbre
`;

/**
 * Example 8: PWM Bass Groove
 * Animated bass with pulse width modulation
 */
export const example8_pwm = `
import { ms20pwmbass } from './ms20-patches.mjs';

note("c2 ~ [eb2 f2] ~".fast(2))
  .apply(ms20pwmbass)
  .pwrate("<3 4 5 4>".slow(4)) // Vary PWM rate
  .clip(0.6) // Shorter notes
`;

/**
 * Example 9: FM Bell Bass
 * Metallic bass sounds using FM
 */
export const example9_fmbass = `
import { ms20fmbass } from './ms20-patches.mjs';

note("c2 <eb2 d2> <g2 f2> <c3 bb2>".fast(1.5))
  .apply(ms20fmbass)
  .fm(perlin.range(1, 4).slow(8)) // Modulate FM amount
  .sometimes(x => x.lpenv(6))
`;

/**
 * Example 10: Riser/Build-up Effect
 * Tension-building sweep effect
 */
export const example10_riser = `
import { ms20riser } from './ms20-patches.mjs';

s("~!15 riser".apply(ms20riser))
  .every(16, x => x.lpf(sine.range(200, 4000).slow(1)))
  .every(16, x => x.gain(sine.range(0.3, 0.8).slow(1)))
`;

/**
 * Example 11: Complete MS-20 Track
 * Full arrangement using multiple MS-20 patches
 */
export const example11_fullTrack = `
import {
  ms20bass,
  ms20lead,
  ms20hihat,
  ms20pad
} from './ms20-patches.mjs';

stack(
  // Bassline
  note("c2 ~ [eb2 f2] ~".fast(2))
    .apply(ms20bass)
    .lpenv(sine.range(2, 4).slow(8)),

  // Lead melody
  note("~ [c5 eb5] ~ [g5 f5]".slow(2))
    .apply(ms20lead)
    .sometimes(x => x.add(note(12))),

  // Hi-hats
  s("~ ~ ~ ~".apply(ms20hihat))
    .struct("t*8"),

  // Pad
  note("[c3,e3,g3]".slow(8))
    .apply(ms20pad)
    .gain(0.3)
).slow(1)
`;

/**
 * Example 12: Unison Lead Stack
 * Fat, layered lead sound
 */
export const example12_unison = `
import { ms20unison } from './ms20-patches.mjs';

note("<c4 eb4 g4 <f4 bb4>>".fast(4))
  .apply(ms20unison)
  .lpenv(sine.range(3, 6).slow(8))
  .delay(0.25)
  .delayfeedback(0.4)
`;

/**
 * Example 13: Distorted Industrial Lead
 * Aggressive, overdriven lead for harder styles
 */
export const example13_distLead = `
import { ms20distlead } from './ms20-patches.mjs';

note("c4 [<eb4 d4>!3 g4]".fast(2))
  .apply(ms20distlead)
  .distort(perlin.range(0.3, 0.6).slow(4))
  .crush(6) // Add bit crushing
`;

/**
 * Example 14: Self-Oscillating Filter Tones
 * Pure resonant filter tones
 */
export const example14_sine = `
import { ms20sine } from './ms20-patches.mjs';

note("<c5 e5 g5 b5>".slow(4))
  .apply(ms20sine)
  .resonance(sine.range(12, 18).slow(8)) // Modulate resonance
  .room(0.5) // Add space
`;

/**
 * Example 15: Pattern Technique - Accent Patterns
 * Using MS-20 bass with varied filter accents
 */
export const example15_accents = `
import { ms20pulsebass } from './ms20-patches.mjs';

note("c2!4".fast(4))
  .apply(ms20pulsebass)
  .lpenv("[2 2 4 2]".fast(4)) // Accent pattern
  .gain("[0.7 0.6 0.9 0.6]".fast(4)) // Velocity pattern
`;

/**
 * Example 16: Layered Bass Textures
 * Multiple MS-20 bass patches layered
 */
export const example16_layered = `
import { ms20bass, ms20fmbass, ms20sine } from './ms20-patches.mjs';

stack(
  note("c2 ~ eb2 ~").apply(ms20bass),
  note("c3 ~ eb3 ~").apply(ms20fmbass).gain(0.4),
  note("c2 ~ eb2 ~").apply(ms20sine).gain(0.3).lpf(400)
)
`;

/**
 * ARPEGGIO EXAMPLES
 * The MS-20 didn't have a built-in arpeggiator, but these examples
 * show how to create arpeggiated patterns using Strudel's pattern language
 * combined with the MS-20's characteristic aggressive sound.
 */

/**
 * Example 17: Classic Chord Arpeggio
 * Using .arp() to arpeggiate chord notes
 */
export const example17_chordArp = `
import { ms20lead } from './ms20-patches.mjs';

note("<[c4,e4,g4,c5] [a3,c4,e4,a4] [f3,a3,c4,f4] [g3,b3,d4,g4]>")
  .arp("0 1 2 3 2 1") // Up and down pattern
  .apply(ms20lead)
  .lpenv(sine.range(3, 6).slow(8)) // Modulate filter
  .slow(2)
`;

/**
 * Example 18: Fast Acid Arpeggio
 * TB-303 style sequence with MS-20 character
 */
export const example18_acidArp = `
import { ms20acid } from './ms20-patches.mjs';

note("c2 <eb2 [eb2 g2]> <f2 [f2 ab2]> <c2 [c2 g2]>".fast(2))
  .apply(ms20acid)
  .lpf(perlin.range(300, 1200).slow(4))
  .resonance(perlin.range(8, 12).slow(8))
  .sometimes(x => x.add(note(12))) // Octave jumps
`;

/**
 * Example 19: Euclidean Arpeggio Pattern
 * Rhythmic arpeggio using Euclidean patterns
 */
export const example19_euclideanArp = `
import { ms20bass } from './ms20-patches.mjs';

note("c2(5,8) eb2(3,8,1) g2(7,16,2) c3(4,8,3)")
  .stack(
    note("c2(5,8)").apply(ms20bass),
    note("c3(3,8,2)").apply(ms20bass).gain(0.6).lpenv(5)
  )
  .lpenv("<2 4 3 5>".slow(4))
`;

/**
 * Example 20: Offset Layered Arpeggio
 * Multiple time-shifted layers creating arpeggio effect
 */
export const example20_offsetArp = `
import { ms20pluck } from './ms20-patches.mjs';

note("<c4 a3 f3 g3>")
  .off(1/16, add(7))   // Add perfect fifth
  .off(1/8, add(12))   // Add octave
  .off(3/16, add(19))  // Add fifth + octave
  .apply(ms20pluck)
  .penv("12 18 24 18".slow(4))
  .delay(0.25)
`;

/**
 * Example 21: Gated Arpeggio Sequence
 * Short, gated notes with aggressive filter sweeps
 */
export const example21_gatedArp = `
import { ms20sync } from './ms20-patches.mjs';

note("[c5 g4 eb5 g4]*2".fast(2))
  .apply(ms20sync)
  .clip(0.3) // Short gate
  .lpenv(saw.range(2, 7).slow(8)) // Sweeping filter
  .gain("[1 0.7 0.9 0.6]*2".fast(2)) // Velocity variation
`;

/**
 * Example 22: Polyrhythmic Arpeggio
 * Multiple arpeggio patterns running at different speeds
 */
export const example22_polyArp = `
import { ms20lead, ms20bass } from './ms20-patches.mjs';

stack(
  // Fast high arpeggio
  note("c5 eb5 g5 bb5".fast(4))
    .apply(ms20lead)
    .gain(0.5)
    .lpenv(4),

  // Medium mid arpeggio
  note("c4 g4 eb4".fast(3))
    .apply(ms20lead)
    .gain(0.4)
    .lpenv(3),

  // Slow bass
  note("c2 ~ eb2 ~".fast(2))
    .apply(ms20bass)
    .lpenv(2)
)
`;

// Export all examples
export const ms20examples = {
  example1_classicBass,
  example2_acidBass,
  example3_lead,
  example4_sync,
  example5_pad,
  example6_pluck,
  example7_hats,
  example8_pwm,
  example9_fmbass,
  example10_riser,
  example11_fullTrack,
  example12_unison,
  example13_distLead,
  example14_sine,
  example15_accents,
  example16_layered,
  example17_chordArp,
  example18_acidArp,
  example19_euclideanArp,
  example20_offsetArp,
  example21_gatedArp,
  example22_polyArp,
};

/**
 * Quick Start Guide
 *
 * 1. Import a patch:
 *    import { ms20bass } from './ms20-patches.mjs';
 *
 * 2. Apply it to a note pattern:
 *    note("c2 eb2 g2 c3").apply(ms20bass)
 *
 * 3. Customize parameters:
 *    note("c2").apply(ms20bass).lpenv(4).resonance(10)
 *
 * 4. Combine multiple patches:
 *    stack(
 *      note("c2").apply(ms20bass),
 *      note("c5").apply(ms20lead)
 *    )
 */

/**
 * Parameter Customization Tips
 *
 * Key MS-20 parameters to experiment with:
 *
 * - lpf/hpf: Filter cutoff frequency
 * - resonance: Filter resonance (0-15, sweet spot 6-12)
 * - lpenv: Filter envelope depth (negative values invert)
 * - lpa/lpd/lps/lpr: Filter envelope timing
 * - ftype: "12db", "ladder", or "24db"
 * - vib/vibmod: Vibrato speed and depth
 * - fm/fmh: FM synthesis parameters
 * - distort: Overdrive amount
 * - pw/pwrate/pwsweep: Pulse width modulation
 * - penv: Pitch envelope depth
 */

/**
 * Arpeggio Techniques Guide
 *
 * The MS-20 didn't have a built-in arpeggiator, but Strudel provides
 * powerful pattern-based tools to create arpeggios. Here are the main approaches:
 *
 * ## 1. Chord Arpeggiation with .arp()
 * Break chords into individual notes by selecting indices:
 *
 *   note("[c,e,g]").arp("0 1 2")        // Up: C, E, G
 *   note("[c,e,g]").arp("2 1 0")        // Down: G, E, C
 *   note("[c,e,g]").arp("0 1 2 1")      // Up-Down: C, E, G, E
 *   note("[c,e,g]").arp("0 2 1 2")      // Custom pattern
 *
 * ## 2. Sequential Patterns
 * Use Strudel's mini-notation to create note sequences:
 *
 *   note("c3 e3 g3 c4")                 // Simple sequence
 *   note("c3 e3 g3 c4".fast(2))         // Double speed
 *   note("<c3 e3 g3 c4>")               // One note per cycle
 *   note("[c3 e3 g3 c4]*2")             // Repeat pattern twice
 *
 * ## 3. Time-Offset Layering with .off()
 * Create harmonized arpeggios by layering time-shifted copies:
 *
 *   note("c3").off(1/8, add(7))         // Add perfect fifth (7 semitones)
 *   note("c3").off(1/8, add(12))        // Add octave
 *   note("c3")
 *     .off(1/16, add(4))                // Add major third
 *     .off(1/8, add(7))                 // Add perfect fifth
 *
 * ## 4. Euclidean Rhythms
 * Create rhythmic arpeggio patterns using Euclidean distribution:
 *
 *   note("c3(5,8)")                     // 5 notes distributed over 8 steps
 *   note("c3(3,8) e3(5,8,2)")           // Multiple rhythms, second offset by 2
 *   note("c3(7,16,4)")                  // Dense pattern, offset by 4
 *
 * ## 5. Polyrhythmic Arpeggios
 * Stack multiple patterns at different speeds:
 *
 *   stack(
 *     note("c5 e5 g5".fast(4)),         // Fast high notes
 *     note("c4 g4".fast(3)),            // Medium mid notes
 *     note("c3 ~ ~ ~")                  // Slow bass note
 *   )
 *
 * ## 6. Gate Length Control
 * Adjust note duration for staccato or legato feel:
 *
 *   note("c3 e3 g3").clip(0.1)          // Very short (staccato)
 *   note("c3 e3 g3").clip(0.5)          // Half length
 *   note("c3 e3 g3").legato(1.2)        // Overlapping (legato)
 *
 * ## 7. Combining with MS-20 Filter Modulation
 * Arpeggios sound great with moving filters:
 *
 *   note("c3 e3 g3 c4")
 *     .apply(ms20bass)
 *     .lpenv(sine.range(2, 6).slow(4))  // Slow filter sweep
 *
 *   note("[c,e,g]").arp("0 1 2 1")
 *     .apply(ms20lead)
 *     .lpf(perlin.range(800, 2000))     // Random filter movement
 *
 * ## 8. Accent Patterns
 * Add dynamic variation to arpeggios:
 *
 *   note("c3 e3 g3 c4")
 *     .gain("[1 0.6 0.8 0.7]")          // Velocity accents
 *     .lpenv("[4 2 3 2]")               // Filter accents
 *
 * ## Common Arpeggio Patterns:
 * - Up:       "0 1 2 3"
 * - Down:     "3 2 1 0"
 * - Up-Down:  "0 1 2 3 2 1"
 * - Up-Up:    "0 1 2 3 3 4 5 6"
 * - Random:   Use .sometimes() or perlin for variation
 * - Gated:    Use .struct() or euclidean patterns
 */

// Export helper to print all example names
export const listExamples = () => {
  return Object.keys(ms20examples).map((key, index) =>
    `${index + 1}. ${key.replace('example', 'Example ').replace('_', ': ')}`
  );
};
