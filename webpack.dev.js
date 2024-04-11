const config = require('./webpack.config');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = merge(config, {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    iife: true,
    library: {
      name: 'FEM',
      type: 'umd',
    },
  },
  devServer: {
    https: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    client: {
      overlay: false,
    },
    hot: true,
    host: '127.0.0.1',
    port: 8000,
    open: true,
    static: {
      publicPath: '/',
    },
    historyApiFallback: true,
    proxy: {
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './test/index.html'
    })
  ],
});