#!/bin/bash

set -e
set -x

cd ./handlers/hello-world
npm install ## TODO: Use docker/amazon linux
cd ../..

cd ./handlers/goodbye-world
npm install ## TODO: Use docker/amazon linux
cd ../..
