import baseConfig from '../../webpack.base.config.js'

export default {
  ...baseConfig(__dirname),
  externals: {
    'aws-sdk': 'commonjs aws-sdk',
    bufferutil: 'commonjs bufferutil',
    'utf-8-validate': 'commonjs utf-8-validate',
    'any-observable': 'commonjs any-observable'
  }
}
