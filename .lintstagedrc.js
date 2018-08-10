module.exports = {
  '*.js': ['eslint --fix', 'git add'],
  '*.{json,md}': ['prettier --write', 'git add'],
};
