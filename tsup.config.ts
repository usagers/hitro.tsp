import { defineConfig } from 'tsup'

export default defineConfig([
  {
    target: 'es6',
    format: 'iife',
    entry: { browser: './library/index.ts' },
    outExtension: () => ({ js: '.js' }),
    globalName: 'tsp',
    sourcemap: false,
    minify: true,
    clean: true,
    dts: false,
  },
  {
    format: 'esm',
    target: 'esnext',
    entry: { index: './library/index.ts' },
    sourcemap: false,
    clean: false,
    dts: true,
  },
])
