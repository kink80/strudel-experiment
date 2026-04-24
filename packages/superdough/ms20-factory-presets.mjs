/**
 * MS-20 Factory Presets for Strudel
 * Auto-generated from Korg MS-20 .fxp preset files.
 * Total: 292 presets across 4 banks.
 *
 * Usage:
 *   note("c2 eb2 g2").apply(ms20_acid_bass)
 *   note("c4").apply(ms20_ring_mod_bell).lpfcutoff(2000)
 */

export const ms20_n5th_vocoder_pad = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333).vco1pw(0.206)
  .vco2wave("tri").vco2level(0.5).vco2tune(-3.36)
  .noiselevel(0.61)
  .ringmod(0.67)
  .hpfcutoff(2715.5).hpfpeak(0.29).hpfenv(-7.68).hpfmg(0.15)
  .lpfcutoff(6622.6).lpfpeak(0.0).lpfenv(-0.32).lpfmg(0.32)
  .drive(1.5)
  .eg1attack(10.0).eg1release(10.0).eg1rev(1)
  .eg2attack(0.0069).eg2decay(0.0229).eg2sustain(0.83).eg2release(0.001)
  .mgfreq(0.57).mgwave("saw")
  .pitcheg(6.96)
  .portamento(2.925)
  .modmatrix([{src:18, dst:6}, {src:9, dst:15}, {src:29, dst:3}, {src:14, dst:27}, {src:12, dst:1}, {src:5, dst:16}])
  .gain(0.6);

export const ms20_a_little_flutter = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.49).vco2tune(-12.0)
  .noiselevel(0.651)
  .hpfcutoff(668.1).hpfpeak(0.492).hpfenv(-3.68)
  .lpfcutoff(87.9).lpfpeak(0.619).lpfenv(0.32)
  .drive(1.5)
  .eg1attack(3.105).eg1release(0.001).eg1rev(1)
  .eg2attack(0.7743).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(1.28).mgwave("saw")
  .pitcheg(14.48)
  .portamento(0.079)
  .modmatrix([{src:6, dst:0}, {src:21, dst:10}])
  .gain(0.6);

export const ms20_acid_bass = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-0.6)
  .noiselevel(1.0)
  .hpfcutoff(297.1).hpfpeak(0.615).hpfenv(-4.8)
  .lpfcutoff(240.5).lpfpeak(0.785)
  .drive(1.5)
  .eg1attack(0.0501).eg1release(0.0052).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .modmatrix([{src:0, dst:27}])
  .gain(0.6);

export const ms20_analog_bass = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.333)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.85)
  .hpfcutoff(101.0).hpfpeak(0.41).hpfenv(-4.8)
  .lpfcutoff(20).lpfpeak(0.7)
  .drive(1.5)
  .eg1attack(0.0263).eg1release(0.0251).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.44).mgwave("tri")
  .portamento(0.01)
  .modmatrix([{src:14, dst:27}, {src:1, dst:12}, {src:0, dst:16}])
  .gain(0.6);

export const ms20_analog_guitar = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.333)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.97)
  .ringmod(0.027)
  .hpfcutoff(125.3).hpfpeak(0.0).hpfenv(-2.32)
  .lpfcutoff(339.6).lpfpeak(0.73).lpfenv(1.84)
  .drive(1.5)
  .eg1attack(0.5012).eg1release(0.0046).eg1rev(1)
  .eg2attack(0.024).eg2decay(10.0).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .pitcheg(2.76)
  .modmatrix([{src:5, dst:16}, {src:0, dst:11}, {src:14, dst:27}, {src:1, dst:12}])
  .gain(0.6);

export const ms20_arpeggio_pad = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1level(0.333).vco1pw(0.363)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.49).vco2tune(-12.0)
  .noiselevel(0.9)
  .hpfcutoff(214.9).hpfpeak(0.27).hpfenv(-1.76)
  .lpfcutoff(4375.5).lpfpeak(0.74).lpfenv(7.84)
  .drive(1.5)
  .eg1attack(4.3652).eg1release(0.0398).eg1rev(1)
  .eg2attack(1.0965).eg2decay(0.0158).eg2sustain(1.0).eg2release(0.1)
  .mgfreq(0.61).mgwave("saw")
  .pitcheg(7.2)
  .portamento(0.083)
  .modmatrix([{src:34, dst:18}, {src:4, dst:6}, {src:2, dst:19}, {src:3, dst:7}, {src:10, dst:0}])
  .gain(0.6);

export const ms20_ayyayy = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1level(0.0)
  .vco2wave("square").vco2scale(0.5).vco2level(0.49).vco2tune(-12.0)
  .noiselevel(0.802)
  .hpfcutoff(2112.7).hpfpeak(0.56).hpfenv(-5.33)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-3.43)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0).eg1rev(1)
  .eg2attack(0.0694).eg2decay(0.0016).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(1.13).mgwave("saw")
  .portamento(0.079)
  .modmatrix([{src:9, dst:8}, {src:23, dst:3}])
  .gain(0.6);

export const ms20_bpf_air_stab = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.0)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.49).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(1499.8).hpfpeak(0.15).hpfenv(-7.84)
  .lpfcutoff(20).lpfpeak(0.65).lpfmg(0.61)
  .drive(1.5)
  .eg1attack(0.0025).eg1release(1.0).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.0044).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.54).mgwave("saw")
  .portamento(0.083)
  .modmatrix([{src:2, dst:19}, {src:4, dst:32}, {src:12, dst:7}, {src:16, dst:17}, {src:14, dst:11}, {src:13, dst:10}, {src:3, dst:23}, {src:9, dst:8}])
  .gain(0.6);

export const ms20_baff_base = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0)
  .vco2wave("sine").vco2scale(0.25).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(66.8).hpfpeak(0.183)
  .lpfcutoff(20).lpfpeak(0.611)
  .drive(1.5)
  .eg1attack(0.0072).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0016).eg2decay(0.009).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.37).mgwave("tri")
  .portamento(2.937)
  .modmatrix([{src:21, dst:10}, {src:32, dst:3}, {src:9, dst:8}])
  .gain(0.6);

export const ms20_band_pass_pad = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0).vco1pw(0.333)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.62)
  .hpfcutoff(1027.9).hpfpeak(0.0).hpfenv(-8.0)
  .lpfcutoff(20000.0).lpfpeak(0.0).lpfenv(0.08)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0)
  .eg2attack(0.3311).eg2decay(0.004).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.52).mgwave("saw")
  .portamento(0.104)
  .modmatrix([{src:15, dst:9}, {src:23, dst:3}])
  .gain(0.6);

export const ms20_bend_pwm_lead = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.333)
  .vco2wave("sine").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.92)
  .ringmod(0.4)
  .hpfcutoff(13707.8).hpfpeak(0.32).hpfenv(-7.84)
  .lpfcutoff(20).lpfpeak(0.65).lpfmg(0.17)
  .drive(1.5)
  .eg1attack(0.0021).eg1release(1.7378).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.27).mgwave("tri")
  .pitcheg(5.52)
  .portamento(0.017)
  .modmatrix([{src:18, dst:33}, {src:10, dst:5}])
  .gain(0.6);

export const ms20_boost_bass = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.0)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.75)
  .hpfcutoff(20000.0).hpfpeak(0.0).hpfenv(-0.64)
  .lpfcutoff(20).lpfpeak(0.0)
  .drive(1.5)
  .eg1attack(10.0).eg1release(10.0).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .modmatrix([{src:16, dst:5}, {src:9, dst:29}, {src:11, dst:12}, {src:14, dst:22}, {src:10, dst:21}])
  .gain(0.6);

export const ms20_broken_sync_lead = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.667)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-0.24)
  .noiselevel(0.94)
  .hpfcutoff(15270.1).hpfpeak(0.48).hpfenv(-1.44).hpfmg(0.53)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-0.32).lpfmg(0.5)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0).eg1rev(1)
  .eg2attack(0.001).eg2decay(10.0).eg2sustain(1.0).eg2release(0.7656)
  .mgfreq(0.44).mgwave("tri")
  .pitcheg(3.12)
  .modmatrix([{src:3, dst:29}, {src:24, dst:20}, {src:12, dst:1}, {src:0, dst:16}])
  .gain(0.6);

export const ms20_chill_detune = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0).vco1pw(0.054)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.655)
  .hpfcutoff(266.7).hpfpeak(0.45).hpfenv(-2.8)
  .lpfcutoff(20).lpfpeak(0.815)
  .drive(1.5)
  .eg1attack(2.1878).eg1release(0.003).eg1rev(1)
  .eg2attack(0.631).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .pitcheg(15.36)
  .portamento(0.042)
  .modmatrix([{src:21, dst:10}, {src:12, dst:1}, {src:14, dst:27}, {src:0, dst:16}])
  .gain(0.6);

export const ms20_cyber_rev_bass = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.0).vco1pw(0.358)
  .vco2wave("saw").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(457.5).hpfpeak(0.0).hpfenv(-4.8)
  .lpfcutoff(20).lpfpeak(0.69)
  .drive(1.5)
  .eg1attack(0.0501).eg1release(0.0014).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.75).mgwave("tri")
  .portamento(0.125)
  .modmatrix([{src:10, dst:21}])
  .gain(0.6);

export const ms20_darkside_x_bass = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.333)
  .vco2wave("sine").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.99)
  .ringmod(0.515)
  .hpfcutoff(1499.8).hpfpeak(0.405).hpfenv(-7.92)
  .lpfcutoff(514.1).lpfpeak(0.445).lpfmg(0.04)
  .drive(1.5)
  .eg1attack(0.1995).eg1release(10.0).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.0023).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.13).mgwave("tri")
  .portamento(0.183)
  .modmatrix([{src:5, dst:11}, {src:3, dst:30}, {src:9, dst:8}])
  .gain(0.6);

export const ms20_deep_synth_bass = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.0)
  .vco2wave("square").vco2scale(0.25).vco2level(0.49).vco2tune(-12.0)
  .noiselevel(0.71)
  .ringmod(0.21)
  .hpfcutoff(252.7).hpfpeak(0.5).hpfenv(-3.36)
  .lpfcutoff(20).lpfpeak(0.69).lpfmg(0.47)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.1318).eg2sustain(0.32).eg2release(0.001)
  .mgfreq(2.1).mgwave("tri")
  .modmatrix([{src:3, dst:29}, {src:9, dst:15}, {src:14, dst:27}, {src:12, dst:1}, {src:17, dst:16}, {src:23, dst:5}, {src:21, dst:10}])
  .gain(0.6);

export const ms20_disco_bass = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.333)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.4)
  .hpfcutoff(239.4).hpfpeak(0.34).hpfenv(-4.8)
  .lpfcutoff(158.9).lpfpeak(1.0).lpfmg(0.03)
  .drive(1.5)
  .eg1attack(0.0251).eg1release(0.1445).eg1rev(1)
  .eg2attack(0.0016).eg2decay(0.01).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.88).mgwave("tri")
  .pitcheg(0.96)
  .portamento(0.042)
  .modmatrix([{src:11, dst:0}, {src:9, dst:8}, {src:29, dst:3}])
  .gain(0.6);

export const ms20_drive_squ_bass = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.333)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-6.6)
  .noiselevel(1.0)
  .hpfcutoff(313.6).hpfpeak(0.3).hpfenv(-4.8)
  .lpfcutoff(295.8).lpfpeak(0.805)
  .drive(1.5)
  .eg1attack(0.0501).eg1release(0.0052).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .modmatrix([{src:0, dst:27}])
  .gain(0.6);

export const ms20_elektrash = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.91)
  .ringmod(0.4)
  .hpfcutoff(20000.0).hpfpeak(0.4).hpfenv(-6.08)
  .lpfcutoff(20).lpfpeak(0.41)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(1.36).mgwave("tri")
  .pitcheg(9.84)
  .portamento(2.083)
  .modmatrix([{src:5, dst:6}])
  .gain(0.6);

export const ms20_euphoric_stab = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.333)
  .vco2wave("tri").vco2level(0.505).vco2tune(-12.0)
  .noiselevel(0.91)
  .hpfcutoff(20000.0).hpfpeak(0.14).hpfenv(-0.64)
  .lpfcutoff(20).lpfpeak(0.22).lpfmg(0.21)
  .drive(1.5)
  .eg1attack(0.0091).eg1release(0.631).eg1rev(1)
  .eg2attack(0.0021).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(5.34).mgwave("sine")
  .pitcheg(4.56)
  .modmatrix([{src:17, dst:11}])
  .gain(0.6);

export const ms20_fb_dist_lead = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.5).vco1level(0.0)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-5.28)
  .noiselevel(0.975)
  .ringmod(0.09)
  .hpfcutoff(828.4).hpfpeak(0.0).hpfenv(-3.12)
  .lpfcutoff(20).lpfpeak(1.0).lpfenv(0.08)
  .drive(1.5)
  .eg1attack(0.4169).eg1release(1.8197).eg1rev(1)
  .eg2attack(0.0229).eg2decay(0.006).eg2sustain(1.0).eg2release(0.001)
  .modmatrix([{src:3, dst:29}, {src:12, dst:1}, {src:14, dst:27}, {src:5, dst:16}, {src:9, dst:15}])
  .gain(0.6);

export const ms20_hard_unison_lead = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.52).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.69)
  .hpfcutoff(10466.0).hpfpeak(0.02).hpfenv(-8.0)
  .lpfcutoff(339.6).lpfpeak(0.0).lpfmg(0.1)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(4.71).mgwave("tri")
  .modmatrix([{src:13, dst:27}])
  .gain(0.6);

export const ms20_heaven_motion = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333)
  .vco2wave("tri").vco2scale(2.0).vco2level(0.5).vco2tune(-0.96)
  .noiselevel(0.5)
  .hpfcutoff(155.5).hpfpeak(0.59).hpfenv(-4.8)
  .lpfcutoff(20).lpfpeak(0.975).lpfenv(-8.0)
  .drive(1.5)
  .eg1attack(2.5119).eg1release(0.0166).eg1rev(1)
  .eg2attack(0.6918).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .portamento(0.042)
  .modmatrix([{src:13, dst:22}])
  .gain(0.6);

export const ms20_hoover_uni_bass = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0).vco1pw(0.461)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(8901.6).hpfpeak(0.075).hpfenv(-8.0)
  .lpfcutoff(23.0).lpfpeak(0.0)
  .drive(1.5)
  .eg1attack(0.5248).eg1release(0.001).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(1.69).mgwave("tri")
  .portamento(0.333)
  .modmatrix([{src:10, dst:21}])
  .gain(0.6);

export const ms20_howling_dog = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0).vco1pw(0.072)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-1.14)
  .noiselevel(0.76)
  .hpfcutoff(349.3).hpfpeak(0.65)
  .lpfcutoff(20).lpfpeak(0.59)
  .drive(1.5)
  .eg1attack(0.3465).eg1release(0.001).eg1rev(1)
  .eg2attack(0.005).eg2decay(1.0).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(1.74).mgwave("saw")
  .modmatrix([{src:29, dst:3}, {src:9, dst:8}, {src:21, dst:10}])
  .gain(0.6);

export const ms20_human_choir = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.333).vco1pw(0.206)
  .vco2wave("tri").vco2level(0.49).vco2tune(1.92)
  .noiselevel(0.42)
  .ringmod(0.025)
  .hpfcutoff(1861.1).hpfpeak(0.32).hpfenv(-0.96).hpfmg(0.51)
  .lpfcutoff(20).lpfpeak(0.0).lpfmg(0.48)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0).eg1rev(1)
  .eg2attack(0.01).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .pitcheg(9.12)
  .portamento(0.083)
  .modmatrix([{src:12, dst:1}, {src:5, dst:16}, {src:0, dst:27}, {src:21, dst:10}])
  .gain(0.6);

export const ms20_inner_cmt = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.25).vco1level(1.0)
  .vco2wave("square").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.59)
  .ringmod(0.49)
  .hpfcutoff(1964.3).hpfpeak(0.87).hpfenv(-7.52).hpfmg(0.35)
  .lpfcutoff(20).lpfpeak(0.71).lpfenv(-5.44)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0)
  .eg2attack(0.3631).eg2decay(0.1).eg2sustain(0.41).eg2release(0.1202)
  .mgfreq(50.0).mgwave("tri")
  .pitcheg(13.68)
  .pitchmg(3.84)
  .portamento(1.083)
  .modmatrix([{src:18, dst:34}, {src:17, dst:10}, {src:16, dst:3}, {src:28, dst:5}, {src:6, dst:14}, {src:11, dst:13}, {src:12, dst:19}])
  .gain(0.6);

export const ms20_klash_pwm_bass = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.0)
  .vco2wave("tri").vco2scale(0.25).vco2level(0.495).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(118.7).hpfpeak(0.0).hpfenv(-7.84)
  .lpfcutoff(726.2).lpfpeak(0.96).lpfmg(0.01)
  .drive(1.5)
  .eg1attack(0.0331).eg1release(0.0145).eg1rev(1)
  .eg2attack(0.0251).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.42).mgwave("tri")
  .pitcheg(7.92)
  .modmatrix([{src:0, dst:11}])
  .gain(0.6);

export const ms20_ms_motion_pad = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.667)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.51)
  .hpfcutoff(743.6).hpfpeak(0.56).hpfenv(-4.8)
  .lpfcutoff(257.6).lpfpeak(0.775).lpfenv(-7.84)
  .drive(1.5)
  .eg1attack(2.5119).eg1release(1.2023).eg1rev(1)
  .eg2attack(0.2512).eg2decay(10.0).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.69).mgwave("tri")
  .portamento(2.917)
  .modmatrix([{src:19, dst:2}, {src:12, dst:23}, {src:1, dst:14}, {src:6, dst:3}, {src:9, dst:16}, {src:7, dst:17}, {src:4, dst:15}])
  .gain(0.6);

export const ms20_ms_percussion = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(2.0).vco1level(1.0)
  .vco2wave("sine").vco2scale(2.0).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.74)
  .hpfcutoff(874.3).hpfpeak(0.0).hpfenv(-4.8)
  .lpfcutoff(20000.0).lpfpeak(1.0).lpfmg(0.04)
  .drive(1.5)
  .eg1attack(0.0331).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0251).eg2decay(0.0016).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .pitcheg(8.4)
  .modmatrix([{src:3, dst:10}, {src:13, dst:27}, {src:0, dst:28}, {src:23, dst:12}, {src:14, dst:11}, {src:9, dst:16}])
  .gain(0.6);

export const ms20_ms_poly_stab = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.86)
  .hpfcutoff(20000.0).hpfpeak(0.36).hpfenv(-4.8)
  .lpfcutoff(20).lpfpeak(1.0)
  .drive(1.5)
  .eg1attack(0.0052).eg1release(0.631).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .portamento(0.083)
  .gain(0.6);

export const ms20_masterblastermw = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.485).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.103)
  .hpfcutoff(1275.6).hpfpeak(0.0)
  .lpfcutoff(20).lpfpeak(0.0).lpfmg(0.024)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0).eg1rev(1)
  .eg2attack(0.0083).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(2.69).mgwave("saw")
  .pitcheg(24.0)
  .portamento(0.159)
  .modmatrix([{src:11, dst:5}])
  .gain(0.6);

export const ms20_morphing_arpline = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.333)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(668.1).hpfpeak(0.143)
  .lpfcutoff(2697.9).lpfpeak(0.524)
  .drive(1.5)
  .eg1attack(0.0481).eg1release(0.001).eg1rev(1)
  .eg2attack(0.1795).eg2decay(0.0083).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .gain(0.6);

export const ms20_noise_snap = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(2.0).vco1level(0.333)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.71)
  .hpfcutoff(2309.6).hpfpeak(0.66).hpfenv(7.52)
  .lpfcutoff(20).lpfpeak(0.52).lpfenv(-8.0)
  .drive(1.5)
  .eg1attack(0.0145).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0166).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .pitchmg(1.2)
  .portamento(0.01)
  .modmatrix([{src:14, dst:27}, {src:17, dst:16}, {src:1, dst:12}])
  .gain(0.6);

export const ms20_nu_skool_bass = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.25).vco1level(0.333)
  .vco2wave("sine").vco2level(0.5).vco2tune(-12.0)
  .ringmod(0.655)
  .hpfcutoff(173.2).hpfpeak(0.28).hpfenv(-4.8)
  .lpfcutoff(20).lpfpeak(1.0).lpfmg(0.19)
  .drive(1.5)
  .eg1attack(0.0347).eg1release(0.0525).eg1rev(1)
  .eg2attack(0.006).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .pitcheg(6.72)
  .modmatrix([{src:11, dst:5}])
  .gain(0.6);

export const ms20_organ_bass = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.667)
  .vco2wave("saw").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.895)
  .hpfcutoff(164.1).hpfpeak(0.315).hpfenv(-4.8)
  .lpfcutoff(677.7).lpfpeak(0.535).lpfmg(0.505)
  .drive(1.5)
  .eg1attack(0.0023).eg1release(0.0912).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.19).mgwave("tri")
  .pitcheg(1.44)
  .modmatrix([{src:0, dst:11}])
  .gain(0.6);

export const ms20_pwm_lead = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.333)
  .vco2wave("sine").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.1)
  .ringmod(0.05)
  .hpfcutoff(17010.5).hpfpeak(0.2).hpfenv(-1.28)
  .lpfcutoff(20).lpfpeak(0.0).lpfmg(0.33)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0).eg1rev(1)
  .eg2attack(0.0021).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .pitcheg(2.88)
  .portamento(0.008)
  .modmatrix([{src:12, dst:1}, {src:18, dst:33}, {src:10, dst:14}, {src:5, dst:16}])
  .gain(0.6);

export const ms20_pwm_sweep_pad = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.333).vco1pw(0.784)
  .vco2wave("tri").vco2level(0.51).vco2tune(-12.0)
  .noiselevel(0.84)
  .hpfcutoff(20000.0).hpfpeak(0.23).hpfenv(-4.8)
  .lpfcutoff(20).lpfpeak(0.0)
  .drive(1.5)
  .eg1attack(2.0893).eg1release(0.001).eg1rev(1)
  .eg2attack(0.7586).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .pitcheg(13.44)
  .modmatrix([{src:21, dst:10}, {src:14, dst:27}, {src:12, dst:1}, {src:0, dst:22}, {src:13, dst:16}])
  .gain(0.6);

export const ms20_plink_chord = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333).vco1pw(0.598)
  .vco2wave("tri").vco2level(0.45).vco2tune(-12.0)
  .noiselevel(0.55)
  .hpfcutoff(8901.6).hpfpeak(0.48).hpfenv(3.68)
  .lpfcutoff(654.7).lpfpeak(1.0).lpfmg(0.06)
  .drive(1.5)
  .eg1attack(3.02).eg1release(0.0072).eg1rev(1)
  .eg2attack(0.0021).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(1.2).mgwave("tri")
  .pitcheg(0.72)
  .portamento(1.346)
  .modmatrix([{src:0, dst:6}, {src:10, dst:21}, {src:17, dst:22}])
  .gain(0.6);

export const ms20_pulse_pad = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0).vco1pw(0.569)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.667)
  .ringmod(1.0)
  .hpfcutoff(1421.0).hpfpeak(0.341).hpfenv(-3.05)
  .lpfcutoff(20).lpfpeak(0.35).lpfenv(4.95)
  .drive(1.5)
  .eg1attack(0.4786).eg1release(0.011).eg1rev(1)
  .eg2attack(0.0334).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .pitcheg(6.29)
  .portamento(2.917)
  .modmatrix([{src:6, dst:0}, {src:22, dst:17}, {src:21, dst:10}, {src:14, dst:27}, {src:5, dst:16}, {src:19, dst:12}])
  .gain(0.6);

export const ms20_resonance_piano = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.0).vco1pw(0.02)
  .vco2wave("saw").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.46)
  .hpfcutoff(226.8).hpfpeak(0.21)
  .lpfcutoff(514.1).lpfpeak(0.61).lpfmg(0.08)
  .drive(1.5)
  .eg1attack(0.5754).eg1release(0.0033).eg1rev(1)
  .eg2attack(0.003).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.5).mgwave("saw")
  .pitcheg(6.24)
  .portamento(0.042)
  .modmatrix([{src:0, dst:11}, {src:14, dst:27}, {src:5, dst:16}, {src:12, dst:6}])
  .gain(0.6);

export const ms20_retro_strings = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1level(0.333).vco1pw(0.265)
  .vco2wave("tri").vco2level(0.51).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.02)
  .hpfcutoff(12987.6).hpfpeak(0.12).hpfenv(-2.56).hpfmg(0.09)
  .lpfcutoff(20).lpfpeak(0.0).lpfmg(0.2)
  .drive(1.5)
  .eg1attack(0.0229).eg1release(0.631).eg1rev(1)
  .eg2attack(0.0759).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.88).mgwave("saw")
  .pitcheg(16.8)
  .modmatrix([{src:5, dst:16}, {src:12, dst:22}, {src:14, dst:11}])
  .gain(0.6);

export const ms20_ring_mod_bell = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.667)
  .vco2wave("sine").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.175)
  .hpfcutoff(1145.1).hpfpeak(0.565).hpfenv(-2.88)
  .lpfcutoff(20).lpfpeak(0.0)
  .drive(1.5)
  .eg1attack(0.0182).eg1release(2.2909).eg1rev(1)
  .eg2attack(0.5754).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(1.03).mgwave("saw")
  .portamento(4.083)
  .modmatrix([{src:0, dst:16}, {src:14, dst:27}, {src:1, dst:12}])
  .gain(0.6);

export const ms20_ring_mod_fall = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.25).vco1level(0.333)
  .vco2wave("sine").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .ringmod(0.78)
  .hpfcutoff(20000.0).hpfpeak(0.0).hpfenv(-1.28)
  .lpfcutoff(20).lpfpeak(0.0)
  .drive(1.5)
  .eg1attack(1.0).eg1release(0.001).eg1rev(1)
  .eg2attack(0.912).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(4.16).mgwave("tri")
  .portamento(5.0)
  .modmatrix([{src:12, dst:6}, {src:14, dst:27}, {src:5, dst:16}, {src:13, dst:22}])
  .gain(0.6);

export const ms20_s_h_poly_comp = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.69)
  .hpfcutoff(973.9).hpfpeak(0.48).hpfenv(-7.6)
  .lpfcutoff(133.7).lpfpeak(0.99).lpfmg(0.065)
  .drive(1.5)
  .eg1attack(0.0095).eg1release(0.2188).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.49).mgwave("saw")
  .portamento(0.083)
  .modmatrix([{src:2, dst:19}, {src:4, dst:32}, {src:7, dst:17}])
  .gain(0.6);

export const ms20_sample_hold = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.333)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(20000.0).hpfpeak(0.67).hpfenv(2.56)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(8.0)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0).eg1rev(1)
  .eg2attack(0.0575).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .modmatrix([{src:19, dst:2}, {src:0, dst:7}, {src:4, dst:6}])
  .gain(0.6);

export const ms20_simple_sq_bass = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.0)
  .vco2wave("tri").vco2scale(0.25).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.83)
  .hpfcutoff(106.6).hpfpeak(0.28)
  .lpfcutoff(20).lpfpeak(0.77)
  .drive(1.5)
  .eg1attack(0.1).eg1release(0.001).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.27).mgwave("tri")
  .modmatrix([{src:21, dst:10}])
  .gain(0.6);

export const ms20_snake_lead_bass = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.5).vco1level(0.333)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.455)
  .ringmod(0.3)
  .hpfcutoff(331.0).hpfpeak(0.645).hpfenv(-8.0)
  .lpfcutoff(1845.1).lpfpeak(0.65).lpfenv(1.84)
  .drive(1.5)
  .eg1attack(0.182).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0017).eg2decay(10.0).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(1.91).mgwave("tri")
  .portamento(0.125)
  .modmatrix([{src:23, dst:5}, {src:9, dst:22}, {src:10, dst:21}])
  .gain(0.6);

export const ms20_solid_bass = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.333)
  .vco2wave("sine").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.415)
  .hpfcutoff(182.8).hpfpeak(0.22).hpfenv(-4.8)
  .lpfcutoff(20).lpfpeak(0.75)
  .drive(1.5)
  .eg1attack(0.0302).eg1release(0.0209).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.25).mgwave("tri")
  .portamento(2.917)
  .modmatrix([{src:1, dst:12}, {src:21, dst:10}, {src:0, dst:16}, {src:14, dst:27}])
  .gain(0.6);

export const ms20_solo_trumpet = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(2.0).vco1level(0.333).vco1pw(0.108)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.09)
  .ringmod(0.024)
  .hpfcutoff(973.9).hpfpeak(0.02).hpfenv(-2.4).hpfmg(0.12)
  .lpfcutoff(20).lpfpeak(1.0).lpfenv(3.04).lpfmg(0.05)
  .drive(1.5)
  .eg1attack(0.0479).eg1release(0.2089).eg1rev(1)
  .eg2attack(0.0044).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .pitcheg(9.36)
  .modmatrix([{src:0, dst:19}, {src:14, dst:27}, {src:12, dst:1}, {src:16, dst:5}])
  .gain(0.6);

export const ms20_steganography = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.333)
  .vco2wave("saw").vco2level(0.49).vco2tune(-12.0)
  .noiselevel(0.27)
  .ringmod(1.0)
  .hpfcutoff(349.3).hpfpeak(0.58).hpfenv(1.12)
  .lpfcutoff(2697.9).lpfpeak(0.0)
  .drive(1.5)
  .eg1attack(2.2909).eg1release(0.0398).eg1rev(1)
  .eg2attack(0.631).eg2decay(0.0912).eg2sustain(1.0).eg2release(0.001).eg2rev(1)
  .mgfreq(0.83).mgwave("saw")
  .portamento(0.083)
  .modmatrix([{src:3, dst:19}, {src:13, dst:22}, {src:14, dst:27}, {src:5, dst:16}, {src:6, dst:12}, {src:2, dst:34}, {src:0, dst:7}, {src:4, dst:1}])
  .gain(0.6);

export const ms20_surfin_lead = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(1.0)
  .vco2wave("sine").vco2scale(0.5).vco2level(0.5).vco2tune(-6.24)
  .ringmod(1.0)
  .hpfcutoff(20000.0).hpfpeak(0.0).hpfenv(-7.84)
  .lpfcutoff(20).lpfpeak(0.0)
  .drive(1.5)
  .eg1attack(0.0028).eg1release(1.0).eg1rev(1)
  .eg2attack(0.0012).eg2decay(10.0).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(1.13).mgwave("tri")
  .portamento(1.608)
  .modmatrix([{src:13, dst:27}, {src:14, dst:11}, {src:23, dst:12}, {src:0, dst:16}])
  .gain(0.6);

export const ms20_synthetic_snore = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0)
  .vco2wave("tri").vco2scale(0.25).vco2level(0.5).vco2tune(-2.16)
  .noiselevel(1.0)
  .ringmod(0.89)
  .hpfcutoff(2866.0).hpfpeak(0.73).hpfenv(-7.92)
  .lpfcutoff(7096.3).lpfpeak(0.42).lpfenv(-0.16).lpfmg(0.22)
  .drive(1.5)
  .eg1attack(10.0).eg1release(10.0).eg1rev(1)
  .eg2attack(0.0832).eg2decay(0.0132).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(1.64).mgwave("tri")
  .pitcheg(3.12)
  .portamento(1.583)
  .modmatrix([{src:15, dst:9}, {src:18, dst:6}, {src:29, dst:3}, {src:20, dst:12}, {src:16, dst:5}, {src:28, dst:13}, {src:17, dst:27}])
  .gain(0.6);

export const ms20_technostress = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0)
  .vco2wave("saw").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .hpfcutoff(368.7).hpfpeak(0.32).hpfenv(-5.79)
  .lpfcutoff(20).lpfpeak(0.47)
  .drive(1.5)
  .eg1attack(10.0).eg1release(10.0).eg1rev(1)
  .eg2attack(0.003).eg2decay(3.9811).eg2sustain(1.0).eg2release(0.001).eg2rev(1)
  .mgfreq(0.65).mgwave("tri")
  .pitcheg(7.68)
  .modmatrix([{src:10, dst:17}, {src:13, dst:27}, {src:34, dst:18}, {src:3, dst:1}, {src:23, dst:12}, {src:9, dst:16}])
  .gain(0.6);

export const ms20_terrible_intro = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.5).vco1level(0.0)
  .vco2wave("sine").vco2scale(0.25).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(1.0)
  .hpfcutoff(4658.2).hpfpeak(0.61).hpfenv(-8.0)
  .lpfcutoff(1025.7).lpfpeak(0.48).lpfenv(0.24).lpfmg(1.0)
  .drive(1.5)
  .eg1attack(0.631).eg1release(0.0457).eg1rev(1)
  .eg2attack(0.0058).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.91).mgwave("tri")
  .pitcheg(8.88)
  .portamento(0.125)
  .modmatrix([{src:5, dst:11}, {src:9, dst:30}, {src:10, dst:17}])
  .gain(0.6);

export const ms20_tine_piano = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(1.0)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(164.1).hpfpeak(0.15).hpfenv(-4.8)
  .lpfcutoff(654.7).lpfpeak(0.68).lpfmg(0.2)
  .drive(1.5)
  .eg1attack(0.7244).eg1release(0.0115).eg1rev(1)
  .eg2attack(0.0095).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .pitcheg(4.56)
  .portamento(4.533)
  .modmatrix([{src:0, dst:11}, {src:1, dst:13}])
  .gain(0.6);

export const ms20_turnback_pizz = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1level(0.333)
  .vco2wave("tri").vco2level(0.49).vco2tune(-12.0)
  .noiselevel(0.84)
  .ringmod(0.08)
  .hpfcutoff(349.3).hpfpeak(0.23).hpfenv(-0.8).hpfmg(0.63)
  .lpfcutoff(20000.0).lpfpeak(1.0).lpfmg(0.86)
  .drive(1.5)
  .eg1attack(0.0033).eg1release(0.0437).eg1rev(1)
  .eg2attack(0.0036).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(1.06).mgwave("saw")
  .pitcheg(5.76)
  .portamento(0.083)
  .modmatrix([{src:0, dst:10}, {src:9, dst:29}, {src:14, dst:27}, {src:12, dst:1}, {src:5, dst:16}])
  .gain(0.6);

export const ms20_velocity_kick = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(2.0).vco1level(0.0)
  .vco2wave("tri").vco2scale(0.25).vco2level(0.5).vco2tune(-12.0)
  .hpfcutoff(85.9).hpfpeak(0.0).hpfenv(-4.8)
  .lpfcutoff(20).lpfpeak(0.615)
  .drive(1.5)
  .eg1attack(0.0251).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0251).eg2decay(7.5858).eg2sustain(0.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .pitchmg(2.76)
  .modmatrix([{src:0, dst:31}, {src:9, dst:30}])
  .gain(0.6);

export const ms20_vintage_mw_lead = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(1.0).vco1pw(0.02)
  .vco2wave("tri").vco2level(0.5).vco2tune(-2.16)
  .noiselevel(0.5)
  .hpfcutoff(331.0).hpfpeak(0.435).hpfenv(-2.32).hpfmg(0.56)
  .lpfcutoff(20).lpfpeak(0.08).lpfmg(0.47)
  .drive(1.5)
  .eg1attack(0.0331).eg1release(4.1687).eg1rev(1)
  .eg2attack(0.0013).eg2decay(0.0076).eg2sustain(0.63).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .modmatrix([{src:0, dst:16}, {src:1, dst:12}])
  .gain(0.6);

export const ms20_voco_motion = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1level(0.333).vco1pw(0.27)
  .vco2wave("square").vco2level(0.5).vco2tune(-1.8)
  .noiselevel(0.4)
  .ringmod(0.5)
  .hpfcutoff(1084.9).hpfpeak(0.5).hpfenv(-7.84)
  .lpfcutoff(20).lpfpeak(0.4).lpfenv(-3.04).lpfmg(0.575)
  .drive(1.5)
  .eg1attack(0.038).eg1release(0.631).eg1rev(1)
  .eg2attack(0.0115).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .pitcheg(13.8)
  .portamento(0.083)
  .modmatrix([{src:11, dst:17}, {src:14, dst:27}, {src:5, dst:16}, {src:6, dst:18}, {src:1, dst:12}])
  .gain(0.6);

export const ms20_whirlwind_pad = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.333).vco1pw(0.735)
  .vco2wave("tri").vco2level(0.493).vco2tune(-4.8)
  .noiselevel(0.61)
  .ringmod(0.1)
  .hpfcutoff(349.3).hpfpeak(0.13).hpfenv(-1.6)
  .lpfcutoff(20).lpfpeak(0.6)
  .drive(1.5)
  .eg1attack(1.7378).eg1release(0.0191).eg1rev(1)
  .eg2attack(0.1738).eg2decay(0.003).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.94).mgwave("saw")
  .pitcheg(12.0)
  .portamento(0.058)
  .modmatrix([{src:13, dst:22}, {src:21, dst:10}, {src:14, dst:27}, {src:12, dst:1}, {src:5, dst:16}])
  .gain(0.6);

export const ms20_wobble_synth = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.0)
  .vco2wave("sine").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .ringmod(0.516)
  .hpfcutoff(1094.3).hpfpeak(0.746)
  .lpfcutoff(20).lpfpeak(0.254)
  .drive(1.5)
  .eg1attack(0.005).eg1release(0.1157).eg1rev(1)
  .eg2attack(0.401).eg2decay(0.0021).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.88).mgwave("saw")
  .pitcheg(15.81)
  .portamento(2.937)
  .modmatrix([{src:22, dst:14}, {src:16, dst:5}, {src:12, dst:6}, {src:27, dst:13}])
  .gain(0.6);

export const ms20_yoi_choir = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0).vco1pw(0.245)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.43)
  .hpfcutoff(2715.5).hpfpeak(0.64).hpfenv(-2.16)
  .lpfcutoff(20).lpfpeak(0.325).lpfmg(0.125)
  .drive(1.5)
  .eg1attack(0.0398).eg1release(0.001).eg1rev(1)
  .eg2attack(0.1995).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .pitcheg(16.2)
  .portamento(0.042)
  .modmatrix([{src:17, dst:22}, {src:1, dst:12}, {src:0, dst:16}, {src:10, dst:21}, {src:14, dst:27}])
  .gain(0.6);

export const ms20_sample_hold_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333)
  .vco2wave("tri").vco2scale(0.25).vco2level(0.5).vco2tune(-12.0)
  .hpfcutoff(58.9).hpfpeak(0.81).hpfenv(-3.84)
  .lpfcutoff(20).lpfpeak(0.47).lpfenv(7.36)
  .drive(1.5)
  .eg1attack(0.0076).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0048).eg2decay(10.0).eg2sustain(0.87).eg2release(0.001)
  .modmatrix([{src:2, dst:6}, {src:26, dst:7}, {src:4, dst:10}, {src:32, dst:18}])
  .gain(0.6);

export const ms20_init_program = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.25).vco1level(0.333)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.26)
  .hpfcutoff(433.5).hpfpeak(0.21).hpfenv(-5.92)
  .lpfcutoff(129.1).lpfpeak(0.85).lpfenv(8.0).lpfmg(0.29)
  .drive(1.5)
  .eg1attack(0.001).eg1release(0.3631).eg1rev(1)
  .eg2attack(0.0021).eg2decay(0.0437).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.13).mgwave("saw")
  .portamento(2.942)
  .modmatrix([{src:14, dst:27}, {src:12, dst:10}, {src:17, dst:16}])
  .gain(0.6);

export const ms20_a_little_flutter_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(2.0).vco1level(0.333).vco1pw(0.755)
  .vco2wave("sine").vco2scale(2.0).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.49)
  .hpfcutoff(642.8).hpfpeak(0.492).hpfenv(-3.68)
  .lpfcutoff(276.1).lpfpeak(1.0).lpfenv(8.0)
  .drive(1.5)
  .eg1attack(0.0363).eg1release(0.001)
  .eg2attack(0.0019).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.94).mgwave("saw")
  .pitcheg(14.48)
  .modmatrix([{src:6, dst:0}, {src:21, dst:10}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(1.0)
  .vco2wave("sine").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.71)
  .hpfcutoff(2437.6).hpfpeak(0.28).hpfenv(-3.81).hpfmg(0.4)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(0.96).lpfmg(0.13)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(0.802).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .pitcheg(14.88)
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.667).vco1pw(0.088)
  .vco2wave("sine").vco2level(0.5).vco2tune(-12.0)
  .hpfcutoff(7173.3).hpfpeak(0.12).hpfenv(-8.0)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-1.44)
  .drive(1.5)
  .eg1attack(0.1).eg1release(0.0091).eg1rev(1)
  .eg2attack(0.0832).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(1.64).mgwave("saw")
  .portamento(0.083)
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.0)
  .vco2wave("sine").vco2scale(0.5).vco2level(0.5).vco2tune(-1.92)
  .noiselevel(1.0)
  .hpfcutoff(1499.8).hpfpeak(0.46).hpfenv(-8.0)
  .lpfcutoff(20).lpfpeak(0.0)
  .drive(1.5)
  .eg1attack(10.0).eg1release(0.0398)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .portamento(2.917)
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333).vco1pw(0.167)
  .vco2wave("sine").vco2scale(0.5).vco2level(0.508).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(1.0)
  .hpfcutoff(784.8).hpfpeak(0.53).hpfenv(-8.0)
  .lpfcutoff(20).lpfpeak(0.0)
  .drive(1.5)
  .eg1attack(0.001).eg1release(10.0)
  .eg2attack(0.2512).eg2decay(0.0174).eg2sustain(0.64).eg2release(0.001)
  .pitcheg(17.04)
  .portamento(2.917)
  .modmatrix([{src:15, dst:3}, {src:9, dst:8}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.667)
  .vco2wave("tri").vco2level(0.5).vco2tune(-6.48)
  .noiselevel(1.0)
  .ringmod(0.62)
  .hpfcutoff(203.6).hpfpeak(0.46).hpfenv(-8.0)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-8.0).lpfmg(0.22)
  .drive(1.5)
  .eg1attack(0.1738).eg1release(0.0025).eg1rev(1)
  .eg2attack(0.0302).eg2decay(0.012).eg2sustain(0.76).eg2release(0.1)
  .pitcheg(24.0)
  .portamento(0.083)
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.667).vco1pw(0.382)
  .vco2wave("square").vco2scale(0.5).vco2level(0.506).vco2tune(-12.0)
  .noiselevel(0.49)
  .hpfcutoff(24.8).hpfpeak(0.0).hpfenv(-4.48)
  .lpfcutoff(20000.0).lpfpeak(1.0).lpfenv(-8.0).lpfmg(0.42)
  .drive(1.5)
  .eg1attack(0.001).eg1release(10.0).eg1rev(1)
  .eg2attack(0.5248).eg2decay(10.0).eg2sustain(1.0).eg2release(0.001).eg2rev(1)
  .pitcheg(13.92)
  .modmatrix([{src:6, dst:17}, {src:3, dst:23}, {src:12, dst:8}, {src:14, dst:27}, {src:0, dst:16}])
  .gain(0.6);

export const ms20_solid_bass_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.5).vco1level(0.333)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.526).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(368.7).hpfpeak(0.248).hpfenv(-6.72)
  .lpfcutoff(170.2).lpfpeak(0.88).lpfenv(-1.92)
  .drive(1.5)
  .eg1attack(0.0191).eg1release(0.0021)
  .eg2attack(0.0145).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.25).mgwave("tri")
  .portamento(2.917)
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(2.0).vco1level(0.0)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.55)
  .hpfcutoff(3961.9).hpfpeak(0.08).hpfenv(-1.6)
  .lpfcutoff(105.0).lpfpeak(0.0)
  .drive(1.5)
  .eg1attack(0.302).eg1release(0.0025)
  .eg2attack(0.0912).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .pitcheg(1.68)
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.667).vco1pw(0.373)
  .vco2wave("tri").vco2level(0.5).vco2tune(-8.16)
  .noiselevel(1.0)
  .hpfcutoff(3192.7).hpfpeak(0.16).hpfenv(-6.4)
  .lpfcutoff(479.8).lpfpeak(0.3)
  .drive(1.5)
  .eg1attack(0.0302).eg1release(0.0692).eg1rev(1)
  .eg2attack(0.0331).eg2decay(0.0575).eg2sustain(0.26).eg2release(0.1)
  .mgfreq(0.39).mgwave("saw")
  .pitcheg(4.8)
  .modmatrix([{src:10, dst:21}, {src:0, dst:27}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.333).vco1pw(0.196)
  .vco2wave("saw").vco2level(0.5).vco2tune(-4.8)
  .noiselevel(1.0)
  .hpfcutoff(632.5).hpfpeak(0.49).hpfenv(-6.56)
  .lpfcutoff(49.1).lpfpeak(0.72).lpfenv(8.0)
  .drive(1.5)
  .eg1attack(7.5858).eg1release(0.0229).eg1rev(1)
  .eg2attack(0.012).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .pitcheg(5.76)
  .modmatrix([{src:19, dst:2}, {src:7, dst:17}, {src:1, dst:4}])
  .gain(0.6);

export const ms20_ring_mod_bell_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1level(1.0)
  .vco2wave("saw").vco2scale(2.0).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.77)
  .hpfcutoff(1145.1).hpfpeak(0.27).hpfenv(-3.68)
  .lpfcutoff(20).lpfpeak(0.38)
  .drive(1.5)
  .eg1attack(0.0033).eg1release(0.0575).eg1rev(1)
  .eg2attack(0.2089).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.33).mgwave("saw")
  .portamento(5.0)
  .modmatrix([{src:31, dst:2}, {src:24, dst:7}, {src:4, dst:32}, {src:14, dst:27}, {src:12, dst:1}, {src:0, dst:16}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.667)
  .vco2wave("saw").vco2level(0.5).vco2tune(-2.88)
  .noiselevel(0.52)
  .ringmod(0.79)
  .hpfcutoff(20000.0).hpfpeak(0.33).hpfenv(-1.76)
  .lpfcutoff(20).lpfpeak(0.0)
  .drive(1.5)
  .eg1attack(9.1201).eg1release(0.0036)
  .eg2attack(0.004).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(5.34).mgwave("saw")
  .portamento(1.25)
  .modmatrix([{src:12, dst:1}, {src:14, dst:27}, {src:0, dst:16}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1level(0.667).vco1pw(0.147)
  .vco2wave("square").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.68)
  .hpfcutoff(704.5).hpfpeak(0.13).hpfenv(-3.68)
  .lpfcutoff(20).lpfpeak(0.41)
  .drive(1.5)
  .eg1attack(0.0525).eg1release(0.001)
  .eg2attack(0.0331).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.29).mgwave("saw")
  .pitcheg(0.48)
  .modmatrix([{src:14, dst:27}, {src:12, dst:1}, {src:13, dst:16}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333)
  .vco2wave("tri").vco2level(0.5).vco2tune(-7.92)
  .noiselevel(1.0)
  .ringmod(0.59)
  .hpfcutoff(5189.1).hpfpeak(0.11).hpfenv(-3.36)
  .lpfcutoff(20).lpfpeak(0.67).lpfenv(-0.16).lpfmg(0.2)
  .drive(1.5)
  .eg1attack(0.0363).eg1release(10.0).eg1rev(1)
  .eg2attack(0.0019).eg2decay(0.0132).eg2sustain(0.92).eg2release(0.1)
  .mgfreq(0.73).mgwave("saw")
  .pitcheg(10.08)
  .modmatrix([{src:18, dst:33}, {src:5, dst:10}])
  .gain(0.6);

export const ms20_ring_mod_fall_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.25).vco1level(0.333).vco1pw(0.137)
  .vco2wave("sine").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .ringmod(0.78)
  .hpfcutoff(457.5).hpfpeak(0.85).hpfenv(-8.0)
  .lpfcutoff(20).lpfpeak(0.69).lpfenv(-5.12)
  .drive(1.5)
  .eg1attack(0.0575).eg1release(0.0575).eg1rev(1)
  .eg2attack(0.0832).eg2decay(0.001).eg2sustain(0.91).eg2release(0.001)
  .portamento(5.0)
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.0).vco1pw(0.245)
  .vco2wave("tri").vco2level(0.508).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(389.1).hpfpeak(0.75).hpfenv(-8.0)
  .lpfcutoff(20).lpfpeak(1.0).lpfenv(-2.24)
  .drive(1.5)
  .eg1attack(0.302).eg1release(0.001)
  .eg2attack(0.3981).eg2decay(1.3183).eg2sustain(1.0).eg2release(0.001)
  .portamento(2.083)
  .modmatrix([{src:9, dst:8}, {src:30, dst:3}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.667)
  .vco2wave("saw").vco2scale(2.0).vco2level(0.5).vco2tune(-2.64)
  .noiselevel(1.0)
  .ringmod(0.5)
  .hpfcutoff(1145.1).hpfpeak(0.66).hpfenv(-8.0)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-8.0)
  .drive(1.5)
  .eg1attack(0.0251).eg1release(0.0145).eg1rev(1)
  .eg2attack(0.1318).eg2decay(0.1).eg2sustain(0.92).eg2release(0.1)
  .mgfreq(0.2).mgwave("tri")
  .pitcheg(21.6)
  .portamento(0.083)
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.667)
  .vco2wave("tri").vco2level(0.5).vco2tune(-7.92)
  .noiselevel(1.0)
  .hpfcutoff(58.9).hpfpeak(0.04).hpfenv(-7.92)
  .lpfcutoff(677.7).lpfpeak(0.77).lpfenv(-7.36)
  .drive(1.5)
  .eg1attack(0.0759).eg1release(10.0).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(0.44).mgwave("saw")
  .pitcheg(3.84)
  .modmatrix([{src:0, dst:10}, {src:17, dst:1}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1level(0.333).vco1pw(0.157)
  .vco2wave("saw").vco2level(0.5).vco2tune(-5.76)
  .noiselevel(1.0)
  .hpfcutoff(47.4).hpfpeak(0.03).hpfenv(8.0).hpfmg(0.14)
  .lpfcutoff(4375.5).lpfpeak(0.7).lpfenv(8.0).lpfmg(0.53)
  .drive(1.5)
  .eg1attack(3.02).eg1release(10.0)
  .eg2attack(0.1318).eg2decay(0.0028).eg2sustain(0.93).eg2release(0.1).eg2rev(1)
  .mgfreq(0.54).mgwave("saw")
  .pitcheg(20.4)
  .pitchmg(4.32)
  .modmatrix([{src:3, dst:30}, {src:2, dst:29}, {src:13, dst:1}, {src:27, dst:5}, {src:17, dst:31}, {src:26, dst:6}, {src:34, dst:4}, {src:0, dst:7}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.667).vco1pw(0.667)
  .vco2wave("saw").vco2scale(0.5).vco2level(0.508).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.191)
  .hpfcutoff(1670.7).hpfpeak(0.28).hpfenv(-5.44).hpfmg(0.24)
  .lpfcutoff(20).lpfpeak(0.61).lpfenv(0.96)
  .drive(1.5)
  .eg1attack(0.0398).eg1release(0.1445)
  .eg2attack(0.1738).eg2decay(1.5849).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.21).mgwave("square")
  .pitcheg(1.63)
  .modmatrix([{src:12, dst:1}, {src:14, dst:27}, {src:3, dst:16}, {src:18, dst:28}])
  .gain(0.6);

export const ms20_morphing_arpline_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.333).vco1pw(0.039)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(47.4).hpfpeak(0.06)
  .lpfcutoff(2697.9).lpfpeak(0.524)
  .drive(1.5)
  .eg1attack(0.1738).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0437).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.333).vco1pw(0.128)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(1763.4).hpfpeak(0.0).hpfenv(-7.92)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-0.16)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0).eg1rev(1)
  .eg2attack(0.0025).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(1.64).mgwave("tri")
  .portamento(0.083)
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.667)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.508).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.14)
  .hpfcutoff(20000.0).hpfpeak(0.0).hpfenv(-4.48)
  .lpfcutoff(20).lpfpeak(0.0)
  .drive(1.5)
  .eg1attack(0.001).eg1release(10.0)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(2.1).mgwave("saw")
  .portamento(2.917)
  .modmatrix([{src:14, dst:27}, {src:5, dst:16}, {src:12, dst:1}])
  .gain(0.6);

export const ms20_sample_hold_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.333)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(1861.1).hpfpeak(0.0).hpfenv(-8.0)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-0.16)
  .drive(1.5)
  .eg1attack(0.0158).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0069).eg2decay(0.001).eg2sustain(0.0).eg2release(0.001)
  .mgfreq(0.14).mgwave("saw")
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.0).vco1pw(0.265)
  .vco2wave("saw").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.83)
  .hpfcutoff(2715.5).hpfpeak(0.21).hpfenv(-3.68).hpfmg(0.11)
  .lpfcutoff(20).lpfpeak(0.0).lpfmg(0.22)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(0.603).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .pitcheg(1.68)
  .portamento(2.917)
  .modmatrix([{src:17, dst:10}, {src:9, dst:16}, {src:14, dst:27}, {src:30, dst:12}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.667)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.66)
  .hpfcutoff(2437.6).hpfpeak(0.15).hpfenv(-2.88)
  .lpfcutoff(20).lpfpeak(1.0).lpfmg(0.2)
  .drive(1.5)
  .eg1attack(0.0017).eg1release(0.001).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.0575).eg2sustain(0.26).eg2release(0.1)
  .mgfreq(0.39).mgwave("saw")
  .modmatrix([{src:10, dst:21}, {src:14, dst:27}, {src:0, dst:16}, {src:1, dst:12}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.333)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.508).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(79.6).hpfpeak(0.2).hpfenv(-5.28)
  .lpfcutoff(20000.0).lpfpeak(1.0).lpfenv(4.48)
  .drive(1.5)
  .eg1attack(6.3096).eg1release(0.2512).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.667)
  .vco2wave("tri").vco2level(0.508).vco2tune(-12.0)
  .noiselevel(0.8)
  .ringmod(0.04)
  .hpfcutoff(8901.6).hpfpeak(0.0).hpfenv(-3.84)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-1.28)
  .drive(1.5)
  .eg1attack(0.0398).eg1release(10.0)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .portamento(0.017)
  .modmatrix([{src:14, dst:27}, {src:5, dst:16}, {src:1, dst:12}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.5).vco1level(0.667)
  .vco2wave("saw").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(537.9).hpfpeak(0.36).hpfenv(-7.84)
  .lpfcutoff(7603.8).lpfpeak(0.46).lpfenv(8.0)
  .drive(1.5)
  .eg1attack(0.0525).eg1release(0.4365)
  .eg2attack(0.011).eg2decay(0.7586).eg2sustain(0.39).eg2release(0.001)
  .mgfreq(0.29).mgwave("saw")
  .pitcheg(0.48)
  .portamento(0.033)
  .modmatrix([{src:14, dst:27}, {src:12, dst:1}, {src:3, dst:15}, {src:17, dst:8}, {src:13, dst:16}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.333)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-7.92)
  .noiselevel(1.0)
  .ringmod(0.59)
  .hpfcutoff(632.5).hpfpeak(0.49).hpfenv(-3.36)
  .lpfcutoff(20).lpfpeak(0.85).lpfenv(-0.16).lpfmg(0.2)
  .drive(1.5)
  .eg1attack(0.0251).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0209).eg2decay(0.0132).eg2sustain(0.92).eg2release(0.1)
  .mgfreq(0.88).mgwave("saw")
  .pitcheg(10.08)
  .modmatrix([{src:18, dst:33}, {src:5, dst:10}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.667).vco1pw(0.294)
  .vco2wave("sine").vco2level(0.5).vco2tune(-7.92)
  .hpfcutoff(704.5).hpfpeak(0.04).hpfenv(-7.36)
  .lpfcutoff(3556.6).lpfpeak(0.0).lpfenv(-0.16)
  .drive(1.5)
  .eg1attack(1.2023).eg1release(0.003).eg1rev(1)
  .eg2attack(0.1).eg2decay(0.0191).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(0.25).mgwave("saw")
  .pitcheg(8.88)
  .portamento(2.933)
  .modmatrix([{src:3, dst:23}, {src:9, dst:15}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0).vco1pw(0.294)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.506).vco2tune(1.44)
  .noiselevel(1.0)
  .hpfcutoff(252.7).hpfpeak(0.58).hpfenv(-8.0)
  .lpfcutoff(20).lpfpeak(0.81).lpfmg(0.09)
  .drive(1.5)
  .eg1attack(0.0525).eg1release(0.003)
  .eg2attack(0.01).eg2decay(0.1905).eg2sustain(0.0).eg2release(0.001)
  .pitcheg(3.84)
  .modmatrix([{src:27, dst:13}, {src:3, dst:30}, {src:9, dst:8}, {src:10, dst:21}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.5).vco1level(0.667)
  .vco2wave("saw").vco2scale(2.0).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(3556.6).hpfpeak(0.36).hpfenv(-1.6)
  .lpfcutoff(20).lpfpeak(0.84)
  .drive(1.5)
  .eg1attack(0.0525).eg1release(0.4365)
  .eg2attack(0.011).eg2decay(1.2023).eg2sustain(0.84).eg2release(0.001)
  .mgfreq(0.29).mgwave("saw")
  .pitcheg(0.48)
  .portamento(0.033)
  .modmatrix([{src:14, dst:27}, {src:12, dst:1}, {src:3, dst:15}, {src:17, dst:8}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("sine").vco1scale(2.0).vco1level(1.0).vco1pw(0.559)
  .vco2wave("sine").vco2scale(2.0).vco2level(0.65).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(784.8).hpfpeak(0.0).hpfenv(-7.92)
  .lpfcutoff(1177.7).lpfpeak(1.0).lpfenv(8.0)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0).eg1rev(1)
  .eg2attack(2.5119).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(3.68).mgwave("tri")
  .portamento(5.0)
  .modmatrix([{src:0, dst:19}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.5).vco1level(0.333).vco1pw(0.137)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-7.68)
  .noiselevel(1.0)
  .hpfcutoff(1861.1).hpfpeak(0.5).hpfenv(-8.0).hpfmg(0.52)
  .lpfcutoff(20).lpfpeak(0.53).lpfenv(-4.48).lpfmg(0.85)
  .drive(1.5)
  .eg1attack(0.631).eg1release(0.001)
  .eg2attack(0.0145).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(0.94).mgwave("tri")
  .pitcheg(12.72)
  .pitchmg(8.52)
  .modmatrix([{src:22, dst:17}, {src:5, dst:6}, {src:25, dst:20}, {src:24, dst:28}, {src:21, dst:33}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.0)
  .vco2wave("saw").vco2scale(0.5).vco2level(0.5).vco2tune(-8.16)
  .noiselevel(1.0)
  .hpfcutoff(203.6).hpfpeak(0.04).hpfenv(-4.96)
  .lpfcutoff(20).lpfpeak(0.9).lpfenv(-0.16)
  .drive(1.5)
  .eg1attack(0.0091).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0302).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .pitcheg(8.64)
  .portamento(0.117)
  .modmatrix([{src:10, dst:21}, {src:13, dst:27}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.5).vco1level(0.333).vco1pw(0.137)
  .vco2wave("saw").vco2scale(2.0).vco2level(0.5).vco2tune(-5.28)
  .noiselevel(0.54)
  .hpfcutoff(2866.0).hpfpeak(0.21).hpfenv(-4.16)
  .lpfcutoff(726.2).lpfpeak(1.0).lpfenv(2.24).lpfmg(0.67)
  .drive(1.5)
  .eg1attack(0.1).eg1release(2.0893)
  .eg2attack(0.0275).eg2decay(0.2586).eg2sustain(0.0).eg2release(0.001)
  .pitcheg(3.6)
  .modmatrix([{src:16, dst:0}, {src:12, dst:6}, {src:33, dst:18}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333).vco1pw(0.186)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-3.12)
  .noiselevel(0.54)
  .hpfcutoff(667.5).hpfpeak(0.69).hpfenv(-4.48)
  .lpfcutoff(37.2).lpfpeak(0.63)
  .drive(1.5)
  .eg1attack(0.0575).eg1release(0.0209).eg1rev(1)
  .eg2attack(0.0011).eg2decay(0.0019).eg2sustain(0.11).eg2release(0.001)
  .pitcheg(0.72)
  .portamento(0.025)
  .modmatrix([{src:9, dst:8}, {src:27, dst:14}, {src:12, dst:1}, {src:0, dst:16}, {src:23, dst:3}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1level(0.333)
  .vco2wave("saw").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.03)
  .hpfcutoff(2715.5).hpfpeak(0.05).hpfenv(-8.0)
  .lpfcutoff(1025.7).lpfpeak(0.85).lpfenv(-0.8)
  .drive(1.5)
  .eg1attack(0.001).eg1release(0.3631)
  .eg2attack(0.0645).eg2decay(0.001).eg2sustain(0.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .pitcheg(15.12)
  .portamento(2.917)
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(2.0).vco1level(0.333).vco1pw(0.088)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.26)
  .hpfcutoff(20000.0).hpfpeak(0.0).hpfenv(-5.12)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-1.44)
  .drive(1.5)
  .eg1attack(0.1).eg1release(0.0091).eg1rev(1)
  .eg2attack(0.0025).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(1.64).mgwave("saw")
  .portamento(0.083)
  .gain(0.6);

export const ms20_pwm_lead_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.667)
  .vco2wave("tri").vco2level(0.5).vco2tune(-9.36)
  .noiselevel(1.0)
  .hpfcutoff(3556.6).hpfpeak(0.24).hpfenv(-4.64)
  .lpfcutoff(20).lpfpeak(0.76).lpfmg(0.33)
  .drive(1.5)
  .eg1attack(0.0912).eg1release(4.7863).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .pitcheg(2.88)
  .portamento(0.008)
  .modmatrix([{src:14, dst:27}, {src:12, dst:1}, {src:0, dst:16}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333).vco1pw(0.128)
  .vco2wave("sine").vco2scale(0.5).vco2level(0.5).vco2tune(-3.12)
  .noiselevel(1.0)
  .hpfcutoff(3369.7).hpfpeak(0.0).hpfenv(-5.92)
  .lpfcutoff(20).lpfpeak(0.54).lpfenv(-8.0)
  .drive(1.5)
  .eg1attack(0.0063).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0011).eg2decay(0.0048).eg2sustain(0.74).eg2release(0.001)
  .mgfreq(2.69).mgwave("tri")
  .pitcheg(0.72)
  .portamento(2.933)
  .modmatrix([{src:3, dst:23}, {src:15, dst:9}, {src:21, dst:10}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(2.0).vco1level(0.333)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.57).vco2tune(-12.0)
  .noiselevel(0.61)
  .hpfcutoff(1208.6).hpfpeak(0.15).hpfenv(-4.19)
  .lpfcutoff(4375.5).lpfpeak(0.75).lpfenv(-8.0)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0).eg1rev(1)
  .eg2attack(0.0012).eg2decay(0.001).eg2sustain(0.603).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .modmatrix([{src:21, dst:10}, {src:18, dst:33}])
  .gain(0.6);

export const ms20_sample_hold_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.5).vco1level(1.0)
  .vco2wave("square").vco2scale(0.5).vco2level(0.5).vco2tune(-6.72)
  .noiselevel(1.0)
  .hpfcutoff(20000.0).hpfpeak(0.2).hpfenv(-4.16)
  .lpfcutoff(148.3).lpfpeak(0.08).lpfenv(5.28)
  .drive(1.5)
  .eg1attack(0.1).eg1release(5.7544).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(0.0).eg2release(0.001)
  .modmatrix([{src:17, dst:1}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.0)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(281.5).hpfpeak(0.81).hpfenv(-7.92).hpfmg(0.62)
  .lpfcutoff(240.5).lpfpeak(0.0).lpfenv(-6.72)
  .drive(1.5)
  .eg1attack(10.0).eg1release(10.0).eg1rev(1)
  .eg2attack(0.0229).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(0.19).mgwave("tri")
  .pitcheg(18.0)
  .portamento(0.083)
  .modmatrix([{src:14, dst:1}, {src:12, dst:23}, {src:9, dst:16}, {src:17, dst:7}, {src:4, dst:10}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("sine").vco1scale(0.25).vco1level(0.667)
  .vco2wave("sine").vco2scale(0.5).vco2level(0.508).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.543)
  .hpfcutoff(14467.9).hpfpeak(0.27).hpfenv(-4.64)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(0.48)
  .drive(1.5)
  .eg1attack(0.001).eg1release(10.0).eg1rev(1)
  .eg2attack(0.001).eg2decay(10.0).eg2sustain(1.0).eg2release(0.001)
  .modmatrix([{src:5, dst:6}, {src:31, dst:17}, {src:12, dst:8}, {src:3, dst:30}, {src:14, dst:27}, {src:9, dst:16}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1level(0.333)
  .vco2wave("square").vco2level(0.5).vco2tune(-7.92)
  .noiselevel(1.0)
  .hpfcutoff(3556.6).hpfpeak(0.36).hpfenv(-7.36)
  .lpfcutoff(20).lpfpeak(0.23).lpfenv(-0.16)
  .drive(1.5)
  .eg1attack(0.2291).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0036).eg2decay(0.0191).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(0.11).mgwave("saw")
  .pitcheg(2.4)
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.333)
  .vco2wave("tri").vco2scale(2.0).vco2level(0.5).vco2tune(-6.24)
  .noiselevel(1.0)
  .hpfcutoff(3556.6).hpfpeak(0.0).hpfenv(-7.92)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-0.16)
  .drive(1.5)
  .eg1attack(0.1).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0025).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(1.64).mgwave("tri")
  .portamento(0.083)
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(2.0).vco1level(0.667).vco1pw(0.343)
  .vco2wave("sine").vco2scale(2.0).vco2level(0.5).vco2tune(8.16)
  .noiselevel(0.66)
  .hpfcutoff(3192.7).hpfpeak(0.68).hpfenv(0.64)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-2.24)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0)
  .eg2attack(0.0025).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333).vco1pw(0.177)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(1763.4).hpfpeak(0.0).hpfenv(-7.92)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-0.16)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0).eg1rev(1)
  .eg2attack(0.0025).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(1.64).mgwave("tri")
  .portamento(0.083)
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.667)
  .vco2wave("saw").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(11046.3).hpfpeak(0.0).hpfenv(-8.0).hpfmg(1.0)
  .lpfcutoff(514.1).lpfpeak(0.58).lpfenv(-8.0)
  .drive(1.5)
  .eg1attack(0.1).eg1release(0.0302)
  .eg2attack(0.001).eg2decay(1.1159).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(50.0).mgwave("tri")
  .portamento(1.667)
  .modmatrix([{src:27, dst:0}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(2866.0).hpfpeak(0.0).hpfenv(-7.2)
  .lpfcutoff(79.6).lpfpeak(0.913).lpfenv(0.64)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0)
  .eg2attack(0.1445).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.333)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-6.48)
  .noiselevel(1.0)
  .hpfcutoff(457.5).hpfpeak(0.24).hpfenv(-5.92)
  .lpfcutoff(20).lpfpeak(0.51).lpfenv(-8.0)
  .drive(1.5)
  .eg1attack(0.0091).eg1release(0.0091).eg1rev(1)
  .eg2attack(0.0011).eg2decay(0.0058).eg2sustain(0.96).eg2release(0.001)
  .pitcheg(0.72)
  .portamento(0.042)
  .modmatrix([{src:10, dst:21}, {src:14, dst:22}, {src:3, dst:23}, {src:9, dst:8}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.333).vco1pw(0.069)
  .vco2wave("saw").vco2level(0.5).vco2tune(-9.84)
  .noiselevel(1.0)
  .hpfcutoff(1275.6).hpfpeak(0.0).hpfenv(-8.0)
  .lpfcutoff(20000.0).lpfpeak(0.8).lpfenv(0.16)
  .drive(1.5)
  .eg1attack(0.0692).eg1release(0.0063).eg1rev(1)
  .eg2attack(0.0016).eg2decay(0.0019).eg2sustain(0.0).eg2release(0.1)
  .pitcheg(2.04)
  .portamento(2.917)
  .modmatrix([{src:3, dst:23}, {src:9, dst:8}, {src:0, dst:11}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.667)
  .vco2wave("tri").vco2level(0.503).vco2tune(-0.24)
  .noiselevel(1.0)
  .hpfcutoff(2572.8).hpfpeak(0.71).hpfenv(8.0)
  .lpfcutoff(20000.0).lpfpeak(1.0).lpfenv(8.0)
  .drive(1.5)
  .eg1attack(0.5248).eg1release(0.0091).eg1rev(1)
  .eg2attack(0.0575).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(0.14).mgwave("sine")
  .modmatrix([{src:4, dst:6}, {src:2, dst:19}, {src:0, dst:7}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.667).vco1pw(0.304)
  .vco2wave("square").vco2scale(0.5).vco2level(0.509).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(1583.0).hpfpeak(0.19).hpfenv(8.0)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(1.28)
  .drive(1.5)
  .eg1attack(0.001).eg1release(10.0)
  .eg2attack(0.0025).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .pitcheg(12.96)
  .modmatrix([{src:14, dst:27}, {src:12, dst:10}, {src:21, dst:16}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.25).vco1level(0.667)
  .vco2wave("sine").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.89)
  .hpfcutoff(922.8).hpfpeak(0.59).hpfenv(-7.92).hpfmg(0.09)
  .lpfcutoff(20000.0).lpfpeak(1.0).lpfenv(-0.16)
  .drive(1.5)
  .eg1attack(0.0209).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0025).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(0.44).mgwave("saw")
  .pitcheg(5.52)
  .modmatrix([{src:0, dst:11}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333).vco1pw(0.128)
  .vco2wave("sine").vco2level(0.5).vco2tune(-6.0)
  .noiselevel(1.0)
  .hpfcutoff(20000.0).hpfpeak(0.25).hpfenv(-6.24)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-1.44)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0).eg1rev(1)
  .eg2attack(0.0275).eg2decay(0.001).eg2sustain(0.0).eg2release(0.001)
  .portamento(0.1)
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.667)
  .vco2wave("sine").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.09)
  .hpfcutoff(349.3).hpfpeak(0.1).hpfenv(-2.88)
  .lpfcutoff(5383.1).lpfpeak(0.38).lpfenv(-8.0).lpfmg(0.08)
  .drive(1.5)
  .eg1attack(0.7586).eg1release(0.1318).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(0.198).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .pitchmg(2.76)
  .modmatrix([{src:17, dst:31}, {src:5, dst:16}, {src:1, dst:12}, {src:13, dst:7}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.0)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.508).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(214.9).hpfpeak(0.31).hpfenv(-8.0)
  .lpfcutoff(79.6).lpfpeak(1.0)
  .drive(1.5)
  .eg1attack(0.0191).eg1release(0.0013)
  .eg2attack(0.1318).eg2decay(3.02).eg2sustain(1.0).eg2release(0.001)
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.333).vco1pw(0.382)
  .vco2wave("square").vco2scale(0.5).vco2level(0.508).vco2tune(-12.0)
  .noiselevel(0.4)
  .hpfcutoff(27.6).hpfpeak(0.0).hpfenv(-4.48)
  .lpfcutoff(20000.0).lpfpeak(1.0).lpfenv(-8.0).lpfmg(0.42)
  .drive(1.5)
  .eg1attack(0.001).eg1release(10.0).eg1rev(1)
  .eg2attack(0.5248).eg2decay(10.0).eg2sustain(1.0).eg2release(0.001).eg2rev(1)
  .pitcheg(13.92)
  .modmatrix([{src:17, dst:6}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.333)
  .vco2wave("saw").vco2scale(0.5).vco2level(0.5).vco2tune(-4.08)
  .noiselevel(1.0)
  .ringmod(0.28)
  .hpfcutoff(118.7).hpfpeak(0.59).hpfenv(-3.52)
  .lpfcutoff(479.8).lpfpeak(0.0).lpfmg(0.19)
  .drive(1.5)
  .eg1attack(0.0832).eg1release(10.0).eg1rev(1)
  .eg2attack(0.0014).eg2decay(0.0058).eg2sustain(0.96).eg2release(0.001)
  .pitcheg(1.92)
  .portamento(0.042)
  .modmatrix([{src:12, dst:1}, {src:5, dst:16}, {src:0, dst:11}, {src:14, dst:27}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(1.0).vco1pw(0.039)
  .vco2wave("square").vco2scale(2.0).vco2level(0.5).vco2tune(-5.28)
  .noiselevel(1.0)
  .ringmod(0.2)
  .hpfcutoff(1027.9).hpfpeak(0.83).hpfenv(-2.4)
  .lpfcutoff(20).lpfpeak(0.0)
  .drive(1.5)
  .eg1attack(0.001).eg1release(10.0)
  .eg2attack(0.0044).eg2decay(0.0289).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .modmatrix([{src:16, dst:5}, {src:12, dst:1}, {src:27, dst:14}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.5).vco1level(0.667)
  .vco2wave("sine").vco2scale(0.5).vco2level(0.508).vco2tune(-4.8)
  .noiselevel(0.674)
  .hpfcutoff(995.2).hpfpeak(0.507).hpfenv(-8.0)
  .lpfcutoff(1261.9).lpfpeak(0.0)
  .drive(1.5)
  .eg1attack(0.001).eg1release(10.0)
  .eg2attack(0.0575).eg2decay(0.0022).eg2sustain(1.0).eg2release(0.001)
  .pitcheg(11.04)
  .modmatrix([{src:3, dst:30}, {src:9, dst:16}, {src:14, dst:27}, {src:12, dst:15}, {src:0, dst:10}])
  .gain(0.6);

export const ms20_bpf_air_stab_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(2.0).vco1level(0.0).vco1pw(0.676)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.49).vco2tune(-12.0)
  .noiselevel(0.52)
  .hpfcutoff(4181.6).hpfpeak(0.15).hpfenv(-8.0)
  .lpfcutoff(39.9).lpfpeak(0.6).lpfenv(0.16)
  .drive(1.5)
  .eg1attack(0.1445).eg1release(1.0).eg1rev(1)
  .eg2attack(3.9811).eg2decay(0.0058).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.69).mgwave("saw")
  .pitcheg(11.28)
  .pitchmg(5.04)
  .portamento(0.083)
  .modmatrix([{src:16, dst:17}, {src:14, dst:11}, {src:3, dst:23}, {src:9, dst:8}])
  .gain(0.6);

export const ms20_simple_sq_bass_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0)
  .vco2wave("tri").vco2scale(0.25).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.87)
  .hpfcutoff(118.7).hpfpeak(0.28)
  .lpfcutoff(20).lpfpeak(0.63)
  .drive(1.5)
  .eg1attack(0.1).eg1release(0.001).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.27).mgwave("tri")
  .modmatrix([{src:21, dst:10}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.25).vco1level(0.333)
  .vco2wave("saw").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(4181.6).hpfpeak(0.21)
  .lpfcutoff(632.5).lpfpeak(0.6).lpfmg(0.17)
  .drive(1.5)
  .eg1attack(0.0525).eg1release(0.0069)
  .eg2attack(0.0275).eg2decay(0.001).eg2sustain(0.0).eg2release(0.001)
  .mgfreq(50.0).mgwave("tri")
  .pitcheg(6.72)
  .pitchmg(6.0)
  .modmatrix([{src:22, dst:0}, {src:14, dst:13}, {src:15, dst:17}, {src:12, dst:10}, {src:32, dst:4}, {src:31, dst:2}, {src:24, dst:7}, {src:33, dst:18}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0).vco1pw(0.196)
  .vco2wave("tri").vco2level(0.508).vco2tune(-12.0)
  .noiselevel(0.87)
  .hpfcutoff(3369.7).hpfpeak(0.05).hpfenv(-5.28)
  .lpfcutoff(170.2).lpfpeak(0.0).lpfenv(1.44)
  .drive(1.5)
  .eg1attack(0.1905).eg1release(0.5248).eg1rev(1)
  .eg2attack(0.0759).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.47).mgwave("saw")
  .modmatrix([{src:31, dst:2}, {src:33, dst:4}, {src:24, dst:7}, {src:17, dst:22}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.667)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.24)
  .hpfcutoff(482.9).hpfpeak(0.29).hpfenv(-7.92)
  .lpfcutoff(20000.0).lpfpeak(1.0).lpfenv(8.0)
  .drive(1.5)
  .eg1attack(0.0692).eg1release(0.0033)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .pitcheg(3.84)
  .portamento(5.0)
  .modmatrix([{src:0, dst:11}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.667).vco1pw(0.667)
  .vco2wave("saw").vco2level(0.508).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.394)
  .hpfcutoff(1670.7).hpfpeak(0.28).hpfenv(-5.44).hpfmg(0.24)
  .lpfcutoff(20).lpfpeak(0.49).lpfenv(0.96)
  .drive(1.5)
  .eg1attack(0.0398).eg1release(0.1445)
  .eg2attack(0.1738).eg2decay(1.5849).eg2sustain(1.0).eg2release(0.001)
  .modmatrix([{src:12, dst:1}, {src:14, dst:27}, {src:3, dst:16}, {src:28, dst:18}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333)
  .vco2wave("tri").vco2level(0.5).vco2tune(-7.92)
  .noiselevel(1.0)
  .ringmod(0.6)
  .hpfcutoff(7571.0).hpfpeak(0.11).hpfenv(-3.36)
  .lpfcutoff(20).lpfpeak(0.67).lpfenv(-0.16).lpfmg(0.2)
  .drive(1.5)
  .eg1attack(0.0363).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0209).eg2decay(0.0132).eg2sustain(0.92).eg2release(0.1)
  .mgfreq(0.88).mgwave("saw")
  .pitcheg(10.08)
  .modmatrix([{src:18, dst:33}, {src:5, dst:10}])
  .gain(0.6);

export const ms20_elektrash_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.667).vco1pw(0.079)
  .vco2wave("tri").vco2level(0.5).vco2tune(-8.4)
  .noiselevel(1.0)
  .hpfcutoff(20000.0).hpfpeak(0.3).hpfenv(-1.92)
  .lpfcutoff(20).lpfpeak(0.63).lpfenv(-1.76)
  .drive(1.5)
  .eg1attack(0.0275).eg1release(2.5119).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.25).mgwave("tri")
  .pitcheg(9.84)
  .modmatrix([{src:14, dst:27}, {src:12, dst:1}, {src:0, dst:16}])
  .gain(0.6);

export const ms20_pwm_lead_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.333).vco1pw(0.108)
  .vco2wave("saw").vco2level(0.5).vco2tune(-3.12)
  .noiselevel(1.0)
  .hpfcutoff(5189.1).hpfpeak(0.46).hpfenv(-4.64).hpfmg(0.65)
  .lpfcutoff(20).lpfpeak(0.76)
  .drive(1.5)
  .eg1attack(0.4365).eg1release(0.0076).eg1rev(1)
  .eg2attack(0.0251).eg2decay(0.0275).eg2sustain(0.68).eg2release(0.001)
  .mgfreq(0.29).mgwave("tri")
  .pitcheg(19.68)
  .portamento(0.008)
  .modmatrix([{src:14, dst:27}, {src:12, dst:1}, {src:0, dst:16}, {src:3, dst:30}, {src:9, dst:15}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.0).vco1pw(0.794)
  .vco2wave("saw").vco2level(0.508).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(313.6).hpfpeak(0.0).hpfenv(-8.0)
  .lpfcutoff(20).lpfpeak(1.0)
  .drive(1.5)
  .eg1attack(1.556).eg1release(0.001)
  .eg2attack(0.2535).eg2decay(10.0).eg2sustain(1.0).eg2release(0.001)
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(2.0).vco1level(0.333)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(1964.3).hpfpeak(0.38).hpfenv(-6.24)
  .lpfcutoff(85.3).lpfpeak(0.75).lpfenv(0.48)
  .drive(1.5)
  .eg1attack(0.0058).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0076).eg2decay(0.0398).eg2sustain(0.74).eg2release(0.1)
  .mgfreq(0.65).mgwave("tri")
  .portamento(0.083)
  .modmatrix([{src:3, dst:23}, {src:17, dst:7}, {src:6, dst:4}, {src:8, dst:2}, {src:9, dst:15}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333)
  .vco2wave("sine").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(457.5).hpfpeak(0.15).hpfenv(-7.92)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-0.32)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0)
  .eg2attack(0.0025).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(1.64).mgwave("tri")
  .portamento(0.083)
  .modmatrix([{src:6, dst:4}, {src:2, dst:1}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333).vco1pw(0.089)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.508).vco2tune(-7.44)
  .noiselevel(1.0)
  .hpfcutoff(1027.9).hpfpeak(0.636).hpfenv(-1.12)
  .lpfcutoff(550.8).lpfpeak(0.637).lpfenv(-0.48)
  .drive(1.5)
  .eg1attack(0.0331).eg1release(0.0036)
  .eg2attack(0.0437).eg2decay(0.0479).eg2sustain(0.44).eg2release(0.001)
  .pitcheg(4.8)
  .modmatrix([{src:0, dst:11}, {src:9, dst:15}, {src:19, dst:3}])
  .gain(0.6);

export const ms20_analog_bass_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.333)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(252.7).hpfpeak(0.4).hpfenv(-3.52)
  .lpfcutoff(20).lpfpeak(0.66).lpfenv(0.16)
  .drive(1.5)
  .eg1attack(0.0145).eg1release(0.0832).eg1rev(1)
  .eg2attack(0.0145).eg2decay(0.0014).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.31).mgwave("tri")
  .portamento(0.01)
  .modmatrix([{src:3, dst:23}, {src:9, dst:15}, {src:14, dst:27}, {src:12, dst:1}, {src:0, dst:16}])
  .gain(0.6);

export const ms20_solid_bass_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.5).vco1level(0.333)
  .vco2wave("tri").vco2scale(0.25).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.59)
  .ringmod(0.3)
  .hpfcutoff(65.6).hpfpeak(0.51).hpfenv(-0.64)
  .lpfcutoff(20).lpfpeak(1.0).lpfenv(-1.92)
  .drive(1.5)
  .eg1attack(0.0437).eg1release(0.001).eg1rev(1)
  .eg2attack(0.1318).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .portamento(2.833)
  .modmatrix([{src:14, dst:27}, {src:5, dst:16}, {src:1, dst:12}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(2.0).vco1level(0.333)
  .vco2wave("saw").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.53)
  .ringmod(0.49)
  .hpfcutoff(3861.4).hpfpeak(0.0).hpfenv(-4.32)
  .lpfcutoff(20).lpfpeak(0.75)
  .drive(1.5)
  .eg1attack(0.001).eg1release(10.0)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(0.397).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .pitcheg(6.0)
  .pitchmg(1.08)
  .modmatrix([{src:14, dst:27}, {src:9, dst:16}, {src:12, dst:23}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(2.0).vco1level(0.667)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.48)
  .hpfcutoff(20000.0).hpfpeak(0.0).hpfenv(-7.92)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-0.16)
  .drive(1.5)
  .eg1attack(0.1).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0025).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(1.64).mgwave("saw")
  .portamento(0.083)
  .modmatrix([{src:9, dst:30}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0)
  .vco2wave("square").vco2scale(0.25).vco2level(0.5).vco2tune(-12.0)
  .hpfcutoff(90.6).hpfpeak(0.89).hpfenv(-8.0)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-8.0)
  .drive(1.5)
  .eg1attack(0.0076).eg1release(0.001)
  .eg2attack(0.001).eg2decay(0.1096).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .pitcheg(13.2)
  .modmatrix([{src:3, dst:29}, {src:14, dst:27}, {src:12, dst:10}, {src:21, dst:16}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(1.0)
  .vco2wave("square").vco2level(0.5).vco2tune(-12.0)
  .hpfcutoff(632.5).hpfpeak(0.85).hpfenv(-4.0)
  .lpfcutoff(158.9).lpfpeak(0.0)
  .drive(1.5)
  .eg1attack(0.011).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0076).eg2decay(0.0575).eg2sustain(0.26).eg2release(0.1)
  .mgfreq(0.39).mgwave("saw")
  .modmatrix([{src:14, dst:27}, {src:0, dst:16}, {src:1, dst:12}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.333)
  .vco2wave("tri").vco2scale(0.25).vco2level(0.506).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(1.0)
  .hpfcutoff(2073.3).hpfpeak(0.68).hpfenv(-8.0)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(8.0).lpfmg(1.0)
  .drive(1.5)
  .eg1attack(0.001).eg1release(10.0)
  .eg2attack(0.1).eg2decay(10.0).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(50.0).mgwave("sine")
  .pitcheg(12.24)
  .portamento(5.0)
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.667).vco1pw(0.667)
  .vco2wave("saw").vco2level(0.508).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.191)
  .hpfcutoff(1670.7).hpfpeak(0.28).hpfenv(-5.44).hpfmg(0.24)
  .lpfcutoff(20).lpfpeak(0.49).lpfenv(0.96)
  .drive(1.5)
  .eg1attack(0.0398).eg1release(0.1096)
  .eg2attack(0.1738).eg2decay(1.5849).eg2sustain(1.0).eg2release(0.001)
  .modmatrix([{src:28, dst:18}, {src:12, dst:1}, {src:14, dst:27}, {src:3, dst:16}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.25).vco1level(0.333).vco1pw(0.128)
  .vco2wave("saw").vco2level(0.5).vco2tune(-6.0)
  .noiselevel(1.0)
  .hpfcutoff(20000.0).hpfpeak(0.25).hpfenv(-6.24)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(1.44)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0).eg1rev(1)
  .eg2attack(0.0275).eg2decay(0.001).eg2sustain(0.0).eg2release(0.001)
  .portamento(0.1)
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.25).vco1level(0.333).vco1pw(0.284)
  .vco2wave("saw").vco2level(0.5).vco2tune(-4.08)
  .noiselevel(1.0)
  .hpfcutoff(6101.1).hpfpeak(0.56).hpfenv(-7.92)
  .lpfcutoff(276.1).lpfpeak(0.34).lpfenv(-0.32)
  .drive(1.5)
  .eg1attack(0.2512).eg1release(0.0023)
  .eg2attack(0.0398).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(0.83).mgwave("saw")
  .portamento(2.083)
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.25).vco1level(0.333)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(313.6).hpfpeak(0.39).hpfenv(-8.0)
  .lpfcutoff(4688.5).lpfpeak(0.88).lpfenv(-8.0)
  .drive(1.5)
  .eg1attack(0.0069).eg1release(0.912)
  .eg2attack(0.0209).eg2decay(3.02).eg2sustain(0.0).eg2release(0.001)
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(2.0).vco1level(0.0)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(118.7).hpfpeak(1.0).hpfenv(-7.92)
  .lpfcutoff(479.8).lpfpeak(0.0).lpfenv(8.0)
  .drive(1.5)
  .eg1attack(0.0028).eg1release(0.0021)
  .eg2attack(0.0044).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(0.24).mgwave("tri")
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333).vco1pw(0.69)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.508).vco2tune(-6.72)
  .noiselevel(1.0)
  .hpfcutoff(32.5).hpfpeak(0.0).hpfenv(-2.24)
  .lpfcutoff(11508.8).lpfpeak(0.76).lpfmg(0.701)
  .drive(1.5)
  .eg1attack(0.1096).eg1release(0.1096)
  .eg2attack(0.1585).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .pitcheg(12.72)
  .portamento(2.917)
  .modmatrix([{src:0, dst:10}, {src:13, dst:27}, {src:17, dst:31}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.667).vco1pw(0.49)
  .vco2wave("tri").vco2level(0.5).vco2tune(-8.16)
  .noiselevel(1.0)
  .hpfcutoff(20000.0).hpfpeak(0.0).hpfenv(-7.68)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-0.32)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0).eg1rev(1)
  .eg2attack(0.01).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(0.39).mgwave("saw")
  .portamento(0.042)
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.333).vco1pw(0.079)
  .vco2wave("saw").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(1421.0).hpfpeak(0.0).hpfenv(-3.2)
  .lpfcutoff(20).lpfpeak(1.0).lpfenv(-0.16)
  .drive(1.5)
  .eg1attack(0.0174).eg1release(0.8318).eg1rev(1)
  .eg2attack(0.0028).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.667)
  .vco2wave("square").vco2level(0.5).vco2tune(-6.96)
  .noiselevel(1.0)
  .hpfcutoff(704.5).hpfpeak(0.09).hpfenv(-4.32)
  .lpfcutoff(20).lpfpeak(0.67).lpfenv(-0.16).lpfmg(0.27)
  .drive(1.5)
  .eg1attack(0.0398).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0437).eg2decay(0.0191).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(1.0).mgwave("saw")
  .portamento(0.033)
  .modmatrix([{src:13, dst:27}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.0)
  .vco2wave("square").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(6796.4).hpfpeak(0.0).hpfenv(2.88)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-4.0)
  .drive(1.5)
  .eg1attack(0.0158).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0363).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(1.64).mgwave("saw")
  .portamento(1.167)
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(2.0).vco1level(0.0)
  .vco2wave("tri").vco2scale(0.25).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.59)
  .hpfcutoff(509.7).hpfpeak(0.0).hpfenv(3.43)
  .lpfcutoff(20000.0).lpfpeak(0.0).lpfenv(-8.0)
  .drive(1.5)
  .eg1attack(0.0631).eg1release(10.0).eg1rev(1)
  .eg2attack(0.0058).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .pitchmg(0.48)
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(3369.7).hpfpeak(0.58)
  .lpfcutoff(20).lpfpeak(0.4).lpfmg(0.14)
  .drive(1.5)
  .eg1attack(0.001).eg1release(0.1)
  .eg2attack(0.0025).eg2decay(0.0022).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .pitcheg(3.6)
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(1.0)
  .vco2wave("square").vco2level(0.5).vco2tune(-12.0)
  .hpfcutoff(632.5).hpfpeak(0.85).hpfenv(-4.0)
  .lpfcutoff(158.9).lpfpeak(0.0)
  .drive(1.5)
  .eg1attack(0.011).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0076).eg2decay(0.0575).eg2sustain(0.26).eg2release(0.1)
  .mgfreq(0.39).mgwave("saw")
  .modmatrix([{src:14, dst:27}, {src:0, dst:16}, {src:1, dst:12}])
  .gain(0.6);

export const ms20_arpeggio_pad_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("sine").vco1level(0.333)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.49).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(252.7).hpfpeak(0.3).hpfenv(-1.76)
  .lpfcutoff(4375.5).lpfpeak(0.74).lpfenv(8.0).lpfmg(0.06)
  .drive(1.5)
  .eg1attack(0.001).eg1release(10.0).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.1)
  .mgfreq(0.31).mgwave("tri")
  .pitcheg(5.76)
  .portamento(0.083)
  .modmatrix([{src:2, dst:19}, {src:7, dst:3}, {src:4, dst:6}, {src:10, dst:0}, {src:34, dst:18}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1level(0.667)
  .vco2wave("square").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(281.5).hpfpeak(0.6).hpfenv(-2.24)
  .lpfcutoff(20).lpfpeak(1.0)
  .drive(1.5)
  .eg1attack(0.0091).eg1release(0.5248).eg1rev(1)
  .eg2attack(0.0331).eg2decay(0.0759).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(0.17).mgwave("saw")
  .portamento(0.083)
  .modmatrix([{src:13, dst:10}, {src:9, dst:16}, {src:12, dst:7}, {src:15, dst:2}, {src:3, dst:30}, {src:14, dst:27}, {src:6, dst:4}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.25).vco1level(0.667)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(2231.8).hpfpeak(0.07).hpfenv(1.76)
  .lpfcutoff(5023.8).lpfpeak(0.0).lpfenv(-8.0)
  .drive(1.5)
  .eg1attack(0.0191).eg1release(0.0011).eg1rev(1)
  .eg2attack(0.0229).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.333)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.86)
  .hpfcutoff(3192.7).hpfpeak(0.0).hpfenv(-6.24)
  .lpfcutoff(833.7).lpfpeak(0.24).lpfmg(0.24)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(1.06).mgwave("tri")
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.0)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.508).vco2tune(-12.0)
  .hpfcutoff(7990.8).hpfpeak(0.2).hpfenv(-8.0)
  .lpfcutoff(20000.0).lpfpeak(0.0).lpfenv(-8.0).lpfmg(0.03)
  .drive(1.5)
  .eg1attack(0.0398).eg1release(0.001)
  .eg2attack(3.02).eg2decay(10.0).eg2sustain(1.0).eg2release(0.001)
  .pitcheg(17.04)
  .modmatrix([{src:3, dst:1}, {src:26, dst:34}, {src:13, dst:19}, {src:9, dst:23}, {src:21, dst:10}])
  .gain(0.6);

export const ms20_retro_strings_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1level(1.0).vco1pw(0.49)
  .vco2wave("square").vco2level(0.51).vco2tune(-7.92)
  .noiselevel(1.0)
  .hpfcutoff(1499.8).hpfpeak(0.26).hpfenv(-1.92)
  .lpfcutoff(20).lpfpeak(1.0)
  .drive(1.5)
  .eg1attack(0.0525).eg1release(0.2089).eg1rev(1)
  .eg2attack(0.0363).eg2decay(0.0013).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.29).mgwave("saw")
  .pitcheg(8.88)
  .modmatrix([{src:22, dst:13}, {src:10, dst:17}, {src:3, dst:23}, {src:9, dst:15}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(1.0)
  .vco2wave("sine").vco2level(0.508).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(184.8).hpfpeak(0.0).hpfenv(-0.8).hpfmg(0.3)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-8.0).lpfmg(0.42)
  .drive(1.5)
  .eg1attack(0.7586).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0479).eg2decay(10.0).eg2sustain(1.0).eg2release(0.001)
  .portamento(0.1)
  .modmatrix([{src:9, dst:16}, {src:29, dst:3}, {src:14, dst:27}, {src:12, dst:8}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.0)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.506).vco2tune(-12.0)
  .hpfcutoff(30.8).hpfpeak(1.0).hpfenv(-8.0)
  .lpfcutoff(138.4).lpfpeak(0.5).lpfenv(-8.0)
  .drive(1.5)
  .eg1attack(0.0014).eg1release(0.001)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .modmatrix([{src:10, dst:21}, {src:0, dst:31}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333)
  .vco2wave("square").vco2level(0.5).vco2tune(-7.92)
  .noiselevel(1.0)
  .hpfcutoff(433.5).hpfpeak(0.09).hpfenv(-7.92)
  .lpfcutoff(2193.0).lpfpeak(0.72).lpfenv(5.44)
  .drive(1.5)
  .eg1attack(0.0174).eg1release(0.001)
  .eg2attack(0.0076).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(0.5).mgwave("saw")
  .pitcheg(9.84)
  .modmatrix([{src:1, dst:17}, {src:21, dst:10}, {src:13, dst:27}])
  .gain(0.6);

export const ms20_analog_guitar_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1level(0.333)
  .vco2wave("saw").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(101.0).hpfpeak(0.36).hpfenv(-8.0)
  .lpfcutoff(4688.5).lpfpeak(1.0).lpfenv(-8.0).lpfmg(0.59)
  .drive(1.5)
  .eg1attack(0.1096).eg1release(0.004).eg1rev(1)
  .eg2attack(0.0023).eg2decay(0.001).eg2sustain(0.58).eg2release(0.001)
  .pitcheg(3.84)
  .modmatrix([{src:11, dst:0}, {src:14, dst:27}, {src:17, dst:16}, {src:1, dst:12}])
  .gain(0.6);

export const ms20_elektrash_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.667).vco1pw(0.079)
  .vco2wave("tri").vco2level(0.5).vco2tune(-8.4)
  .noiselevel(1.0)
  .hpfcutoff(3024.9).hpfpeak(0.3).hpfenv(-1.92)
  .lpfcutoff(20).lpfpeak(0.63).lpfenv(-1.76)
  .drive(1.5)
  .eg1attack(0.0275).eg1release(0.1738).eg1rev(1)
  .eg2attack(0.0025).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .pitcheg(9.84)
  .modmatrix([{src:14, dst:27}, {src:12, dst:1}, {src:0, dst:16}])
  .gain(0.6);

export const ms20_sample_hold_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.667).vco1pw(0.196)
  .vco2wave("saw").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(20000.0).hpfpeak(0.29).hpfenv(-5.12)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(1.44)
  .drive(1.5)
  .eg1attack(0.0158).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0191).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.5).vco1level(0.0).vco1pw(0.128)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.54)
  .hpfcutoff(77.1).hpfpeak(0.67).hpfenv(-0.16)
  .lpfcutoff(20).lpfpeak(1.0).lpfenv(1.44)
  .drive(1.5)
  .eg1attack(0.011).eg1release(0.0132)
  .eg2attack(0.0044).eg2decay(0.4994).eg2sustain(0.58).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .pitcheg(24.0)
  .gain(0.6);

export const ms20_technostress_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.0)
  .vco2wave("saw").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .hpfcutoff(47.4).hpfpeak(0.5).hpfenv(-5.92)
  .lpfcutoff(20).lpfpeak(0.51)
  .drive(1.5)
  .eg1attack(0.001).eg1release(10.0).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001).eg2rev(1)
  .pitcheg(7.68)
  .modmatrix([{src:10, dst:17}, {src:23, dst:12}, {src:9, dst:16}, {src:13, dst:27}])
  .gain(0.6);

export const ms20_morphing_arpline_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(81.4).hpfpeak(0.63)
  .lpfcutoff(112.5).lpfpeak(0.67)
  .drive(1.5)
  .eg1attack(0.0229).eg1release(0.001).eg1rev(1)
  .eg2attack(0.0063).eg2decay(0.0083).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.57).mgwave("tri")
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333).vco1pw(0.039)
  .vco2wave("sine").vco2level(0.5).vco2tune(-6.72)
  .noiselevel(1.0)
  .hpfcutoff(281.5).hpfpeak(0.42).hpfenv(-2.24)
  .lpfcutoff(20).lpfpeak(0.86)
  .drive(1.5)
  .eg1attack(0.0251).eg1release(0.0437)
  .eg2attack(0.0016).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.54).mgwave("tri")
  .pitcheg(24.0)
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.333).vco1pw(0.549)
  .vco2wave("saw").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(281.5).hpfpeak(0.32).hpfenv(-7.92)
  .lpfcutoff(20).lpfpeak(0.71).lpfenv(-0.16)
  .drive(1.5)
  .eg1attack(10.0).eg1release(0.0048).eg1rev(1)
  .eg2attack(0.631).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(0.42).mgwave("sine")
  .portamento(0.083)
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333)
  .vco2wave("tri").vco2level(0.5).vco2tune(-0.24)
  .noiselevel(1.0)
  .hpfcutoff(2309.6).hpfpeak(0.22).hpfenv(-2.72)
  .lpfcutoff(20).lpfpeak(0.0).lpfmg(0.8)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0)
  .eg2attack(0.011).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.2).mgwave("sine")
  .pitcheg(12.72)
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.667)
  .vco2wave("tri").vco2scale(0.25).vco2level(0.508).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.7)
  .hpfcutoff(4413.5).hpfpeak(0.07).hpfenv(-8.0)
  .lpfcutoff(20).lpfpeak(0.0).lpfmg(0.53)
  .drive(1.5)
  .eg1attack(0.0209).eg1release(0.001)
  .eg2attack(0.001).eg2decay(1.0965).eg2sustain(1.0).eg2release(0.001)
  .pitcheg(8.64)
  .modmatrix([{src:13, dst:10}, {src:3, dst:30}, {src:9, dst:8}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("sine").vco1scale(0.5).vco1level(0.333).vco1pw(0.177)
  .vco2wave("saw").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(433.5).hpfpeak(0.61).hpfenv(-7.92)
  .lpfcutoff(417.9).lpfpeak(0.7).lpfenv(0.48)
  .drive(1.5)
  .eg1attack(0.001).eg1release(0.0083)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .portamento(5.0)
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(2.0).vco1level(0.0)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(667.5).hpfpeak(1.0).hpfenv(-7.92)
  .lpfcutoff(2517.9).lpfpeak(0.0).lpfenv(-0.16)
  .drive(1.5)
  .eg1attack(0.0028).eg1release(0.001).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(0.24).mgwave("tri")
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.333).vco1pw(0.284)
  .vco2wave("square").vco2scale(0.5).vco2level(0.508).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.08)
  .hpfcutoff(1275.6).hpfpeak(0.19).hpfenv(-0.16)
  .lpfcutoff(20).lpfpeak(0.43).lpfmg(0.41)
  .drive(1.5)
  .eg1attack(0.0048).eg1release(10.0)
  .eg2attack(0.0229).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .pitcheg(4.08)
  .portamento(2.083)
  .modmatrix([{src:12, dst:1}, {src:14, dst:27}, {src:5, dst:16}, {src:17, dst:10}])
  .gain(0.6);

export const ms20_pulse_pad_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.667)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.31)
  .hpfcutoff(173.2).hpfpeak(0.24).hpfenv(-3.05)
  .lpfcutoff(20).lpfpeak(0.35).lpfenv(8.0)
  .drive(1.5)
  .eg1attack(0.011).eg1release(0.1202).eg1rev(1)
  .eg2attack(0.0025).eg2decay(0.012).eg2sustain(1.0).eg2release(0.001)
  .pitcheg(6.29)
  .modmatrix([{src:10, dst:17}, {src:20, dst:0}, {src:16, dst:3}, {src:29, dst:12}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.5).vco1level(0.667)
  .vco2wave("saw").vco2level(0.5).vco2tune(-2.88)
  .noiselevel(1.0)
  .ringmod(0.43)
  .hpfcutoff(667.5).hpfpeak(0.48).hpfenv(-4.32)
  .lpfcutoff(105.0).lpfpeak(0.0).lpfenv(2.88)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.5).vco1level(0.667)
  .vco2wave("tri").vco2scale(2.0).vco2level(0.5).vco2tune(-2.88)
  .noiselevel(1.0)
  .hpfcutoff(3556.6).hpfpeak(0.45).hpfenv(-2.4)
  .lpfcutoff(120.5).lpfpeak(0.74).lpfenv(0.32).lpfmg(0.17)
  .drive(1.5)
  .eg1attack(0.0692).eg1release(0.6918).eg1rev(1)
  .eg2attack(0.1445).eg2decay(0.0021).eg2sustain(0.93).eg2release(0.1)
  .pitcheg(14.4)
  .portamento(0.083)
  .modmatrix([{src:3, dst:23}, {src:10, dst:13}, {src:31, dst:17}, {src:9, dst:15}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.5).vco1level(0.333).vco1pw(0.147)
  .vco2wave("saw").vco2scale(2.0).vco2level(0.5).vco2tune(-5.28)
  .noiselevel(0.63)
  .hpfcutoff(2073.3).hpfpeak(0.54).hpfenv(-2.56)
  .lpfcutoff(20).lpfpeak(0.32)
  .drive(1.5)
  .eg1attack(0.0363).eg1release(0.2291)
  .eg2attack(0.0275).eg2decay(0.2586).eg2sustain(0.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .pitcheg(17.28)
  .modmatrix([{src:14, dst:27}, {src:12, dst:1}, {src:0, dst:16}, {src:21, dst:10}, {src:5, dst:6}])
  .gain(0.6);

export const ms20_elektrash_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.667).vco1pw(0.079)
  .vco2wave("sine").vco2level(0.5).vco2tune(-8.4)
  .noiselevel(1.0)
  .hpfcutoff(65.6).hpfpeak(0.33).hpfenv(-8.0)
  .lpfcutoff(20).lpfpeak(0.7).lpfenv(8.0)
  .drive(1.5)
  .eg1attack(0.011).eg1release(0.001).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.0251).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(2.69).mgwave("tri")
  .pitcheg(9.84)
  .portamento(0.083)
  .modmatrix([{src:6, dst:26}])
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(1.0)
  .vco2wave("tri").vco2level(0.5).vco2tune(-5.28)
  .hpfcutoff(632.5).hpfpeak(1.0).hpfenv(-3.04)
  .lpfcutoff(22.6).lpfpeak(0.1).lpfmg(0.5)
  .drive(1.5)
  .eg1attack(0.0021).eg1release(10.0).eg1rev(1)
  .eg2attack(0.0028).eg2decay(1.0965).eg2sustain(1.0).eg2release(0.0912)
  .mgfreq(0.22).mgwave("saw")
  .modmatrix([{src:14, dst:27}, {src:12, dst:23}, {src:3, dst:16}, {src:9, dst:15}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0).vco1pw(0.03)
  .vco2wave("sine").vco2level(0.5).vco2tune(-3.12)
  .noiselevel(1.0)
  .hpfcutoff(313.6).hpfpeak(0.89).hpfenv(-5.12)
  .lpfcutoff(20).lpfpeak(0.22).lpfenv(0.32)
  .drive(1.5)
  .eg1attack(0.0251).eg1release(10.0).eg1rev(1)
  .eg2attack(0.0011).eg2decay(0.912).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(2.69).mgwave("tri")
  .pitcheg(0.72)
  .portamento(2.933)
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(1.0)
  .vco2wave("saw").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.77)
  .hpfcutoff(3753.8).hpfpeak(0.0).hpfenv(-5.76)
  .lpfcutoff(417.9).lpfpeak(0.22).lpfenv(-5.6)
  .drive(1.5)
  .eg1attack(0.001).eg1release(0.0191)
  .eg2attack(0.2754).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.54).mgwave("saw")
  .gain(0.6);

export const ms20_synthetic_snore_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333).vco1pw(0.314)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.27)
  .hpfcutoff(331.0).hpfpeak(0.0).hpfenv(-7.92)
  .lpfcutoff(20).lpfpeak(0.83).lpfenv(-0.16).lpfmg(0.21)
  .drive(1.5)
  .eg1attack(0.2512).eg1release(0.0912).eg1rev(1)
  .eg2attack(0.0145).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(0.37).mgwave("saw")
  .pitcheg(15.84)
  .portamento(0.083)
  .modmatrix([{src:5, dst:7}, {src:2, dst:6}, {src:4, dst:27}])
  .gain(0.6);

export const ms20_init_program_factory2 = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.5).vco1level(0.667).vco1pw(0.373)
  .vco2wave("saw").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(3753.8).hpfpeak(0.07).hpfenv(-7.84)
  .lpfcutoff(677.7).lpfpeak(1.0).lpfenv(-2.88).lpfmg(0.7)
  .drive(1.5)
  .eg1attack(10.0).eg1release(0.6918)
  .eg2attack(0.4786).eg2decay(2.1544).eg2sustain(1.0).eg2release(0.001)
  .pitcheg(17.28)
  .pitchmg(1.92)
  .gain(0.6);

export const ms20_n5th_level = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.5).vco1level(0.333)
  .vco2wave("square").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(15204.9).hpfpeak(0.45)
  .lpfcutoff(20).lpfpeak(0.32).lpfenv(0.63)
  .drive(1.5)
  .eg1attack(0.5754).eg1release(1.4454).eg1rev(1)
  .eg2attack(0.0174).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .portamento(2.917)
  .gain(0.6);

export const ms20_n70schords = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1level(0.667)
  .vco2wave("tri").vco2level(0.508).vco2tune(-2.86)
  .noiselevel(0.635)
  .hpfcutoff(928.3).hpfpeak(0.651).hpfenv(-7.49)
  .lpfcutoff(78.8).lpfpeak(0.0).lpfenv(-6.35).lpfmg(0.151)
  .drive(1.5)
  .eg1attack(0.001).eg1release(10.0).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.47).mgwave("sine")
  .portamento(0.079)
  .gain(0.6);

export const ms20_n70s_lead = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.25).vco1level(0.333)
  .vco2wave("saw").vco2scale(0.25).vco2level(0.51).vco2tune(-1.14)
  .noiselevel(0.333)
  .hpfcutoff(20000.0).hpfpeak(0.0).hpfenv(-8.0).hpfmg(0.413)
  .lpfcutoff(1439.4).lpfpeak(0.0).lpfenv(-8.0).lpfmg(0.754)
  .drive(1.5)
  .eg1attack(0.001).eg1release(10.0).eg1rev(1)
  .eg2attack(0.001).eg2decay(10.0).eg2sustain(0.762).eg2release(0.0173).eg2rev(1)
  .mgfreq(0.61).mgwave("saw")
  .portamento(5.0)
  .modmatrix([{src:29, dst:3}])
  .gain(0.6);

export const ms20_n9ths = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.333)
  .vco2wave("square").vco2scale(0.5).vco2level(0.508).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(3101.0).hpfpeak(0.563).hpfenv(-2.29).hpfmg(1.0)
  .lpfcutoff(1439.4).lpfpeak(0.0).lpfenv(-0.25).lpfmg(0.992)
  .drive(1.5)
  .eg1attack(0.001).eg1release(10.0).eg1rev(1)
  .eg2attack(0.001).eg2decay(10.0).eg2sustain(0.762).eg2release(0.0268)
  .mgfreq(0.61).mgwave("saw")
  .pitcheg(24.0)
  .portamento(0.397)
  .modmatrix([{src:6, dst:0}])
  .gain(0.6);

export const ms20_absolutekaoss = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.5).vco1level(0.333).vco1pw(0.902)
  .vco2wave("saw").vco2scale(0.5).vco2level(0.5).vco2tune(-4.8)
  .noiselevel(1.0)
  .hpfcutoff(226.8).hpfpeak(1.0).hpfmg(0.032)
  .lpfcutoff(1025.7).lpfpeak(1.0).lpfenv(-0.32).lpfmg(0.087)
  .drive(1.5)
  .eg1attack(0.0759).eg1release(1.9055)
  .eg2attack(1.7378).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(1.74).mgwave("saw")
  .pitcheg(13.33)
  .pitchmg(12.0)
  .portamento(5.0)
  .modmatrix([{src:6, dst:4}, {src:13, dst:10}, {src:19, dst:2}, {src:17, dst:7}])
  .gain(0.6);

export const ms20_accordian = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.667).vco1pw(0.212)
  .vco2wave("square").vco2level(0.508).vco2tune(-10.1)
  .noiselevel(0.635)
  .hpfcutoff(3460.4).hpfpeak(0.579).hpfenv(-8.0)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-0.63).lpfmg(0.206)
  .drive(1.5)
  .eg1attack(0.001).eg1release(10.0).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.47).mgwave("sine")
  .portamento(0.079)
  .gain(0.6);

export const ms20_adiratobass = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.0)
  .vco2wave("saw").vco2scale(0.25).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(1696.7).hpfpeak(0.63)
  .lpfcutoff(21.4).lpfpeak(0.0).lpfenv(8.0)
  .drive(1.5)
  .eg1attack(0.0132).eg1release(0.5248).eg1rev(1)
  .eg2attack(0.0076).eg2decay(1.9055).eg2sustain(0.45).eg2release(0.1318).eg2rev(1)
  .mgfreq(0.42).mgwave("tri")
  .modmatrix([{src:3, dst:7}, {src:23, dst:2}, {src:19, dst:4}, {src:24, dst:34}, {src:17, dst:28}])
  .gain(0.6);

export const ms20_analogalead = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.667)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-2.1)
  .noiselevel(1.0)
  .hpfcutoff(2490.4).hpfpeak(0.595).hpfenv(-7.92)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-0.63).lpfmg(0.22)
  .drive(1.5)
  .eg1attack(0.1).eg1release(0.302).eg1rev(1)
  .eg2attack(0.0302).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .mgfreq(1.64).mgwave("square")
  .pitcheg(3.12)
  .pitchmg(0.6)
  .portamento(5.0)
  .gain(0.6);

export const ms20_baddreams = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.667).vco1pw(0.412)
  .vco2wave("square").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(7057.5).hpfpeak(0.36)
  .lpfcutoff(69.3).lpfpeak(0.78).lpfenv(2.56).lpfmg(0.103)
  .drive(1.5)
  .eg1attack(0.0174).eg1release(0.0132).eg1rev(1)
  .eg2attack(0.912).eg2decay(10.0).eg2sustain(0.0).eg2release(0.0525)
  .mgfreq(0.33).mgwave("tri")
  .pitcheg(6.84)
  .pitchmg(2.76)
  .modmatrix([{src:29, dst:3}, {src:13, dst:28}])
  .gain(0.6);

export const ms20_bassguitar = (pat) => pat
  .s("ms20")
  .vco1wave("sine").vco1scale(0.25).vco1level(0.0)
  .vco2wave("square").vco2scale(0.25).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(313.6).hpfpeak(0.429).hpfenv(-7.92)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-1.02)
  .drive(1.5)
  .eg1attack(0.2404).eg1release(0.001).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.009).eg2sustain(1.0).eg2release(0.0289)
  .pitcheg(2.67)
  .gain(0.6);

export const ms20_bassinyourface = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.25).vco1level(0.333).vco1pw(0.314)
  .vco2wave("square").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(85.9).hpfpeak(0.52).hpfmg(0.44)
  .lpfcutoff(20).lpfpeak(1.0).lpfenv(4.48).lpfmg(0.24)
  .drive(1.5)
  .eg1attack(0.0229).eg1release(0.1585).eg1rev(1)
  .eg2attack(0.1585).eg2decay(3.02).eg2sustain(0.64).eg2release(0.0692)
  .mgfreq(0.57).mgwave("tri")
  .pitcheg(8.16)
  .modmatrix([{src:17, dst:31}])
  .gain(0.6);

export const ms20_beatmaker = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(2.0).vco1level(0.333)
  .vco2wave("saw").vco2scale(0.25).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(7875.3).hpfpeak(0.55)
  .lpfcutoff(20).lpfpeak(0.0)
  .drive(1.5)
  .eg1attack(0.0076).eg1release(0.0028).eg1rev(1)
  .eg2attack(0.011).eg2decay(0.0479).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .pitcheg(24.0)
  .pitchmg(0.72)
  .gain(0.6);

export const ms20_beeo = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.667)
  .vco2wave("sine").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.595)
  .hpfcutoff(2935.6).hpfpeak(0.595).hpfenv(-7.92)
  .lpfcutoff(4079.0).lpfpeak(0.024).lpfenv(-8.0).lpfmg(0.643)
  .drive(1.5)
  .eg1attack(0.001).eg1release(0.0112).eg1rev(1)
  .eg2attack(0.0268).eg2decay(0.0289).eg2sustain(0.0).eg2release(0.0289)
  .mgfreq(0.57).mgwave("square")
  .pitchmg(0.6)
  .portamento(5.0)
  .modmatrix([{src:29, dst:3}, {src:24, dst:34}, {src:5, dst:8}])
  .gain(0.6);

export const ms20_bitty = (pat) => pat
  .s("ms20")
  .vco1wave("sine").vco1level(0.333)
  .vco2wave("saw").vco2level(0.59).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(1221.1).hpfpeak(1.0).hpfenv(0.38)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(1.02)
  .drive(1.5)
  .eg1attack(0.0054).eg1release(0.0062).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(0.0).eg2release(0.001)
  .pitchmg(0.76)
  .modmatrix([{src:29, dst:3}])
  .gain(0.6);

export const ms20_blast_off = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.25).vco1level(0.0)
  .vco2wave("sine").vco2scale(2.0).vco2level(0.51).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.619)
  .hpfcutoff(20000.0).hpfpeak(0.389).hpfenv(-8.0).hpfmg(0.413)
  .lpfcutoff(136.3).lpfpeak(0.056).lpfenv(8.0).lpfmg(0.754)
  .drive(1.5)
  .eg1attack(0.0864).eg1release(2.0026).eg1rev(1)
  .eg2attack(0.001).eg2decay(10.0).eg2sustain(0.762).eg2release(0.0173).eg2rev(1)
  .modmatrix([{src:29, dst:3}, {src:9, dst:8}, {src:14, dst:15}, {src:24, dst:20}])
  .gain(0.6);

export const ms20_braininvasion = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.5).vco1level(1.0).vco1pw(0.373)
  .vco2wave("sine").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(7990.8).hpfpeak(0.6).hpfmg(0.23)
  .lpfcutoff(23.0).lpfpeak(0.24).lpfmg(0.27)
  .drive(1.5)
  .eg1attack(0.2077).eg1release(10.0).eg1rev(1)
  .eg2attack(0.631).eg2decay(10.0).eg2sustain(0.825).eg2release(0.1076)
  .mgfreq(0.44).mgwave("saw")
  .pitcheg(18.29)
  .pitchmg(1.81)
  .portamento(0.025)
  .modmatrix([{src:2, dst:16}, {src:3, dst:7}, {src:10, dst:14}, {src:32, dst:4}, {src:5, dst:34}, {src:17, dst:20}, {src:29, dst:12}])
  .gain(0.6);

export const ms20_brokenmtrcycle = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.5).vco1level(1.0).vco1pw(0.632)
  .vco2wave("tri").vco2scale(2.0).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.73)
  .hpfcutoff(598.7).hpfpeak(1.0).hpfenv(-7.92).hpfmg(0.357)
  .lpfcutoff(38.6).lpfpeak(0.437).lpfenv(1.4)
  .drive(1.5)
  .eg1attack(0.0803).eg1release(10.0).eg1rev(1)
  .eg2attack(0.578).eg2decay(0.001).eg2sustain(0.968).eg2release(0.0289)
  .portamento(0.238)
  .modmatrix([{src:23, dst:9}, {src:29, dst:25}])
  .gain(0.6);

export const ms20_bubbles = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0)
  .vco2wave("square").vco2scale(2.0).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.4)
  .ringmod(0.58)
  .hpfcutoff(4658.2).hpfpeak(0.87).hpfenv(-3.68)
  .lpfcutoff(20000.0).lpfpeak(0.67).lpfenv(7.2)
  .drive(1.5)
  .eg1attack(0.001).eg1release(10.0).eg1rev(1)
  .eg2attack(0.631).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(50.0).mgwave("saw")
  .pitcheg(9.36)
  .modmatrix([{src:5, dst:0}])
  .gain(0.6);

export const ms20_bugsatnight = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.0).vco1pw(0.461)
  .vco2wave("square").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(2490.4).hpfpeak(0.69).hpfenv(-5.44).hpfmg(0.135)
  .lpfcutoff(45.8).lpfpeak(0.452).lpfenv(-8.0).lpfmg(0.302)
  .drive(1.5)
  .eg1attack(0.1931).eg1release(1.0372).eg1rev(1)
  .eg2attack(0.0416).eg2decay(0.2754).eg2sustain(0.76).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .pitchmg(1.81)
  .gain(0.6);

export const ms20_bumpy = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1level(0.0)
  .vco2wave("square").vco2scale(0.25).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(143.9).hpfpeak(0.389).hpfenv(-3.81)
  .lpfcutoff(4808.2).lpfpeak(0.143).lpfenv(-8.0)
  .drive(1.5)
  .eg1attack(0.0232).eg1release(0.833).eg1rev(1)
  .eg2attack(0.0448).eg2decay(0.0112).eg2sustain(0.325).eg2release(0.0289).eg2rev(1)
  .pitchmg(0.76)
  .portamento(0.667)
  .modmatrix([{src:21, dst:19}])
  .gain(0.6);

export const ms20_chopitup = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.25).vco1level(0.333)
  .vco2wave("tri").vco2scale(0.25).vco2level(0.5).vco2tune(-6.0)
  .noiselevel(0.52)
  .hpfcutoff(537.9).hpfpeak(0.65)
  .lpfcutoff(677.7).lpfpeak(0.91).lpfenv(-5.44)
  .drive(1.5)
  .eg1attack(10.0).eg1release(10.0)
  .eg2attack(0.001).eg2decay(10.0).eg2sustain(0.68).eg2release(0.2089).eg2rev(1)
  .mgfreq(0.11).mgwave("tri")
  .modmatrix([{src:12, dst:29}, {src:32, dst:14}, {src:0, dst:16}, {src:9, dst:30}])
  .gain(0.6);

export const ms20_classic_synth = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.5).vco1level(0.333).vco1pw(0.157)
  .vco2wave("tri").vco2level(0.505).vco2tune(-12.0)
  .noiselevel(0.91)
  .hpfcutoff(20000.0).hpfpeak(0.14).hpfenv(-0.64)
  .lpfcutoff(20).lpfpeak(0.22).lpfmg(0.21)
  .drive(1.5)
  .eg1attack(0.0091).eg1release(0.631).eg1rev(1)
  .eg2attack(0.0021).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .pitcheg(4.56)
  .modmatrix([{src:17, dst:11}])
  .gain(0.6);

export const ms20_combo_organ = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(1084.9).hpfpeak(0.53)
  .lpfcutoff(20).lpfpeak(0.0)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .gain(0.6);

export const ms20_crun_j = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.667)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.111)
  .hpfcutoff(2935.6).hpfpeak(0.595).hpfenv(-7.92)
  .lpfcutoff(20).lpfpeak(0.238).lpfenv(-0.63).lpfmg(0.22)
  .drive(1.5)
  .eg1attack(0.0016).eg1release(0.0645).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(0.93).eg2release(0.1)
  .pitcheg(3.12)
  .pitchmg(0.6)
  .portamento(5.0)
  .gain(0.6);

export const ms20_death_organ = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.5).vco1level(1.0)
  .vco2wave("tri").vco2scale(0.25).vco2level(0.51).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(2112.7).hpfpeak(0.762).hpfenv(-8.0).hpfmg(0.349)
  .lpfcutoff(20).lpfpeak(0.0).lpfmg(0.2)
  .drive(1.5)
  .eg1attack(0.1245).eg1release(10.0).eg1rev(1)
  .eg2attack(0.001).eg2decay(10.0).eg2sustain(0.476).eg2release(3.5938).eg2rev(1)
  .pitcheg(4.76)
  .modmatrix([{src:29, dst:3}, {src:9, dst:8}])
  .gain(0.6);

export const ms20_don_tgointhere = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(2.0).vco1level(0.333).vco1pw(0.177)
  .vco2wave("sine").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.786)
  .hpfcutoff(2073.3).hpfpeak(0.73)
  .lpfcutoff(20).lpfpeak(0.15).lpfenv(8.0).lpfmg(0.3)
  .drive(1.5)
  .eg1attack(0.0076).eg1release(1.9055).eg1rev(1)
  .eg2attack(4.7863).eg2decay(10.0).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .pitcheg(8.16)
  .gain(0.6);

export const ms20_fouronthefloor = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.333)
  .vco2wave("saw").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.86)
  .hpfcutoff(1763.4).hpfpeak(0.37).hpfmg(0.29)
  .lpfcutoff(20).lpfpeak(0.06).lpfenv(-8.0).lpfmg(0.18)
  .drive(1.5)
  .eg1attack(0.2291).eg1release(0.1096).eg1rev(1)
  .eg2attack(0.001).eg2decay(10.0).eg2sustain(0.484).eg2release(0.01).eg2rev(1)
  .mgfreq(0.65).mgwave("saw")
  .pitcheg(3.6)
  .pitchmg(1.56)
  .modmatrix([{src:2, dst:19}, {src:9, dst:7}, {src:1, dst:4}])
  .gain(0.6);

export const ms20_funwithmgs = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.667).vco1pw(0.098)
  .vco2wave("square").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.71)
  .hpfcutoff(5780.5).hpfpeak(0.56).hpfenv(-4.48)
  .lpfcutoff(170.2).lpfpeak(0.05).lpfenv(-5.76).lpfmg(1.0)
  .drive(1.5)
  .eg1attack(0.0174).eg1release(0.0398)
  .eg2attack(0.1318).eg2decay(1.7378).eg2sustain(0.55).eg2release(0.302).eg2rev(1)
  .mgfreq(1.28).mgwave("saw")
  .pitcheg(14.16)
  .pitchmg(2.76)
  .gain(0.6);

export const ms20_gnometime = (pat) => pat
  .s("ms20")
  .vco1wave("sine").vco1scale(0.25).vco1level(0.0)
  .vco2wave("tri").vco2scale(2.0).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(20000.0).hpfpeak(0.0).hpfenv(-7.92).hpfmg(0.357)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-4.06).lpfmg(0.341)
  .drive(1.5)
  .eg1attack(0.0289).eg1release(0.001)
  .eg2attack(0.001).eg2decay(0.009).eg2sustain(1.0).eg2release(0.0289)
  .pitchmg(7.52)
  .gain(0.6);

export const ms20_goforthegold = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.25).vco1level(1.0).vco1pw(0.173)
  .vco2wave("saw").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(4551.7).hpfpeak(0.0)
  .lpfcutoff(20).lpfpeak(0.429)
  .drive(1.5)
  .eg1attack(0.0215).eg1release(0.0173).eg1rev(1)
  .eg2attack(0.0161).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .gain(0.6);

export const ms20_holdthesamples = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.333)
  .vco2wave("square").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(1289.9).hpfpeak(0.825)
  .lpfcutoff(20).lpfpeak(0.706)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .modmatrix([{src:2, dst:30}, {src:6, dst:4}, {src:13, dst:7}, {src:19, dst:5}])
  .gain(0.6);

export const ms20_hopscotch = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.333)
  .vco2wave("saw").vco2level(0.5).vco2tune(-12.0)
  .hpfcutoff(509.7).hpfpeak(0.23).hpfenv(-4.16)
  .lpfcutoff(20).lpfpeak(0.0)
  .drive(1.5)
  .eg1attack(10.0).eg1release(0.1445).eg1rev(1)
  .eg2attack(0.001).eg2decay(3.9811).eg2sustain(0.65).eg2release(0.001).eg2rev(1)
  .portamento(0.083)
  .modmatrix([{src:10, dst:17}, {src:13, dst:27}, {src:23, dst:12}, {src:1, dst:3}, {src:9, dst:16}, {src:32, dst:18}])
  .gain(0.6);

export const ms20_lankylead = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.25).vco1level(0.0).vco1pw(0.064)
  .vco2wave("square").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(3369.7).hpfpeak(0.45)
  .lpfcutoff(20).lpfpeak(0.07).lpfenv(0.38)
  .drive(1.5)
  .eg1attack(0.1).eg1release(0.0479).eg1rev(1)
  .eg2attack(0.0063).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(1.54).mgwave("tri")
  .pitchmg(2.48)
  .gain(0.6);

export const ms20_laspuertas = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(1084.9).hpfpeak(0.53)
  .lpfcutoff(20).lpfpeak(0.0)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .gain(0.6);

export const ms20_miracleoflife = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.25).vco1level(1.0).vco1pw(0.598)
  .vco2wave("square").vco2level(0.5).vco2tune(-5.14)
  .noiselevel(1.0)
  .hpfcutoff(599.2).hpfpeak(0.66).hpfenv(8.0).hpfmg(0.73)
  .lpfcutoff(20).lpfpeak(1.0).lpfenv(-8.0).lpfmg(0.64)
  .drive(1.5)
  .eg1attack(10.0).eg1release(10.0).eg1rev(1)
  .eg2attack(10.0).eg2decay(10.0).eg2sustain(0.26).eg2release(0.0437).eg2rev(1)
  .mgfreq(0.24).mgwave("saw")
  .pitcheg(19.68)
  .pitchmg(6.48)
  .gain(0.6);

export const ms20_noise_net = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0).vco1pw(0.52)
  .vco2wave("sine").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.897)
  .hpfcutoff(14467.9).hpfpeak(0.0).hpfmg(0.85)
  .lpfcutoff(257.6).lpfpeak(1.0).lpfenv(6.72).lpfmg(0.33)
  .drive(1.5)
  .eg1attack(0.912).eg1release(10.0)
  .eg2attack(0.3311).eg2decay(0.0437).eg2sustain(0.38).eg2release(0.1202)
  .mgfreq(0.65).mgwave("saw")
  .pitchmg(2.28)
  .modmatrix([{src:24, dst:19}, {src:3, dst:23}, {src:17, dst:28}, {src:21, dst:20}])
  .gain(0.6);

export const ms20_noisey = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(2.0).vco1level(0.333)
  .vco2wave("saw").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.82)
  .hpfcutoff(7173.3).hpfpeak(1.0).hpfenv(8.0)
  .lpfcutoff(20000.0).lpfpeak(1.0).lpfenv(3.94)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0).eg1rev(1)
  .eg2attack(1.6082).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .modmatrix([{src:19, dst:0}])
  .gain(0.6);

export const ms20_o2_tank = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.0)
  .vco2wave("tri").vco2scale(0.25).vco2level(0.413).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(831.9).hpfpeak(0.34).hpfenv(-8.0)
  .lpfcutoff(20).lpfpeak(1.0).lpfenv(3.68)
  .drive(1.5)
  .eg1attack(0.0091).eg1release(0.3631).eg1rev(1)
  .eg2attack(0.0575).eg2decay(10.0).eg2sustain(0.39).eg2release(0.0033).eg2rev(1)
  .mgfreq(0.47).mgwave("saw")
  .pitcheg(3.84)
  .modmatrix([{src:12, dst:29}, {src:10, dst:14}, {src:19, dst:3}, {src:9, dst:15}])
  .gain(0.6);

export const ms20_orchisection = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1level(0.0).vco1pw(0.368)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.02)
  .hpfcutoff(20000.0).hpfpeak(0.49).hpfenv(-8.0)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-1.52)
  .drive(1.5)
  .eg1attack(0.0012).eg1release(0.631).eg1rev(1)
  .eg2attack(0.0046).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.33).mgwave("sine")
  .portamento(0.079)
  .gain(0.6);

export const ms20_organ_fall = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333)
  .vco2wave("sine").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(263.1).hpfpeak(1.0).hpfenv(-7.92).hpfmg(0.857)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-0.13).lpfmg(1.0)
  .drive(1.5)
  .eg1attack(8.0309).eg1release(0.001)
  .eg2attack(0.001).eg2decay(10.0).eg2sustain(0.0).eg2release(0.0289)
  .mgfreq(0.57).mgwave("square")
  .pitcheg(21.71)
  .pitchmg(0.6)
  .portamento(5.0)
  .gain(0.6);

export const ms20_pke_overload = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.333).vco1pw(0.593)
  .vco2wave("sine").vco2scale(0.5).vco2level(0.5).vco2tune(-0.24)
  .noiselevel(1.0)
  .hpfcutoff(6439.4).hpfpeak(0.09).hpfenv(8.0)
  .lpfcutoff(21.4).lpfpeak(0.7).lpfenv(-0.64)
  .drive(1.5)
  .eg1attack(2.0893).eg1release(10.0).eg1rev(1)
  .eg2attack(4.3652).eg2decay(0.0011).eg2sustain(0.0).eg2release(0.001)
  .mgfreq(0.33).mgwave("square")
  .pitcheg(21.52)
  .pitchmg(0.95)
  .modmatrix([{src:12, dst:29}, {src:9, dst:16}, {src:22, dst:14}])
  .gain(0.6);

export const ms20_padsies = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.5).vco1level(1.0).vco1pw(0.516)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(2490.4).hpfpeak(0.643).hpfenv(-8.0)
  .lpfcutoff(6324.6).lpfpeak(0.421).lpfenv(0.25)
  .drive(1.5)
  .eg1attack(0.0173).eg1release(10.0).eg1rev(1)
  .eg2attack(0.134).eg2decay(0.2783).eg2sustain(0.754).eg2release(0.1668)
  .gain(0.6);

export const ms20_pluckit = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.333).vco1pw(0.033)
  .vco2wave("square").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(5987.2).hpfpeak(0.15)
  .lpfcutoff(20).lpfpeak(0.524)
  .drive(1.5)
  .eg1attack(0.0072).eg1release(0.005).eg1rev(1)
  .eg2attack(0.0083).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.25).mgwave("saw")
  .gain(0.6);

export const ms20_pow = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1level(1.0).vco1pw(0.245)
  .vco2wave("sine").vco2scale(2.0).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.14)
  .hpfcutoff(5476.8).hpfpeak(1.0).hpfmg(0.41)
  .lpfcutoff(20).lpfpeak(0.93).lpfmg(0.56)
  .drive(1.5)
  .eg1attack(0.0302).eg1release(0.0019).eg1rev(1)
  .eg2attack(0.6918).eg2decay(0.2291).eg2sustain(0.56).eg2release(1.7378).eg2rev(1)
  .mgfreq(0.69).mgwave("tri")
  .pitcheg(15.84)
  .pitchmg(0.36)
  .modmatrix([{src:19, dst:2}, {src:21, dst:7}, {src:5, dst:30}, {src:10, dst:4}])
  .gain(0.6);

export const ms20_psychedelicorg = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.333)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.43).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(1439.4).hpfpeak(0.571).hpfenv(-7.92).hpfmg(0.357)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-4.06).lpfmg(0.341)
  .drive(1.5)
  .eg1attack(0.0077).eg1release(10.0)
  .eg2attack(0.001).eg2decay(0.009).eg2sustain(1.0).eg2release(0.0289)
  .mgfreq(0.19).mgwave("sine")
  .portamento(0.079)
  .gain(0.6);

export const ms20_pumpthepedal = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.667).vco1pw(0.166)
  .vco2wave("sine").vco2scale(0.5).vco2level(0.524).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(2630.7).hpfpeak(0.222).hpfenv(8.0)
  .lpfcutoff(22.3).lpfpeak(0.675).lpfenv(-4.32)
  .drive(1.5)
  .eg1attack(0.0022).eg1release(0.1441).eg1rev(1)
  .eg2attack(0.0013).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.15).mgwave("saw")
  .pitchmg(0.48)
  .gain(0.6);

export const ms20_push_the_limit = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1level(1.0)
  .vco2wave("sine").vco2scale(2.0).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(2000.0).hpfpeak(0.7).hpfmg(0.33)
  .lpfcutoff(20).lpfpeak(1.0).lpfmg(0.58)
  .drive(1.5)
  .eg1attack(0.0054).eg1release(0.0058).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.1738).eg2sustain(0.67).eg2release(0.1096)
  .mgfreq(0.69).mgwave("tri")
  .pitcheg(24.0)
  .pitchmg(0.36)
  .modmatrix([{src:19, dst:2}, {src:3, dst:29}, {src:9, dst:8}, {src:13, dst:20}, {src:0, dst:28}, {src:17, dst:15}, {src:5, dst:7}, {src:34, dst:4}])
  .gain(0.6);

export const ms20_razorbass = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.25).vco1level(0.0)
  .vco2wave("tri").vco2scale(0.25).vco2level(0.5).vco2tune(-2.29)
  .noiselevel(1.0)
  .hpfcutoff(2231.8).hpfpeak(0.397).hpfenv(-7.92)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-1.02)
  .drive(1.5)
  .eg1attack(0.2404).eg1release(10.0).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.009).eg2sustain(1.0).eg2release(0.0289)
  .mgfreq(0.19).mgwave("sine")
  .pitcheg(2.67)
  .gain(0.6);

export const ms20_rewindtheflute = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1level(0.667).vco1pw(0.363)
  .vco2wave("saw").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(252.7).hpfpeak(0.27).hpfenv(-3.56).hpfmg(0.413)
  .lpfcutoff(74.3).lpfpeak(0.0).lpfenv(-1.02).lpfmg(0.119)
  .drive(1.5)
  .eg1attack(0.302).eg1release(0.0249).eg1rev(1)
  .eg2attack(0.0104).eg2decay(0.0599).eg2sustain(0.0).eg2release(0.0311)
  .mgfreq(0.65).mgwave("tri")
  .pitcheg(3.81)
  .pitchmg(1.71)
  .gain(0.6);

export const ms20_robotentropy = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.0)
  .vco2wave("saw").vco2scale(0.25).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(1606.2).hpfpeak(0.58).hpfenv(-3.56)
  .lpfcutoff(20).lpfpeak(0.69).lpfenv(-3.84)
  .drive(1.5)
  .eg1attack(0.401).eg1release(0.0249).eg1rev(1)
  .eg2attack(10.0).eg2decay(10.0).eg2sustain(0.61).eg2release(0.0191).eg2rev(1)
  .mgfreq(1.2).mgwave("tri")
  .modmatrix([{src:1, dst:4}, {src:2, dst:19}, {src:13, dst:7}])
  .gain(0.6);

export const ms20_screamingsoul = (pat) => pat
  .s("ms20")
  .vco1wave("sine").vco1scale(2.0).vco1level(0.0)
  .vco2wave("sine").vco2scale(2.0).vco2level(0.81).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(1.0)
  .hpfcutoff(1696.7).hpfpeak(1.0).hpfenv(-7.92).hpfmg(0.357)
  .lpfcutoff(38.6).lpfpeak(0.349).lpfenv(8.0).lpfmg(0.341)
  .drive(1.5)
  .eg1attack(0.6218).eg1release(10.0)
  .eg2attack(0.4314).eg2decay(10.0).eg2sustain(1.0).eg2release(0.0289)
  .pitchmg(7.52)
  .modmatrix([{src:23, dst:9}, {src:29, dst:25}, {src:24, dst:8}, {src:22, dst:3}])
  .gain(0.6);

export const ms20_slow_down = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1level(1.0)
  .vco2wave("sine").vco2scale(2.0).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.762)
  .ringmod(0.23)
  .hpfcutoff(1439.4).hpfpeak(0.563).hpfenv(-7.75).hpfmg(0.437)
  .lpfcutoff(27.8).lpfpeak(0.103).lpfenv(-8.0).lpfmg(0.413)
  .drive(1.5)
  .eg1attack(0.001).eg1release(10.0).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.0021).eg2sustain(0.389).eg2release(0.0072)
  .pitcheg(24.0)
  .portamento(2.698)
  .modmatrix([{src:29, dst:3}, {src:24, dst:15}])
  .gain(0.6);

export const ms20_smakthakat = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.5).vco1level(1.0).vco1pw(0.088)
  .vco2wave("sine").vco2level(0.5).vco2tune(12.0)
  .noiselevel(1.0)
  .hpfcutoff(7173.3).hpfpeak(1.0).hpfenv(-7.11)
  .lpfcutoff(49.1).lpfpeak(0.1).lpfenv(0.48).lpfmg(0.246)
  .drive(1.5)
  .eg1attack(0.01).eg1release(0.0832).eg1rev(1)
  .eg2attack(0.0525).eg2decay(0.0083).eg2sustain(0.59).eg2release(0.001)
  .mgfreq(0.47).mgwave("saw")
  .pitcheg(11.62)
  .pitchmg(6.6)
  .modmatrix([{src:0, dst:23}])
  .gain(0.6);

export const ms20_squaresquared = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.333).vco1pw(0.189)
  .vco2wave("saw").vco2level(0.5).vco2tune(-1.92)
  .noiselevel(1.0)
  .hpfcutoff(2935.6).hpfpeak(0.611).hpfmg(0.421)
  .lpfcutoff(49.1).lpfpeak(0.31).lpfenv(5.28)
  .drive(1.5)
  .eg1attack(0.0746).eg1release(10.0)
  .eg2attack(0.1202).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.24).mgwave("saw")
  .pitchmg(0.96)
  .gain(0.6);

export const ms20_stormapproaching = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.25).vco1level(0.0).vco1pw(0.134)
  .vco2wave("saw").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(1499.8).hpfpeak(0.714).hpfenv(8.0).hpfmg(0.071)
  .lpfcutoff(20).lpfpeak(0.19).lpfenv(-5.21).lpfmg(0.786)
  .drive(1.5)
  .eg1attack(0.0249).eg1release(0.2783).eg1rev(1)
  .eg2attack(0.8318).eg2decay(0.012).eg2sustain(0.0).eg2release(0.001).eg2rev(1)
  .mgfreq(0.65).mgwave("tri")
  .pitcheg(11.62)
  .pitchmg(4.86)
  .modmatrix([{src:3, dst:30}, {src:13, dst:28}, {src:15, dst:5}, {src:23, dst:12}, {src:9, dst:16}, {src:21, dst:19}])
  .gain(0.6);

export const ms20_strings = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0).vco1pw(0.236)
  .vco2wave("saw").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(20000.0).hpfpeak(0.0).hpfenv(-7.92)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(0.51)
  .drive(1.5)
  .eg1attack(1.2005).eg1release(0.401)
  .eg2attack(0.1441).eg2decay(0.0132).eg2sustain(0.93).eg2release(0.1)
  .portamento(1.746)
  .modmatrix([{src:33, dst:0}])
  .gain(0.6);

export const ms20_surfacebubbles = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.667)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.81)
  .hpfcutoff(7875.3).hpfpeak(0.53).hpfmg(0.13)
  .lpfcutoff(189.3).lpfpeak(0.8).lpfmg(0.41)
  .drive(1.5)
  .eg1attack(0.0311).eg1release(1.7302).eg1rev(1)
  .eg2attack(0.4642).eg2decay(6.3096).eg2sustain(0.75).eg2release(0.1738).eg2rev(1)
  .mgfreq(0.21).mgwave("saw")
  .pitcheg(19.44)
  .pitchmg(4.38)
  .portamento(0.079)
  .modmatrix([{src:6, dst:12}, {src:10, dst:14}, {src:13, dst:16}, {src:3, dst:23}, {src:9, dst:15}, {src:17, dst:28}])
  .gain(0.6);

export const ms20_synthpad = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.5).vco1level(0.333).vco1pw(0.414)
  .vco2wave("sine").vco2scale(0.5).vco2level(0.43).vco2tune(-12.0)
  .noiselevel(0.77)
  .hpfcutoff(18933.0).hpfpeak(1.0).hpfenv(-7.92)
  .lpfcutoff(20).lpfpeak(0.167).lpfenv(-1.02)
  .drive(1.5)
  .eg1attack(0.2404).eg1release(10.0).eg1rev(1)
  .eg2attack(0.1668).eg2decay(0.009).eg2sustain(1.0).eg2release(0.0289)
  .mgfreq(0.19).mgwave("sine")
  .pitcheg(2.67)
  .portamento(0.079)
  .gain(0.6);

export const ms20_tremsper = (pat) => pat
  .s("ms20")
  .vco1wave("sine").vco1scale(2.0).vco1level(0.667).vco1pw(0.157)
  .vco2wave("saw").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.92)
  .hpfcutoff(1670.7).hpfpeak(1.0).hpfenv(-8.0).hpfmg(0.28)
  .lpfcutoff(20).lpfpeak(0.0).lpfenv(-8.0)
  .drive(1.5)
  .eg1attack(0.0692).eg1release(0.003).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .pitchmg(5.52)
  .gain(0.6);

export const ms20_vacancy = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1level(0.667)
  .vco2wave("sine").vco2scale(0.25).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(4808.2).hpfpeak(0.27).hpfenv(8.0).hpfmg(0.29)
  .lpfcutoff(52.6).lpfpeak(0.17).lpfenv(8.0).lpfmg(0.35)
  .drive(1.5)
  .eg1attack(0.0575).eg1release(0.0525).eg1rev(1)
  .eg2attack(0.1905).eg2decay(0.0268).eg2sustain(0.206).eg2release(0.0072).eg2rev(1)
  .mgfreq(0.24).mgwave("tri")
  .pitcheg(6.96)
  .pitchmg(2.28)
  .gain(0.6);

export const ms20_vocasynth = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.667).vco1pw(0.236)
  .vco2wave("saw").vco2scale(0.25).vco2level(0.516).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.294)
  .hpfcutoff(10358.9).hpfpeak(0.04).hpfenv(-7.92)
  .lpfcutoff(1696.7).lpfpeak(0.429).lpfenv(-8.0)
  .drive(1.5)
  .eg1attack(0.0249).eg1release(0.0359)
  .eg2attack(0.001).eg2decay(0.0132).eg2sustain(0.93).eg2release(0.1)
  .portamento(3.571)
  .modmatrix([{src:33, dst:0}])
  .gain(0.6);

export const ms20_wait_for_it = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333).vco1pw(0.772)
  .vco2wave("sine").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(1.0)
  .hpfcutoff(263.1).hpfpeak(1.0).hpfenv(-7.92)
  .lpfcutoff(4079.0).lpfpeak(0.579).lpfenv(-0.13).lpfmg(0.643)
  .drive(1.5)
  .eg1attack(0.001).eg1release(0.0112)
  .eg2attack(0.0268).eg2decay(10.0).eg2sustain(0.0).eg2release(0.0289)
  .mgfreq(0.57).mgwave("square")
  .pitchmg(0.6)
  .portamento(5.0)
  .modmatrix([{src:29, dst:3}, {src:25, dst:28}])
  .gain(0.6);

export const ms20_woodchipper = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.25).vco1level(0.0).vco1pw(0.018)
  .vco2wave("saw").vco2scale(0.25).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(1421.0).hpfpeak(0.05).hpfenv(8.0).hpfmg(0.071)
  .lpfcutoff(2517.9).lpfpeak(0.111).lpfenv(-8.0)
  .drive(1.5)
  .eg1attack(1.2005).eg1release(0.0077).eg1rev(1)
  .eg2attack(0.0067).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.83).mgwave("tri")
  .gain(0.6);

export const ms20_wow_synth = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.25).vco1level(0.333)
  .vco2wave("tri").vco2level(0.505).vco2tune(-12.0)
  .noiselevel(0.91)
  .ringmod(0.12)
  .hpfcutoff(7990.8).hpfpeak(0.41).hpfenv(-0.64)
  .lpfcutoff(20).lpfpeak(0.22).lpfmg(0.4)
  .drive(1.5)
  .eg1attack(0.0091).eg1release(0.3311).eg1rev(1)
  .eg2attack(0.2754).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .pitcheg(14.16)
  .modmatrix([{src:17, dst:11}])
  .gain(0.6);

export const ms20_n808_state = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.25).vco1level(0.333).vco1pw(0.054)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.921)
  .hpfcutoff(668.1).hpfpeak(0.254).hpfenv(-2.8)
  .lpfcutoff(20).lpfpeak(0.815)
  .drive(1.5)
  .eg1attack(0.1931).eg1release(0.0387).eg1rev(1)
  .eg2attack(0.0599).eg2decay(0.093).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .pitcheg(15.36)
  .portamento(5.0)
  .modmatrix([{src:21, dst:10}, {src:12, dst:1}, {src:14, dst:27}, {src:0, dst:16}])
  .gain(0.6);

export const ms20_blue_lead_line = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333)
  .vco2wave("square").vco2level(0.5).vco2tune(-6.48)
  .noiselevel(1.0)
  .hpfcutoff(668.1).hpfpeak(0.151)
  .lpfcutoff(40.8).lpfpeak(0.794).lpfenv(0.13)
  .drive(1.5)
  .eg1attack(0.0215).eg1release(0.0083).eg1rev(1)
  .eg2attack(0.4642).eg2decay(0.0149).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .pitcheg(5.14)
  .portamento(1.19)
  .modmatrix([{src:5, dst:16}, {src:0, dst:11}, {src:27, dst:14}, {src:1, dst:12}, {src:2, dst:13}, {src:33, dst:7}])
  .gain(0.6);

export const ms20_classic_sweeps = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.0)
  .vco2wave("saw").vco2scale(0.5).vco2level(0.508).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(3460.4).hpfpeak(0.373).hpfenv(-2.16)
  .lpfcutoff(20).lpfpeak(0.468).lpfenv(-0.38)
  .drive(1.5)
  .eg1attack(2.6827).eg1release(0.0289).eg1rev(1)
  .eg2attack(0.1995).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .pitcheg(19.43)
  .modmatrix([{src:17, dst:22}, {src:1, dst:12}, {src:0, dst:16}, {src:10, dst:21}, {src:14, dst:27}, {src:13, dst:23}])
  .gain(0.6);

export const ms20_dopolar_dots = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.333)
  .vco2wave("sine").vco2scale(2.0).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.016)
  .hpfcutoff(6324.6).hpfpeak(0.5).hpfenv(2.03)
  .lpfcutoff(20).lpfpeak(0.27).lpfenv(8.0)
  .drive(1.5)
  .eg1attack(0.0645).eg1release(0.001).eg1rev(1)
  .eg2attack(0.401).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .pitchmg(1.2)
  .modmatrix([{src:14, dst:27}, {src:17, dst:16}, {src:1, dst:12}])
  .gain(0.6);

export const ms20_drop_bassline = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.5).vco1level(0.0)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(3861.4).hpfpeak(0.206).hpfenv(-4.8)
  .lpfcutoff(257.6).lpfpeak(0.833).lpfenv(8.0)
  .drive(1.5)
  .eg1attack(0.0448).eg1release(1.2023).eg1rev(1)
  .eg2attack(0.2512).eg2decay(10.0).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.69).mgwave("tri")
  .modmatrix([{src:19, dst:2}, {src:12, dst:23}, {src:1, dst:14}, {src:6, dst:3}, {src:9, dst:16}, {src:7, dst:17}, {src:4, dst:15}])
  .gain(0.6);

export const ms20_elecrix_piano = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.333)
  .vco2wave("square").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.05)
  .hpfcutoff(2231.8).hpfpeak(0.595).hpfenv(-2.79)
  .lpfcutoff(20).lpfpeak(0.048).lpfenv(8.0)
  .drive(1.5)
  .eg1attack(0.0083).eg1release(0.0072).eg1rev(1)
  .eg2attack(1.2005).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .pitcheg(24.0)
  .modmatrix([{src:12, dst:1}, {src:18, dst:33}, {src:10, dst:14}, {src:5, dst:16}])
  .gain(0.6);

export const ms20_high_pass_bass = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.25).vco1level(0.0)
  .vco2wave("saw").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.76)
  .ringmod(0.83)
  .hpfcutoff(509.7).hpfpeak(0.67).hpfenv(-0.16)
  .lpfcutoff(632.5).lpfpeak(0.68).lpfenv(2.08)
  .drive(1.5)
  .eg1attack(0.0692).eg1release(0.2512).eg1rev(1)
  .eg2attack(0.1905).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(1.0).mgwave("tri")
  .pitcheg(13.68)
  .pitchmg(3.24)
  .modmatrix([{src:17, dst:22}, {src:1, dst:12}, {src:0, dst:16}, {src:10, dst:21}, {src:14, dst:27}, {src:25, dst:5}, {src:2, dst:24}])
  .gain(0.6);

export const ms20_mario_land = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.0)
  .vco2wave("saw").vco2scale(0.25).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.968)
  .hpfcutoff(3655.4).hpfpeak(0.468).hpfenv(-3.43)
  .lpfcutoff(74.6).lpfpeak(0.0).lpfenv(-0.25)
  .drive(1.5)
  .eg1attack(0.2586).eg1release(0.001).eg1rev(1)
  .eg2attack(0.134).eg2decay(7.5858).eg2sustain(0.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .modmatrix([{src:16, dst:9}, {src:5, dst:31}, {src:6, dst:13}, {src:14, dst:4}, {src:18, dst:21}, {src:2, dst:0}])
  .gain(0.6);

export const ms20_mean_bass_grit = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.5).vco1level(0.0).vco1pw(0.026)
  .vco2wave("saw").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.151)
  .hpfcutoff(566.8).hpfpeak(0.548).hpfenv(-4.8)
  .lpfcutoff(20).lpfpeak(1.0).lpfenv(0.51)
  .drive(1.5)
  .eg1attack(1.1159).eg1release(0.0599).eg1rev(1)
  .eg2attack(0.001).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .pitcheg(9.14)
  .gain(0.6);

export const ms20_micro_synth = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.333)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.97)
  .ringmod(0.111)
  .hpfcutoff(365.5).hpfpeak(0.492).hpfenv(3.43).hpfmg(0.587)
  .lpfcutoff(70.6).lpfpeak(0.5).lpfenv(-6.73).lpfmg(0.325)
  .drive(1.5)
  .eg1attack(0.401).eg1release(0.0046).eg1rev(1)
  .eg2attack(0.8962).eg2decay(10.0).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .pitcheg(2.76)
  .modmatrix([{src:5, dst:16}, {src:14, dst:27}, {src:1, dst:12}, {src:13, dst:0}])
  .gain(0.6);

export const ms20_mild_bliss = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.333)
  .vco2wave("saw").vco2scale(2.0).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.952)
  .hpfcutoff(928.3).hpfpeak(0.19).hpfenv(-0.13)
  .lpfcutoff(20).lpfpeak(1.0).lpfenv(-0.25).lpfmg(0.817)
  .drive(1.5)
  .eg1attack(0.0331).eg1release(0.0035).eg1rev(1)
  .eg2attack(0.7197).eg2decay(0.0016).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .pitcheg(9.14)
  .modmatrix([{src:3, dst:10}, {src:13, dst:27}, {src:0, dst:28}, {src:23, dst:12}, {src:14, dst:11}, {src:9, dst:16}])
  .gain(0.6);

export const ms20_modular_snapshot = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.0)
  .vco2wave("tri").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.69)
  .hpfcutoff(1289.9).hpfpeak(0.183).hpfenv(-7.24)
  .lpfcutoff(668.1).lpfpeak(0.333).lpfenv(0.38)
  .drive(1.5)
  .eg1attack(0.3728).eg1release(0.1076).eg1rev(1)
  .eg2attack(0.2077).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.49).mgwave("saw")
  .pitcheg(8.19)
  .portamento(1.667)
  .modmatrix([{src:2, dst:19}, {src:4, dst:32}, {src:7, dst:17}])
  .gain(0.6);

export const ms20_modulate_leads = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0)
  .vco2wave("tri").vco2scale(0.25).vco2level(0.492).vco2tune(-12.0)
  .noiselevel(0.587)
  .ringmod(0.09)
  .hpfcutoff(745.5).hpfpeak(0.135).hpfenv(-1.78).hpfmg(0.492)
  .lpfcutoff(831.9).lpfpeak(0.127).lpfenv(1.65)
  .drive(1.5)
  .eg1attack(0.4169).eg1release(1.8197).eg1rev(1)
  .eg2attack(0.0229).eg2decay(0.006).eg2sustain(1.0).eg2release(0.001)
  .pitchmg(4.76)
  .modmatrix([{src:3, dst:29}, {src:12, dst:1}, {src:14, dst:27}, {src:5, dst:16}, {src:9, dst:15}])
  .gain(0.6);

export const ms20_mystery_synth = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.333)
  .vco2wave("saw").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.027)
  .hpfcutoff(598.7).hpfpeak(0.492)
  .lpfcutoff(2490.4).lpfpeak(1.0).lpfenv(0.13)
  .drive(1.5)
  .eg1attack(0.0416).eg1release(0.02).eg1rev(1)
  .eg2attack(0.3465).eg2decay(0.093).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .pitcheg(5.14)
  .portamento(0.159)
  .modmatrix([{src:5, dst:16}, {src:0, dst:11}, {src:27, dst:14}, {src:1, dst:12}, {src:2, dst:13}, {src:33, dst:7}])
  .gain(0.6);

export const ms20_oberhiem_bass = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.333)
  .vco2wave("square").vco2level(0.532).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.873)
  .hpfcutoff(1362.6).hpfpeak(0.476).hpfenv(-5.84).hpfmg(0.27)
  .lpfcutoff(29.4).lpfpeak(0.484).lpfenv(0.51).lpfmg(0.087)
  .drive(1.5)
  .eg1attack(0.2994).eg1release(0.0054).eg1rev(1)
  .eg2attack(0.0311).eg2decay(10.0).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .pitcheg(18.1)
  .modmatrix([{src:5, dst:16}, {src:14, dst:27}, {src:1, dst:12}, {src:13, dst:0}])
  .gain(0.6);

export const ms20_old_modular_kit = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.5).vco1level(0.0)
  .vco2wave("sine").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.833)
  .hpfcutoff(1792.3).hpfpeak(0.159).hpfenv(-4.8)
  .lpfcutoff(980.6).lpfpeak(0.865).lpfenv(-8.0)
  .drive(1.5)
  .eg1attack(0.0334).eg1release(0.001).eg1rev(1)
  .eg2attack(3.3113).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .pitcheg(8.0)
  .portamento(0.042)
  .modmatrix([{src:13, dst:22}])
  .gain(0.6);

export const ms20_old_organ = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.333)
  .vco2wave("square").vco2level(0.532).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.873)
  .hpfcutoff(878.8).hpfpeak(0.159).hpfenv(-5.84).hpfmg(0.27)
  .lpfcutoff(74.6).lpfpeak(0.484).lpfenv(0.51).lpfmg(0.087)
  .drive(1.5)
  .eg1attack(0.4314).eg1release(0.3465).eg1rev(1)
  .eg2attack(0.8962).eg2decay(10.0).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .pitcheg(18.1)
  .modmatrix([{src:5, dst:16}, {src:14, dst:27}, {src:1, dst:12}, {src:13, dst:0}])
  .gain(0.6);

export const ms20_old_synth = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1level(0.333)
  .vco2wave("sine").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.849)
  .ringmod(0.111)
  .hpfcutoff(705.7).hpfpeak(0.397).hpfenv(-5.46).hpfmg(0.587)
  .lpfcutoff(70.6).lpfpeak(0.5).lpfenv(8.0).lpfmg(0.325)
  .drive(1.5)
  .eg1attack(0.401).eg1release(0.0046).eg1rev(1)
  .eg2attack(0.1157).eg2decay(10.0).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .pitcheg(2.76)
  .modmatrix([{src:5, dst:16}, {src:14, dst:27}, {src:1, dst:12}, {src:13, dst:0}])
  .gain(0.6);

export const ms20_plaid_sounds = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.333)
  .vco2wave("saw").vco2level(0.5).vco2tune(-0.57)
  .noiselevel(0.698)
  .ringmod(0.508)
  .hpfcutoff(1094.3).hpfpeak(0.278).hpfenv(-7.84)
  .lpfcutoff(83.2).lpfpeak(0.675).lpfenv(0.76)
  .drive(1.5)
  .eg1attack(0.2404).eg1release(0.001).eg1rev(1)
  .eg2attack(2.4936).eg2decay(0.001).eg2sustain(0.381).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .pitcheg(12.19)
  .portamento(0.079)
  .modmatrix([{src:11, dst:17}, {src:14, dst:27}, {src:5, dst:16}, {src:6, dst:18}, {src:1, dst:12}, {src:22, dst:33}, {src:2, dst:21}])
  .gain(0.6);

export const ms20_play_a_chord = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.333)
  .vco2wave("saw").vco2scale(0.5).vco2level(0.55).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(129.0).hpfpeak(0.048).hpfenv(-4.8)
  .lpfcutoff(654.7).lpfpeak(0.68).lpfmg(0.2)
  .drive(1.5)
  .eg1attack(0.7244).eg1release(0.0232).eg1rev(1)
  .eg2attack(0.0645).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .pitcheg(4.56)
  .modmatrix([{src:0, dst:11}, {src:1, dst:13}])
  .gain(0.6);

export const ms20_pulsing_bass_lin = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.0)
  .vco2wave("saw").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.1)
  .ringmod(0.05)
  .hpfcutoff(567.7).hpfpeak(0.238).hpfenv(-1.28).hpfmg(0.063)
  .lpfcutoff(1221.1).lpfpeak(0.968).lpfenv(-6.35).lpfmg(0.627)
  .drive(1.5)
  .eg1attack(0.1).eg1release(10.0).eg1rev(1)
  .eg2attack(0.0021).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("tri")
  .pitcheg(2.88)
  .pitchmg(2.86)
  .modmatrix([{src:12, dst:1}, {src:18, dst:33}, {src:10, dst:14}, {src:5, dst:16}])
  .gain(0.6);

export const ms20_rainy_dayz = (pat) => pat
  .s("ms20")
  .vco1wave("sine").vco1level(0.333).vco1pw(0.057)
  .vco2wave("sine").vco2scale(0.5).vco2level(0.524).vco2tune(-12.0)
  .noiselevel(0.857)
  .hpfcutoff(2490.4).hpfpeak(0.373).hpfenv(-4.8).hpfmg(0.611)
  .lpfcutoff(632.5).lpfpeak(0.46).lpfenv(4.7).lpfmg(0.643)
  .drive(1.5)
  .eg1attack(0.1931).eg1release(0.0803).eg1rev(1)
  .eg2attack(0.7743).eg2decay(10.0).eg2sustain(0.397).eg2release(10.0)
  .mgfreq(0.69).mgwave("tri")
  .pitcheg(23.05)
  .modmatrix([{src:19, dst:2}, {src:12, dst:23}, {src:1, dst:14}, {src:6, dst:3}, {src:9, dst:16}, {src:7, dst:17}, {src:4, dst:15}])
  .gain(0.6);

export const ms20_random_highpass = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1level(0.333)
  .vco2wave("sine").vco2scale(0.5).vco2level(0.62).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(0.515)
  .hpfcutoff(3101.0).hpfpeak(0.206).hpfenv(-7.92).hpfmg(0.603)
  .lpfcutoff(50.8).lpfpeak(0.873).lpfenv(-0.76).lpfmg(0.198)
  .drive(1.5)
  .eg1attack(0.0557).eg1release(0.1441).eg1rev(1)
  .eg2attack(6.4495).eg2decay(0.0023).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.13).mgwave("tri")
  .pitcheg(21.9)
  .pitchmg(6.29)
  .portamento(0.183)
  .modmatrix([{src:5, dst:11}, {src:3, dst:30}, {src:9, dst:8}])
  .gain(0.6);

export const ms20_repeat_harmony = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1level(0.333)
  .vco2wave("tri").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.97)
  .ringmod(0.111)
  .hpfcutoff(1696.7).hpfpeak(0.492).hpfenv(-3.81).hpfmg(0.468)
  .lpfcutoff(632.5).lpfpeak(0.5).lpfenv(-6.73).lpfmg(0.325)
  .drive(1.5)
  .eg1attack(0.401).eg1release(0.0046).eg1rev(1)
  .eg2attack(0.8962).eg2decay(10.0).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .pitcheg(2.76)
  .modmatrix([{src:5, dst:16}, {src:14, dst:27}, {src:1, dst:12}, {src:13, dst:0}])
  .gain(0.6);

export const ms20_rich_cloud = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.5).vco1level(0.333)
  .vco2wave("sine").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.62)
  .hpfcutoff(3655.4).hpfpeak(0.381).hpfenv(-8.0)
  .lpfcutoff(20).lpfpeak(0.111).lpfenv(1.4)
  .drive(1.5)
  .eg1attack(0.7197).eg1release(0.001).eg1rev(1)
  .eg2attack(0.1441).eg2decay(0.1245).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.52).mgwave("saw")
  .portamento(0.079)
  .modmatrix([{src:15, dst:9}, {src:23, dst:3}, {src:0, dst:16}, {src:14, dst:19}])
  .gain(0.6);

export const ms20_simple_sines = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.5).vco1level(0.333)
  .vco2wave("square").vco2scale(0.5).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(0.579)
  .ringmod(0.079)
  .hpfcutoff(3275.8).hpfpeak(0.127).hpfenv(-7.37)
  .lpfcutoff(74.6).lpfpeak(0.532).lpfenv(6.86)
  .drive(1.5)
  .eg1attack(0.0035).eg1release(0.0249).eg1rev(1)
  .eg2attack(3.9811).eg2decay(0.001).eg2sustain(1.0).eg2release(0.1668).eg2rev(1)
  .mgfreq(0.65).mgwave("tri")
  .modmatrix([{src:16, dst:5}, {src:9, dst:29}, {src:11, dst:12}, {src:14, dst:22}, {src:10, dst:21}])
  .gain(0.6);

export const ms20_spy_synth = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.5).vco1level(0.0)
  .vco2wave("saw").vco2scale(0.5).vco2level(0.524).vco2tune(-12.0)
  .noiselevel(0.976)
  .hpfcutoff(3861.4).hpfpeak(0.294).hpfenv(-5.08)
  .lpfcutoff(6324.6).lpfpeak(0.96).lpfenv(-2.03)
  .drive(1.5)
  .eg1attack(9.2951).eg1release(0.669).eg1rev(1)
  .eg2attack(0.0021).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(1.2).mgwave("tri")
  .modmatrix([{src:18, dst:17}, {src:24, dst:10}, {src:2, dst:22}, {src:11, dst:0}])
  .gain(0.6);

export const ms20_sweep_buzz = (pat) => pat
  .s("ms20")
  .vco1wave("tri").vco1scale(0.5).vco1level(0.0)
  .vco2wave("saw").vco2scale(0.25).vco2level(0.524).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(1362.6).hpfpeak(0.278).hpfenv(-4.8).hpfmg(0.444)
  .lpfcutoff(632.5).lpfpeak(0.0).lpfenv(0.25).lpfmg(0.643)
  .drive(1.5)
  .eg1attack(1.8614).eg1release(0.001)
  .eg2attack(0.0803).eg2decay(10.0).eg2sustain(0.397).eg2release(10.0)
  .mgfreq(0.69).mgwave("saw")
  .pitcheg(23.05)
  .modmatrix([{src:19, dst:2}, {src:12, dst:23}, {src:1, dst:14}, {src:6, dst:3}, {src:9, dst:16}, {src:7, dst:17}, {src:4, dst:15}])
  .gain(0.6);

export const ms20_underworld = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.5).vco1level(0.0)
  .vco2wave("square").vco2scale(0.25).vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .hpfcutoff(3655.4).hpfpeak(0.397).hpfenv(1.27)
  .lpfcutoff(56.7).lpfpeak(0.0).lpfenv(0.25).lpfmg(1.0)
  .drive(1.5)
  .eg1attack(0.578).eg1release(0.001).eg1rev(1)
  .eg2attack(0.012).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.91).mgwave("tri")
  .pitcheg(17.14)
  .portamento(0.079)
  .modmatrix([{src:1, dst:11}, {src:18, dst:10}, {src:24, dst:9}])
  .gain(0.6);

export const ms20_watermarks = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(0.5).vco1level(0.667)
  .vco2wave("tri").vco2level(0.516).vco2tune(-12.0)
  .noiselevel(0.873)
  .hpfcutoff(3460.4).hpfpeak(0.381).hpfenv(-4.8)
  .lpfcutoff(257.6).lpfpeak(0.775).lpfenv(8.0)
  .drive(1.5)
  .eg1attack(2.5119).eg1release(1.2023).eg1rev(1)
  .eg2attack(0.2512).eg2decay(10.0).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.69).mgwave("tri")
  .modmatrix([{src:19, dst:2}, {src:12, dst:23}, {src:1, dst:14}, {src:6, dst:3}, {src:9, dst:16}, {src:7, dst:17}, {src:4, dst:15}])
  .gain(0.6);

export const ms20_whispy_squares = (pat) => pat
  .s("ms20")
  .vco1wave("square").vco1scale(2.0).vco1level(0.0).vco1pw(0.27)
  .vco2wave("saw").vco2scale(0.25).vco2level(0.5).vco2tune(-1.8)
  .noiselevel(0.4)
  .ringmod(0.5)
  .hpfcutoff(1084.9).hpfpeak(0.5).hpfenv(-7.84).hpfmg(0.802)
  .lpfcutoff(928.3).lpfpeak(0.532).lpfenv(4.95).lpfmg(0.643)
  .drive(1.5)
  .eg1attack(0.0129).eg1release(0.0032).eg1rev(1)
  .eg2attack(0.4314).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.65).mgwave("saw")
  .pitcheg(17.52)
  .portamento(0.083)
  .modmatrix([{src:11, dst:17}, {src:14, dst:27}, {src:5, dst:16}, {src:6, dst:18}, {src:1, dst:12}, {src:22, dst:13}, {src:25, dst:21}])
  .gain(0.6);

export const ms20_wild_leads = (pat) => pat
  .s("ms20")
  .vco1wave("saw").vco1scale(0.5).vco1level(0.667)
  .vco2wave("square").vco2level(0.5).vco2tune(-12.0)
  .noiselevel(1.0)
  .ringmod(1.0)
  .hpfcutoff(536.5).hpfpeak(0.61).hpfenv(-8.0)
  .lpfcutoff(20000.0).lpfpeak(0.77).lpfenv(-2.41)
  .drive(1.5)
  .eg1attack(0.0067).eg1release(0.0457).eg1rev(1)
  .eg2attack(0.0058).eg2decay(0.001).eg2sustain(1.0).eg2release(0.001)
  .mgfreq(0.91).mgwave("tri")
  .pitcheg(8.88)
  .modmatrix([{src:5, dst:11}, {src:9, dst:30}, {src:10, dst:17}])
  .gain(0.6);

// Bank collections
export const ms20_factory1 = { ms20_n5th_vocoder_pad, ms20_a_little_flutter, ms20_acid_bass, ms20_analog_bass, ms20_analog_guitar, ms20_arpeggio_pad, ms20_ayyayy, ms20_bpf_air_stab, ms20_baff_base, ms20_band_pass_pad, ms20_bend_pwm_lead, ms20_boost_bass, ms20_broken_sync_lead, ms20_chill_detune, ms20_cyber_rev_bass, ms20_darkside_x_bass, ms20_deep_synth_bass, ms20_disco_bass, ms20_drive_squ_bass, ms20_elektrash, ms20_euphoric_stab, ms20_fb_dist_lead, ms20_hard_unison_lead, ms20_heaven_motion, ms20_hoover_uni_bass, ms20_howling_dog, ms20_human_choir, ms20_inner_cmt, ms20_klash_pwm_bass, ms20_ms_motion_pad, ms20_ms_percussion, ms20_ms_poly_stab, ms20_masterblastermw, ms20_morphing_arpline, ms20_noise_snap, ms20_nu_skool_bass, ms20_organ_bass, ms20_pwm_lead, ms20_pwm_sweep_pad, ms20_plink_chord, ms20_pulse_pad, ms20_resonance_piano, ms20_retro_strings, ms20_ring_mod_bell, ms20_ring_mod_fall, ms20_s_h_poly_comp, ms20_sample_hold, ms20_simple_sq_bass, ms20_snake_lead_bass, ms20_solid_bass, ms20_solo_trumpet, ms20_steganography, ms20_surfin_lead, ms20_synthetic_snore, ms20_technostress, ms20_terrible_intro, ms20_tine_piano, ms20_turnback_pizz, ms20_velocity_kick, ms20_vintage_mw_lead, ms20_voco_motion, ms20_whirlwind_pad, ms20_wobble_synth, ms20_yoi_choir };
export const ms20_factory2 = { ms20_sample_hold_factory2, ms20_init_program, ms20_a_little_flutter_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_solid_bass_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_ring_mod_bell_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_ring_mod_fall_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_morphing_arpline_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_sample_hold_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_pwm_lead_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_sample_hold_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_bpf_air_stab_factory2, ms20_simple_sq_bass_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_elektrash_factory2, ms20_pwm_lead_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_analog_bass_factory2, ms20_solid_bass_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_arpeggio_pad_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_retro_strings_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_analog_guitar_factory2, ms20_elektrash_factory2, ms20_sample_hold_factory2, ms20_init_program_factory2, ms20_technostress_factory2, ms20_morphing_arpline_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_pulse_pad_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_elektrash_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2 };
export const ms20_korg_usa = { ms20_n5th_level, ms20_n70schords, ms20_n70s_lead, ms20_n9ths, ms20_absolutekaoss, ms20_accordian, ms20_adiratobass, ms20_analogalead, ms20_baddreams, ms20_bassguitar, ms20_bassinyourface, ms20_beatmaker, ms20_beeo, ms20_bitty, ms20_blast_off, ms20_braininvasion, ms20_brokenmtrcycle, ms20_bubbles, ms20_bugsatnight, ms20_bumpy, ms20_chopitup, ms20_classic_synth, ms20_combo_organ, ms20_crun_j, ms20_death_organ, ms20_don_tgointhere, ms20_fouronthefloor, ms20_funwithmgs, ms20_gnometime, ms20_goforthegold, ms20_holdthesamples, ms20_hopscotch, ms20_lankylead, ms20_laspuertas, ms20_miracleoflife, ms20_noise_net, ms20_noisey, ms20_o2_tank, ms20_orchisection, ms20_organ_fall, ms20_pke_overload, ms20_padsies, ms20_pluckit, ms20_pow, ms20_psychedelicorg, ms20_pumpthepedal, ms20_push_the_limit, ms20_razorbass, ms20_rewindtheflute, ms20_robotentropy, ms20_screamingsoul, ms20_slow_down, ms20_smakthakat, ms20_squaresquared, ms20_stormapproaching, ms20_strings, ms20_surfacebubbles, ms20_synthpad, ms20_tremsper, ms20_vacancy, ms20_vocasynth, ms20_wait_for_it, ms20_woodchipper, ms20_wow_synth };
export const ms20_devine = { ms20_n808_state, ms20_blue_lead_line, ms20_classic_sweeps, ms20_dopolar_dots, ms20_drop_bassline, ms20_elecrix_piano, ms20_high_pass_bass, ms20_mario_land, ms20_mean_bass_grit, ms20_micro_synth, ms20_mild_bliss, ms20_modular_snapshot, ms20_modulate_leads, ms20_mystery_synth, ms20_oberhiem_bass, ms20_old_modular_kit, ms20_old_organ, ms20_old_synth, ms20_plaid_sounds, ms20_play_a_chord, ms20_pulsing_bass_lin, ms20_rainy_dayz, ms20_random_highpass, ms20_repeat_harmony, ms20_rich_cloud, ms20_simple_sines, ms20_spy_synth, ms20_sweep_buzz, ms20_underworld, ms20_watermarks, ms20_whispy_squares, ms20_wild_leads };

export const ms20_all = { ms20_n5th_vocoder_pad, ms20_a_little_flutter, ms20_acid_bass, ms20_analog_bass, ms20_analog_guitar, ms20_arpeggio_pad, ms20_ayyayy, ms20_bpf_air_stab, ms20_baff_base, ms20_band_pass_pad, ms20_bend_pwm_lead, ms20_boost_bass, ms20_broken_sync_lead, ms20_chill_detune, ms20_cyber_rev_bass, ms20_darkside_x_bass, ms20_deep_synth_bass, ms20_disco_bass, ms20_drive_squ_bass, ms20_elektrash, ms20_euphoric_stab, ms20_fb_dist_lead, ms20_hard_unison_lead, ms20_heaven_motion, ms20_hoover_uni_bass, ms20_howling_dog, ms20_human_choir, ms20_inner_cmt, ms20_klash_pwm_bass, ms20_ms_motion_pad, ms20_ms_percussion, ms20_ms_poly_stab, ms20_masterblastermw, ms20_morphing_arpline, ms20_noise_snap, ms20_nu_skool_bass, ms20_organ_bass, ms20_pwm_lead, ms20_pwm_sweep_pad, ms20_plink_chord, ms20_pulse_pad, ms20_resonance_piano, ms20_retro_strings, ms20_ring_mod_bell, ms20_ring_mod_fall, ms20_s_h_poly_comp, ms20_sample_hold, ms20_simple_sq_bass, ms20_snake_lead_bass, ms20_solid_bass, ms20_solo_trumpet, ms20_steganography, ms20_surfin_lead, ms20_synthetic_snore, ms20_technostress, ms20_terrible_intro, ms20_tine_piano, ms20_turnback_pizz, ms20_velocity_kick, ms20_vintage_mw_lead, ms20_voco_motion, ms20_whirlwind_pad, ms20_wobble_synth, ms20_yoi_choir, ms20_sample_hold_factory2, ms20_init_program, ms20_a_little_flutter_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_solid_bass_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_ring_mod_bell_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_ring_mod_fall_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_morphing_arpline_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_sample_hold_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_pwm_lead_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_sample_hold_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_bpf_air_stab_factory2, ms20_simple_sq_bass_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_elektrash_factory2, ms20_pwm_lead_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_analog_bass_factory2, ms20_solid_bass_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_arpeggio_pad_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_retro_strings_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_analog_guitar_factory2, ms20_elektrash_factory2, ms20_sample_hold_factory2, ms20_init_program_factory2, ms20_technostress_factory2, ms20_morphing_arpline_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_pulse_pad_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_elektrash_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_init_program_factory2, ms20_synthetic_snore_factory2, ms20_init_program_factory2, ms20_n5th_level, ms20_n70schords, ms20_n70s_lead, ms20_n9ths, ms20_absolutekaoss, ms20_accordian, ms20_adiratobass, ms20_analogalead, ms20_baddreams, ms20_bassguitar, ms20_bassinyourface, ms20_beatmaker, ms20_beeo, ms20_bitty, ms20_blast_off, ms20_braininvasion, ms20_brokenmtrcycle, ms20_bubbles, ms20_bugsatnight, ms20_bumpy, ms20_chopitup, ms20_classic_synth, ms20_combo_organ, ms20_crun_j, ms20_death_organ, ms20_don_tgointhere, ms20_fouronthefloor, ms20_funwithmgs, ms20_gnometime, ms20_goforthegold, ms20_holdthesamples, ms20_hopscotch, ms20_lankylead, ms20_laspuertas, ms20_miracleoflife, ms20_noise_net, ms20_noisey, ms20_o2_tank, ms20_orchisection, ms20_organ_fall, ms20_pke_overload, ms20_padsies, ms20_pluckit, ms20_pow, ms20_psychedelicorg, ms20_pumpthepedal, ms20_push_the_limit, ms20_razorbass, ms20_rewindtheflute, ms20_robotentropy, ms20_screamingsoul, ms20_slow_down, ms20_smakthakat, ms20_squaresquared, ms20_stormapproaching, ms20_strings, ms20_surfacebubbles, ms20_synthpad, ms20_tremsper, ms20_vacancy, ms20_vocasynth, ms20_wait_for_it, ms20_woodchipper, ms20_wow_synth, ms20_n808_state, ms20_blue_lead_line, ms20_classic_sweeps, ms20_dopolar_dots, ms20_drop_bassline, ms20_elecrix_piano, ms20_high_pass_bass, ms20_mario_land, ms20_mean_bass_grit, ms20_micro_synth, ms20_mild_bliss, ms20_modular_snapshot, ms20_modulate_leads, ms20_mystery_synth, ms20_oberhiem_bass, ms20_old_modular_kit, ms20_old_organ, ms20_old_synth, ms20_plaid_sounds, ms20_play_a_chord, ms20_pulsing_bass_lin, ms20_rainy_dayz, ms20_random_highpass, ms20_repeat_harmony, ms20_rich_cloud, ms20_simple_sines, ms20_spy_synth, ms20_sweep_buzz, ms20_underworld, ms20_watermarks, ms20_whispy_squares, ms20_wild_leads };

export const listMS20FactoryPresets = () => Object.keys(ms20_all);
