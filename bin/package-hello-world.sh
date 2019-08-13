#!/usr/bin/env /bin/bash

cd ./handlers/hello-world

npm ci --production
zip -qr9 /tmp/myzip.zip ./
aws s3 cp /tmp/myzip.zip s3://deans-spike/hello-world.zip
