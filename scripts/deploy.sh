#!/usr/bin/env /bin/bash

set -e

BUILD_NUMBER="${BUILD_NUMBER:-0}"

find ./handlers/* -maxdepth 0 -type d | \
while read f
do
  name="$(basename -- $f)"

  aws s3 cp ./tmp/$name-$BUILD_NUMBER.zip s3://deans-spike/$name-$BUILD_NUMBER.zip
done

cdk deploy ServerlessStack
