const path = require('path');
const WebpackBar = require('webpackbar');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    asyncChunks: true,
    clean: true,
    publicPath: '/',
    //按需加载
    chunkFilename: '[name]_[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(ts)?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          },
        ],
        exclude: /node_modules/
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new WebpackBar()
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
};