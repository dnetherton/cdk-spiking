#!/usr/bin/env /bin/bash

BUILD_NUMBER="${BUILD_NUMBER:-0}"

aws s3 cp ./tmp/hello-world-$BUILD_NUMBER.zip s3://deans-spike/hello-world.zip
cdk deploy
