#!/bin/bash

set -e

find ./handlers/* -maxdepth 0 -type d | \
while read f
do
    (cd $f && npm install)
done
