# strudel

Live coding patterns on the web
https://strudel.cc/

- Try it here: <https://strudel.cc>
- Docs: <https://strudel.cc/learn>
- Technical Blog Post: <https://loophole-letters.vercel.app/strudel>
- 1 Year of Strudel Blog Post: <https://loophole-letters.vercel.app/strudel1year>
- 2 Years of Strudel Blog Post: <https://strudel.cc/blog/#year-2>

## Running Locally

After cloning the project, you can run the REPL locally:

1. Install [Node.js](https://nodejs.org/) 18 or newer
2. Install [pnpm](https://pnpm.io/installation)
3. Install dependencies by running the following command:
   ```bash
   pnpm i
   ```
4. Run the development server:
   ```bash
   pnpm dev
   ```

## Using Strudel In Your Project

This project is organized into many [packages](./packages), which are also available on [npm](https://www.npmjs.com/search?q=%40strudel).

Read more about how to use these in your own project [here](https://strudel.cc/technical-manual/project-start).

You will need to abide by the terms of the [GNU Affero Public Licence v3](LICENSE). As such, Strudel code can only be shared within free/open source projects under the same license -- see the license for details.

Licensing info for the default sound banks can be found over on the [dough-samples](https://github.com/felixroos/dough-samples/blob/main/README.md) repository.

## MIDI Controller Support

Strudel supports MIDI input for live control of patterns via hardware controllers:

- **MIDI CC mapping** — Use `midicc()` to map MIDI CC messages from your controller to named sliders in code. Supports MIDI learn mode and manual CC assignment.
- **Named sliders** — Define parameters with `slider(default, min, max)` and assign them names (e.g., `cutoff = slider(1000, 100, 5000)`), then control them from a hardware knob or fader.
- **Master Controls panel** — A floating UI panel that displays all named sliders with both slider and knob views.
- **MIDI clock sync** — Use `midiclockin()` to sync Strudel's tempo to an external MIDI clock source (24 ppqn). Supports Start/Stop/Continue transport messages, configurable smoothing, and BPM change threshold.
- **MS-20 patch library** — Pre-built synth patches inspired by the Korg MS-20, including bass, lead, sync, and pad sounds. Import from `@strudel/superdough/ms20-patches.mjs`.

Example:

```js
await midicc('MS-20i', { 74: 'cutoff', 1: 'resonance' })

cutoff = slider(1000, 100, 5000)
resonance = slider(0.5, 0, 1)
s("bd sd").lpf(cutoff).resonance(resonance)
```

## Contributing

There are many ways to contribute to this project! See [contribution guide](./CONTRIBUTING.md). You can find the full list of contributors [here](https://codeberg.org/uzu/strudel/activity/contributors).

## Community

There is a #strudel channel on the TidalCycles discord: <https://discord.com/invite/HGEdXmRkzT>

You can also ask questions and find related discussions on the tidal club forum: <https://club.tidalcycles.org/>

The discord and forum is shared with the haskell (tidal) and python (vortex) siblings of this project.

We also have a mastodon account: <a rel="me" href="https://social.toplap.org/@strudel">social.toplap.org/@strudel</a>
