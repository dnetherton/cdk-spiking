#!/usr/bin/env /bin/bash

set -x
set -e

BUILD_NUMBER="${BUILD_NUMBER:-0}"

mkdir -p ./tmp
cd ./handlers/hello-world/builds/
npm ci --production
zip -qr9 ./../../../tmp/hello-world-$BUILD_NUMBER.zip ./
