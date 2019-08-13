import * as cdk from '@aws-cdk/core'
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda'
import { SqsEventSource } from '@aws-cdk/aws-lambda-event-sources'
import { RestApi, LambdaIntegration } from '@aws-cdk/aws-apigateway'
import { Table, AttributeType } from '@aws-cdk/aws-dynamodb'
import { Queue } from '@aws-cdk/aws-sqs'
import * as sam from '@aws-cdk/aws-sam'
import * as lambda from '@aws-cdk/aws-lambda'

const isPackaged = process.env.SAM_LOCAL !== 'true'

export class ServerlessStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props)

    const helloWorld = new sam.CfnFunction(this, "HelloWorldFunction", {
      codeUri: isPackaged ? 's3://deans-spike/hello-world.zip' : 'handlers/hello-world/',
      handler: "index.handler",
      runtime: Runtime.NODEJS_10_X.name,
      environment: {
        variables: {
          PARAM1: "VALUE"
        }
      },
      events: {
        HelloWorld: {
          type: "Api",
          properties: {
            path: "/hello",
            method: "get"
          }
        }
      }
    })

    new cdk.CfnOutput(this, 'HelloWorldApi', {
      value: cdk.Fn.sub('https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/hello')
    })
  }
}
