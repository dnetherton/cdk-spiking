import path from 'path'
import webpack from 'webpack'
import TerserPlugin from 'terser-webpack-plugin'
import fs from 'fs'
import {red} from 'chalk'

const fsp = fs.promises

export default {
  entry: path.join(__dirname, 'index.js'),
  target: 'node',
  output: {
    path: path.join(__dirname, 'builds'),
    filename: 'index.js'
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
  externals: {
    'aws-sdk': 'commonjs aws-sdk',
    'async_iter/pipeline': 'commonjs async_iter/pipeline',
    bufferutil: 'commonjs bufferutil',
    'utf-8-validate': 'commonjs utf-8-validate',
    'any-observable': 'commonjs any-observable'
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
      'remove-hashbag-loader': path.join(__dirname, '../../remove-hashbag-loader')
    }
  },
  plugins: [
  ],
  devtool: 'node',
  node: {
    __dirname: false
  }
}
