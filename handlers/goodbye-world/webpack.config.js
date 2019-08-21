
export default {
  externals: [
    {
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
