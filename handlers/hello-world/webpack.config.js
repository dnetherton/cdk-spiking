import baseConfig from '../../webpack.base.config.js'

export default {
  ...baseConfig(__dirname),
  externals: {
    'async_iter/pipeline': 'commonjs async_iter/pipeline',
    'aws-sdk': 'commonjs aws-sdk',
    bufferutil: 'commonjs bufferutil',
    'utf-8-validate': 'commonjs utf-8-validate',
    'any-observable': 'commonjs any-observable'
  }
}
