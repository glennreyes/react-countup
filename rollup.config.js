import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'build/index.js',
      format: 'cjs',
    },
  ],
  plugins: [
    resolve({ extensions }),
    babel({
      exclude: 'node_modules/**',
      extensions,
    }),
  ],
  external: ['countup.js', 'react', 'react-dom', 'warning'],
};
