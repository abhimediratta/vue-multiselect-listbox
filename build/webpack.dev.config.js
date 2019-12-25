const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');

module.exports = merge(baseWebpackConfig, {
  entry: './dev/dev.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: './dev/dev.html',
      inject: true,
    }),
  ],
  devServer: {
    hot: true,
    hotOnly: true,
    open: true,
    inline: true,
    port: 8080,
  },
});
