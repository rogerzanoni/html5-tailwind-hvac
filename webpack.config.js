const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    ASSETS: './src/assets.js',
    HVAC: './src/hvac.js',
    BUTTONS: './src/buttons.js',
    CHAIRS: './src/chairs.js',
    FAN_SPEED: './src/fan_speed.js',
    PATHS: './src/paths.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/appinfo.json',
          to: 'appinfo.json'
        },
        {
          from: 'assets/images/*',
          to: 'images/[name][ext]'
        }
      ]
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: '[name]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
