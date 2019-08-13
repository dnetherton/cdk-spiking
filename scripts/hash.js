#!/usr/bin/env node

const fs = require('fs')
const crypto = require('crypto')

const sha1 = path => new Promise((resolve, reject) => {
  const hash = crypto.createHash('md5')
  const rs = fs.createReadStream(path)
  rs.on('error', reject)
  rs.on('data', chunk => hash.update(chunk))
  rs.on('end', () => resolve(hash.digest('hex')))
})


sha1(process.argv[2])
.then(x => console.log(x))
