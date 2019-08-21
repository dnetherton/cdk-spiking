#!/usr/bin/env /bin/bash

set -x
set -e

BUILD_NUMBER="${BUILD_NUMBER:-0}"

aws s3 cp ./tmp/hello-world-$BUILD_NUMBER.zip s3://deans-spike/hello-world-$BUILD_NUMBER.zip
aws lambda update-function-code --function-name ServerlessStack-HelloWorldFunction-GF1LR6HETRV4 --s3-bucket deans-spike --s3-key=hello-world-$BUILD_NUMBER.zip
