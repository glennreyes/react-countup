module.exports = {
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transformIgnorePatterns: [
    "/node_modules/(?!countup\\.js).+\\.js$",
  ],
};
