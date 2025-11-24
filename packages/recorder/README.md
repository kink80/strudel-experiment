# @strudel/recorder

MIDI Pattern Recorder for strudel - record MIDI input, quantize to a grid, and generate strudel pattern code.

## Features

- Real-time MIDI input recording
- Adjustable BPM and pattern length
- Quantization to musical grid
- Automatic strudel pattern code generation
- Interactive pad controller UI
- Playback visualization

## Installation

```sh
npm i @strudel/recorder --save
```

## Usage

```javascript
import { createRecorder } from '@strudel/recorder';

const recorder = createRecorder({
  bpm: 120,
  patternLength: 16,
  midiDevice: 'Your MIDI Device'
});

// Start recording
await recorder.startRecording();

// Stop and generate pattern
const strudelCode = recorder.stopRecording();
console.log(strudelCode); // e.g., note("[60 62] [64 ~]")
```

## API

### `createRecorder(options)`

Creates a new recorder instance.

Options:
- `bpm`: Beats per minute (default: 120)
- `patternLength`: Number of steps (default: 16)
- `midiDevice`: MIDI input device name or index

### `recorder.startRecording()`

Starts recording MIDI input with a 1-bar pre-roll.

### `recorder.stopRecording()`

Stops recording, quantizes the data, and returns the generated strudel code.

### `recorder.getState()`

Returns the current recording state: `'idle'`, `'ready'`, `'recording'`, or `'stopped'`.

### `recorder.getRecordedEvents()`

Returns the raw recorded MIDI events before quantization.

## Integration with strudel REPL

The recorder is integrated into the strudel REPL as a panel tab, providing a visual interface for recording and generating patterns.
