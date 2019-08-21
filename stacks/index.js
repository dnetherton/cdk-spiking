import * as cdk from '@aws-cdk/core'
import { ServerlessStack } from './serverless'
import { FargateStack } from './fargate'
import { Vpc2Stack } from './vpc'

const env = {account: '672317684965', region: 'ap-southeast-2'}
const app = new cdk.App()
new ServerlessStack(app, 'ServerlessStack', {env})
new FargateStack(app, 'FargateStack', {env})
new Vpc2Stack(app, 'Vpc2Stack', {env})
