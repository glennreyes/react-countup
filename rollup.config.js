import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    file: 'build/index.js',
    format: 'cjs',
  },
  plugins: [typescript()],
  external: ['countup.js', 'prop-types', 'react', 'react-dom', 'warning'],
};
