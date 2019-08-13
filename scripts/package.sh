#!/usr/bin/env /bin/bash


BUILD_NUMBER="${BUILD_NUMBER:-0}"

mkdir -p ./tmp
cd ./handlers/hello-world/
npm ci --production
zip -qr9 ./../../tmp/hello-world-$BUILD_NUMBER.zip ./
