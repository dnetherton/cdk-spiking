import * as cdk from '@aws-cdk/core'
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda'
import { SqsEventSource } from '@aws-cdk/aws-lambda-event-sources'
import { RestApi, LambdaIntegration } from '@aws-cdk/aws-apigateway'
import { Table, AttributeType } from '@aws-cdk/aws-dynamodb'
import { Queue } from '@aws-cdk/aws-sqs'
import * as sam from '@aws-cdk/aws-sam'
import * as lambda from '@aws-cdk/aws-lambda'
import fs from 'fs'
import crypto from 'crypto'

const isPackaged = process.env.SAM_LOCAL !== 'true'
const buildNumber = process.env.BUILD_NUMBER ?? '0'
const hash = process.env.HASH

const stageName = 'blah'

export class ServerlessStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props)

    const x = new cdk.CfnInclude(this, 'Spike', {
      template: {Globals: {Api: {OpenApiVersion: '2.0'}}}
    })

    const api = new sam.CfnApi(this, 'MyServerlessApi', {
      stageName,
      openApiVersion: '2.0'
    })

    const helloWorld = new sam.CfnFunction(this, "HelloWorldFunction", {
      codeUri: isPackaged ? `s3://deans-spike/hello-world-${buildNumber}.zip` : 'handlers/hello-world/builds',
      handler: "index.handler",
      runtime: Runtime.NODEJS_10_X.name,
      environment: {
        variables: {
          PARAM1: "VALUE!!-1122"
        }
      },
      events: {
        HelloWorld: {
          type: "Api",
          properties: {
            path: "/hello",
            method: "get",
            restApiId: api.ref
          }
        }
      }
    })

    new cdk.CfnOutput(this, 'HelloWorldApi', {
      value: cdk.Fn.sub(`https://$\{MyServerlessApi}.execute-api.$\{AWS::Region}.amazonaws.com/${stageName}/hello`)
    })

    const goodbyeWorld = new sam.CfnFunction(this, "GoodbyeWorldFunction", {
      codeUri: isPackaged ? `s3://deans-spike/goodbye-world-${buildNumber}.zip` : 'handlers/goodbye-world/builds',
      handler: "index.handler",
      runtime: Runtime.NODEJS_10_X.name,
      events: {
        GoodbyeWorld: {
          type: "Api",
          properties: {
            path: "/goodbye",
            method: "get",
            restApiId: api.ref
          }
        }
      }
    })

    new cdk.CfnOutput(this, 'GoodbyeWorldApi', {
      value: cdk.Fn.sub(`https://$\{MyServerlessApi}.execute-api.$\{AWS::Region}.amazonaws.com/${stageName}/goodbye`)
    })
  }
}
