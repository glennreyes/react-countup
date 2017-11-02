module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: ['airbnb', 'plugin:flowtype/recommended', 'prettier'],
  parser: 'babel-eslint',
  plugins: ['flowtype'],
  rules: {
    'react/default-props-match-prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/no-unused-prop-types': 'off',
  },
};
