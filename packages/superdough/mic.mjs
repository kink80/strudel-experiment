/*
mic.mjs - microphone input sound for superdough
Copyright (C) 2025 Strudel contributors
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { registerSound } from './superdough.mjs';
import { getAudioContext } from './audioContext.mjs';
import { gainNode, getADSRValues, getParamADSR, webAudioTimeout } from './helpers.mjs';

let micPromise;
let micSource;

/**
 * Request microphone access and return a MediaStreamAudioSourceNode.
 * Reuses the stream and source node if already created.
 */
export async function getMicSource() {
  const ac = getAudioContext();
  if (!micPromise) {
    micPromise = navigator.mediaDevices.getUserMedia({ audio: true }).catch((err) => {
      micPromise = null;
      throw err;
    });
  }
  const stream = await micPromise;
  if (!micSource) {
    micSource = ac.createMediaStreamSource(stream);
  }
  return micSource;
}

/**
 * Register the 'mic' sound in superdough.
 * It can be used as s('mic') in Strudel.
 */
export function registerMicSound() {
  registerSound(
    'mic',
    async (t, value, onended) => {
      const ac = getAudioContext();
      let source;
      try {
        source = await getMicSource();
      } catch (err) {
        console.error('Could not access microphone', err);
        onended();
        return;
      }

      const { duration } = value;
      const [attack, decay, sustain, release] = getADSRValues(
        [value.attack, value.decay, value.sustain, value.release],
        'linear',
        [0.01, 0, 1, 0.01],
      );

      const envGain = gainNode(0);
      source.connect(envGain);

      const holdEnd = t + duration;
      getParamADSR(envGain.gain, attack, decay, sustain, release, 0, 1, t, holdEnd, 'linear');

      const end = holdEnd + release + 0.01;

      const timeoutNode = webAudioTimeout(
        ac,
        () => {
          source.disconnect(envGain);
          envGain.disconnect();
          onended();
        },
        t,
        end,
      );

      return {
        node: envGain,
        stop: (endTime) => {
          timeoutNode.stop(endTime);
        },
      };
    },
    { type: 'mic' },
  );
}
