const path = require('path');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
const config = require('./webpack.config');
const { merge } = require('webpack-merge');

module.exports = merge(config, {
  mode: 'production',
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
});