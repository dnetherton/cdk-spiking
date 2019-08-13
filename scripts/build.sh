#!/bin/bash

set -e
set -x

#babel ./handlers/hello-world/*.js --source-maps both -d ./handlers/hello-world/builds/
mkdir -p ./handlers/hello-world/builds

# cp ./package* ./handlers/hello-world/builds/
# (cd ./handlers/hello-world/builds && npm ci --production)

./node_modules/.bin/babel-node --config-file ./.babelrc.js ./node_modules/.bin/webpack --config "./handlers/hello-world/webpack.config.js"
