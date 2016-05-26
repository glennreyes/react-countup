const path = require('path');
const cssnano = require('cssnano');
const cssnext = require('postcss-cssnext');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    demo: [path.join(__dirname, 'demo'), 'webpack-hot-middleware/client'],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        // Transform our own .css files with PostCSS and CSS-modules
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&localIdentName=[local]_[hash:base64:3]&sourceMap',
          'postcss',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css',
          'postcss',
        ],
        include: /node_modules/,
      },
    ],
  },
  postcss: () => [cssnext({ warnForDuplicates: false }), cssnano()],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'demo', 'index.html'),
    }),
  ],
};
