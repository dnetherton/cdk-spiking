#!/bin/bash

set -e

SAM_LOCAL=true babel-node ./node_modules/.bin/webpack $@
