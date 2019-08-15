#!/bin/bash

set -e
set -x

sam logs --stack-name ServerlessStack -n $@
