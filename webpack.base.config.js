import path from 'path'
import webpack from 'webpack'
import TerserPlugin from 'terser-webpack-plugin'
import fs from 'fs'
import {red} from 'chalk'

const fsp = fs.promises

export default dir => ({
  entry: path.join(dir, 'index.js'),
  target: 'node',
  output: {
    path: path.join(dir, 'builds'),
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 8,
          toplevel: true,
          compress: {
            dead_code: true
          },
          verbose: true,
          output: {
            ecma: 8,
            comments: false,
          }
        }
      })
    ]
  },
  mode: 'production',
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules)/,
      use: {loader: 'babel-loader'}
    },
    {
      test: /\.js$/,
      use: ['remove-hashbag-loader']
    }]
  },
  resolveLoader: {
    alias: {
      'remove-hashbag-loader': path.join(__dirname, './remove-hashbag-loader')
    }
  },
  plugins: [
  ],
  devtool: 'node',
  node: {
    __dirname: false
  }
})
