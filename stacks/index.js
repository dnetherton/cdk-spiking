import * as cdk from '@aws-cdk/core'
import { ServerlessStack } from './serverless'

const app = new cdk.App()
new ServerlessStack(app, 'ServerlessStack')

