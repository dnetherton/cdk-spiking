#!/usr/bin/env /bin/bash

set -e

mkdir -p ./tmp

BUILD_NUMBER="${BUILD_NUMBER:-0}"

find ./handlers/* -maxdepth 0 -type d | \
while read f
do
  name="$(basename -- $f)"
  mkdir -p ./builds/$name
  cp $f/package.json ./builds/$name/
  cp $f/package-lock.json ./builds/$name/
  (cd ./builds/$name && npm ci --production)
done

./node_modules/.bin/babel-node ./node_modules/.bin/webpack

find ./handlers/* -maxdepth 0 -type d | \
while read f
do
  name="$(basename -- $f)"
  (cd ./builds/$name/ && zip -qr9 ./../../tmp/$name-$BUILD_NUMBER.zip ./)
done
