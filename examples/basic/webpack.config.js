const path = require('path');
const cssnano = require('cssnano');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        // Transform our own .css files with PostCSS and CSS-modules
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&sourceMap',
          'postcss'
        ],
        exclude: /node_modules/,
      },
      {
        // Transform our own .css files with PostCSS and CSS-modules
        test: /\.css$/,
        loaders: [
          'style',
          'css',
          'postcss'
        ],
        include: /node_modules/,
      }
    ]
  },
  postcss: function() {
    return [
      cssnano()
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
};
