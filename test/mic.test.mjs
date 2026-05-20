import { describe, it, expect, vi } from 'vitest';
import { registerMicSound, getSound } from '../packages/superdough/index.mjs';

describe('mic sound', () => {
  it('should register the mic sound', () => {
    registerMicSound();
    const sound = getSound('mic');
    expect(sound).toBeDefined();
    expect(sound.data.type).toBe('mic');
  });

  it('onTrigger should request microphone access', async () => {
    // Mocking browser APIs
    vi.stubGlobal('navigator', {
      mediaDevices: {
        getUserMedia: vi.fn().mockResolvedValue({
          getAudioTracks: () => [{ stop: vi.fn() }],
        }),
      },
    });

    const mockAudioContext = {
      currentTime: 0,
      createGain: vi.fn().mockReturnValue({
        gain: {
          setValueAtTime: vi.fn(),
          linearRampToValueAtTime: vi.fn(),
        },
        connect: vi.fn(),
        disconnect: vi.fn(),
      }),
      createMediaStreamSource: vi.fn().mockReturnValue({
        connect: vi.fn(),
      }),
    };

    vi.mock('../packages/superdough/audioContext.mjs', () => ({
      getAudioContext: vi.fn(),
    }));
    const { getAudioContext } = await import('../packages/superdough/audioContext.mjs');
    getAudioContext.mockReturnValue(mockAudioContext);

    vi.mock('../packages/superdough/helpers.mjs', async () => {
      const actual = await vi.importActual('../packages/superdough/helpers.mjs');
      return {
        ...actual,
        webAudioTimeout: vi.fn().mockReturnValue({
          stop: vi.fn(),
        }),
      };
    });

    registerMicSound();
    const sound = getSound('mic');
    const onended = vi.fn();
    const value = { duration: 1 };

    const handle = await sound.onTrigger(0, value, onended);

    expect(global.navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({ audio: true });
    expect(mockAudioContext.createMediaStreamSource).toHaveBeenCalled();
    expect(handle).toBeDefined();
    expect(handle.node).toBeDefined();
  });
});
