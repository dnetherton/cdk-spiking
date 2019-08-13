#!/usr/bin/env /bin/bash

### aws s3 mb s3://bucketname --region region

## to publish to cloud..
cdk synth > template.yaml
sam build
sam package --output-template packaged.yaml --s3-bucket bucketname
sam deploy --template-file packaged.yaml --region ap-southeast-2 --capabilities CAPABILITY_IAM --stack-name $STACK_NAME


## sam local
# cdk synth > template.yaml
# sam local start-api
#


