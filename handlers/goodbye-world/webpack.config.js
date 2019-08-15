import baseConfig from '../../webpack.base.config.js'
import path from 'path'

export default {
  ...baseConfig(__dirname),

  entry: path.join(__dirname, 'spike.js'),
  target: 'node',
  output: {
    path: path.join(__dirname, 'builds'),
    filename: 'spike.js',
    libraryTarget: 'umd'
  },

  externals: [{
    'aws-sdk': 'commonjs aws-sdk',
    bufferutil: 'commonjs bufferutil',
    'utf-8-validate': 'commonjs utf-8-validate',
    'any-observable': 'commonjs any-observable',
  },
  'knex',
  'pg',
  'pg-query-stream',
  'sqlite3',
  'tedious',
  'mysql2',
  /^oracle.*$/i,
   /^(mssql.*)$/i
  ]
}
