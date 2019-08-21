import path from 'path'
import webpack from 'webpack'
import TerserPlugin from 'terser-webpack-plugin'
import fs from 'fs'
import {red} from 'chalk'
const fsp = fs.promises

const isPackaged = process.env.SAM_LOCAL !== 'true'

async function buildConfig() {
  const allSubDirs = (await fsp.readdir('./handlers', { withFileTypes: true }))
    .filter(d => d.isDirectory())
    .map(d => ({base: d.name, configPath: path.join(__dirname, './handlers', d.name, 'webpack.config.js')}))

  const dirs = await Promise.all(allSubDirs
    .map(d => fs.existsSync(d.configPath) ? import(d.configPath).then(x => ({...d, config: x.default})) : ({...d, config: {}})))

  return dirs.map(d => ({...configFor(d.base), ...d.config}))
}

function configFor(dir) {
  return {
    entry: path.join(__dirname, 'handlers', dir, 'index.js'),
    target: 'node',
    output: {
      path: path.join(__dirname, 'builds', path.basename(dir)),
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
    mode: isPackaged ? 'production' : 'development',
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
  }
}

export default buildConfig()
