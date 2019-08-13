#!/usr/bin/env node
require("@babel/register");
const cdk = require('@aws-cdk/core');
//const { Spike2Stack } = require('../lib/spike2-stack');
const { ServerlessStack } = require('../lib/serverless-stack');

const app = new cdk.App();
//new Spike2Stack(app, 'Spike2Stack');
new ServerlessStack(app, 'ServerlessStack');
