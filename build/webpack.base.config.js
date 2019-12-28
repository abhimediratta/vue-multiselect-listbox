const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const devtool = env === 'production' ? 'source-map' : 'eval-source-map';

module.exports = {
  mode: env,
  devtool,
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      utils: path.resolve(__dirname, 'src/utils/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, '../'),
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        loader: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
