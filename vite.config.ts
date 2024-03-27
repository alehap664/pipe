import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        'utilities/index': path.resolve(__dirname, 'src/utilities/index.ts')
      }
    }
  },
  plugins: [dts()]
});
