module.exports = {
  transform: {
    '^.+\\.(js|ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!countup.js)'],
  setupFiles: ['raf/polyfill'],
  testURL: 'http://localhost',
};
