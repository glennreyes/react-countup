const path = require('path');
const cssnano = require('cssnano');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    demo: [path.join(__dirname, 'demo'), 'webpack-hot-middleware/client'],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[hash].js',
    publicPath: './',
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
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', [
          'css?modules&localIdentName=[hash:base64:3]&sourceMap',
          'postcss',
        ]),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', [
          'css',
          'postcss',
        ]),
        include: /node_modules/,
      },
    ],
  },
  postcss: () => [cssnano()],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
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
};
