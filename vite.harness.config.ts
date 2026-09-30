// vite.harness.config.ts — build temporal para medir overflow (ronda 2).
// Un solo archivo inline (sin dynamic imports) para cargarlo con setContent.
// Se elimina antes del push.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, 'harness'),
  build: {
    outDir: resolve(__dirname, 'dist-harness'),
    emptyOutDir: true,
    assetsInlineLimit: 100000000,
    rollupOptions: {
      input: resolve(__dirname, 'harness/index.html'),
      output: { inlineDynamicImports: true },
    },
  },
});
