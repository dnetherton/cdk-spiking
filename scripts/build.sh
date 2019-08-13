#!/bin/bash

set -e
set -x

#babel --config-file ./.babelrc.js  ./handlers/hello-world/*.js --source-maps both -d ./handlers/hello-world/builds/
mkdir -p ./handlers/hello-world/builds

 cp ./handlers/hello-world/package*.json ./handlers/hello-world/builds/
 (set -x && cd ./handlers/hello-world/builds && npm ci --production)

./node_modules/.bin/babel-node --config-file ./.babelrc.js ./node_modules/.bin/webpack --config "./handlers/hello-world/webpack.config.js"
