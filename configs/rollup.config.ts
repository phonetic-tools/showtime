import { defineConfig } from 'rollup';
import typescriptPlugin from '@rollup/plugin-typescript';

export default defineConfig({
  input: 'src/index.ts',
  plugins: [
    typescriptPlugin(),
  ],
  output: {
    preserveModules: true,
    dir: 'dist/',
    format: 'es',
  },
});
