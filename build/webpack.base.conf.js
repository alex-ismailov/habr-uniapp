const path = require('path');// рекомендуется всегда подключать вручную
const fs = require('fs');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const json = require('./file.json');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
};

const PAGES_DIR = `${PATHS.src}/html/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter((fileName) => fileName.endsWith('.html'));

module.exports = {
  // Необходимо для того чтобы получить доступ к PATHS из других конфигов
  externals: {
    paths: PATHS, // Ярлык для PATHS
  },
  entry: {
    app: `${PATHS.src}/client.js`,
  },
  output: {
    filename: `${PATHS.assets}js/[name].[chunkhash].js`,
    path: PATHS.dist,
    publicPath: '/', // Необходимо для dev-server, публичный. это уже из хабра http://localhost:8050/public/assets'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        // loader: 'babel-loader', // Указываем через что необхожимо обрабатывать js файлы
        exclude: [/node_modules/, `${PATHS.dist}/${PATHS.assets}js/`],
        use: ['babel-loader', 'eslint-loader'],
      }, {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true},
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: {path: `./postcss.config.js`}},
          }, {
            loader: 'sass-loader',
            options: { sourceMap: true},
          },
        ],
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      }, {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader', // из хабра loader: 'url-loader?limit=1'
        options: {
          name: '[name].[ext]',
        },
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      },

    ],
  },
  resolve: {
    alias: {
      '~': 'src',
    },
  },
  plugins: [
    ...PAGES.map(page => new htmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page}`,
    })),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[contenthash].css`,
    }),
    new CopyWebpackPlugin([ //каждый новый путь это новый объект
      { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img`},
      { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts`},
      { from: `${PATHS.src}/static`, to: ''},
    ]),
  ],
};
