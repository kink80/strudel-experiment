import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'index.mjs',
      formats: ['es'],
      fileName: () => 'index.mjs',
    },
    rollupOptions: {
      external: ['@strudel/core', '@strudel/webaudio', 'webmidi'],
    },
  },
});
