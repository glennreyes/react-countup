const path = require('path');
const cssnext = require('postcss-cssnext');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { homepage } = require('./package.json');

module.exports = {
  entry: {
    demo: path.join(__dirname, 'demo'),
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[hash].js',
    publicPath: homepage.endsWith('/') ? homepage : `${homepage}/`,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: 'css?modules&localIdentName=[hash:base64:3]&sourceMap!postcss',
        }),
      },
    ],
  },
  postcss: () => [cssnext({ warnForDuplicates: false })],
  plugins: [

    // Merge duplicate modules
    new webpack.optimize.DedupePlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),

    // Optimize JS
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
    new ExtractTextPlugin('[chunkhash].css'),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'demo', 'index.html'),
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
      },
    }),
  ],
  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
  },
};
