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

            # Deduplicate slugs
            existing_slugs = {s for s, _, _ in all_presets}
            original_slug = slug
            if slug in existing_slugs:
                slug = slug + '_' + bank_key
            counter = 2
            while slug in existing_slugs:
                slug = original_slug + '_' + bank_key + '_' + str(counter)
                counter += 1
            if slug != original_slug:
                code = code.replace(f'export const {original_slug} ',
                                    f'export const {slug} ', 1)

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
