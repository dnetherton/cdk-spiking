#!/bin/bash

set -e
set -x

mkdir -p ./handlers/hello-world/builds
 cp ./handlers/hello-world/package*.json ./handlers/hello-world/builds/
 (set -x && cd ./handlers/hello-world/builds && npm ci --production)
./node_modules/.bin/babel-node ./node_modules/.bin/webpack --config "./handlers/hello-world/webpack.config.js"


mkdir -p ./handlers/goodbye-world/builds
 cp ./handlers/goodbye-world/package*.json ./handlers/goodbye-world/builds/
 (set -x && cd ./handlers/goodbye-world/builds && npm ci --production)
./node_modules/.bin/babel-node ./node_modules/.bin/webpack --config "./handlers/goodbye-world/webpack.config.js"
