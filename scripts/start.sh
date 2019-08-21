#!/bin/bash

set -e

SAM_LOCAL=true cdk synth ServerlessStack > .template.yaml

sam local start-api -t .template.yaml --docker-network lambda-local
