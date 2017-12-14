const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: './src/index.js',
  devtool: 'cheap-eval-source-map',
  output: {
    path: resolve('docs'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@libs': resolve('libs')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')],
        options: {
          presets: ['es2015']
        }
      },
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true
    })
  ],
  devServer: {
    contentBase: resolve('docs'),
    compress: true,
    watchContentBase: true,
    port: 20001,
    host: "0.0.0.0"
  }
};