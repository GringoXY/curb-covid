const path = require('path');
const json = require('json-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },

  entry: {
    index: ['./src/js/index.js', './src/scss/index.scss'],
    'covid-test': ['./src/js/covid-test.js', './src/scss/covid-test.scss'],
    'covid-poland': ['./src/js/covid-poland.js', './src/scss/covid-poland.scss'],
    'covid-world': ['./src/js/covid-world.js', './src/scss/covid-world.scss'],
    'about-us': ['./src/js/about-us.js', './src/scss/about-us.scss'],
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/'),
  },

  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './src/assets/',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[hash].[ext]',
          outputPath: 'images',
          publicPath: 'images',
          omitFile: true,
          esModule: false,
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[hash].[ext]',
            outputPath: 'fonts',
            publicPath: 'fonts',
          },
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: './src/covid-test.html',
      filename: './covid-test.html',
      chunks: ['covid-test'],
    }),
    new HtmlWebpackPlugin({
      template: './src/covid-poland.html',
      filename: './covid-poland.html',
      chunks: ['covid-poland'],
    }),
    new HtmlWebpackPlugin({
      template: './src/covid-world.html',
      filename: './covid-world.html',
      chunks: ['covid-world'],
    }),
    new HtmlWebpackPlugin({
      template: './src/about-us.html',
      filename: './about-us.html',
      chunks: ['about-us'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CleanWebpackPlugin(),
  ],
};