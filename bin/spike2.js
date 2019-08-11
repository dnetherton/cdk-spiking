#!/usr/bin/env node
const cdk = require('@aws-cdk/core');
const { Spike2Stack } = require('../lib/spike2-stack');

const app = new cdk.App();
new Spike2Stack(app, 'Spike2Stack');
