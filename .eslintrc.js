module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
  ],
  parser: 'babel-eslint',
  plugins: ['flowtype'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/no-unused-prop-types': 'off',
    'react/require-default-props': 'off',
  }
};
