#!/usr/bin/env /bin/bash

set -x
set -e

BUILD_NUMBER="${BUILD_NUMBER:-0}"

export HELLO_WORLD_HASH=$(./scripts/hash.js ./tmp/hello-world-$BUILD_NUMBER.zip)
aws s3 cp ./tmp/hello-world-$BUILD_NUMBER.zip s3://deans-spike/hello-world-$BUILD_NUMBER-$HELLO_WORLD_HASH.zip

export GOODBYE_WORLD_HASH=$(./scripts/hash.js ./tmp/goodbye-world-$BUILD_NUMBER.zip)
aws s3 cp ./tmp/goodbye-world-$BUILD_NUMBER.zip s3://deans-spike/goodbye-world-$BUILD_NUMBER-$GOODBYE_WORLD_HASH.zip
cdk deploy
