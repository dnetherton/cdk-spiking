import * as ec2 from '@aws-cdk/aws-ec2'
import * as rds from '@aws-cdk/aws-rds'
import * as cdk from '@aws-cdk/core'
import * as iam from '@aws-cdk/aws-iam'
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
const helloWorldHash = process.env.HELLO_WORLD_HASH
const goodbyeWorldHash = process.env.GOODBYE_WORLD_HASH

const localDbConnection = {
  "password": "docker",
  "dbname": "blah",
  "engine": "mysql",
  "port": 3306,
  "host": "mysql-docker",
  "username": "root"
}

const stageName = 'blah'

export class ServerlessStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props)

    if (isPackaged)
      new cdk.CfnInclude(this, 'Spike', {
        template: {Globals: {Api: {OpenApiVersion: '2.0'}}}
      })

    const api = new sam.CfnApi(this, 'MyServerlessApi', {
      stageName,
      openApiVersion: '2.0'
    })

    const vpc = new ec2.Vpc(this, 'MyVpc', { maxAzs: 2 })

    const cluster = new rds.DatabaseCluster(this, 'Database', {
      engine: rds.DatabaseClusterEngine.AURORA,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      masterUser: {
        username: 'dean'
      },
      defaultDatabaseName: 'blah',
      instanceProps: {

        instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.SMALL),
        vpcSubnets: {
          subnetType: ec2.SubnetType.Private,
        },
        vpc
      }
    })

/*    const resource = cluster.node.children.find(x => x.node.id === 'Resource')
    resource.enableIamDatabaseAuthentication = true
*/

    const databaseSecret = cluster.node.children.find(x => x.node.id === 'Secret').secretArn

    new cdk.CfnOutput(this, 'db', {
      value: cluster.clusterEndpoint.socketAddress
    })

    const helloWorld = new sam.CfnFunction(this, "HelloWorldFunction", {
      codeUri: isPackaged ? `s3://deans-spike/hello-world-${buildNumber}-${helloWorldHash}.zip` : 'handlers/hello-world/builds',
      handler: "index.handler",
      runtime: Runtime.NODEJS_10_X.name,
      environment: {
        variables: {
          PARAM1: "VALUE!!-1122!!!!!"
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

    const vpcConfig = {
      securityGroupIds: [vpc.vpcDefaultSecurityGroup],
      subnetIds: vpc.privateSubnets.map(x => x.subnetId)
    }

    const statement = new iam.PolicyStatement({
      resources: ['*'],
      actions: [
        'ec2:DescribeNetworkInterfaces',
        'ec2:CreateNetworkInterface',
        'ec2:DeleteNetworkInterface',
        'secretsmanager:GetSecretValue'
      ]
    })

    const policyDocument = new iam.PolicyDocument()
    policyDocument.addStatements(statement)
    const policy = new iam.CfnManagedPolicy(this, 'lambdaPolicy', {
      managedPolicyName: 'deans-policy-aaaaaaaaaaaab',
      policyDocument
    })


    const goodbyeWorld = new sam.CfnFunction(this, "GoodbyeWorldFunction", {
      codeUri: isPackaged ? `s3://deans-spike/goodbye-world-${buildNumber}-${goodbyeWorldHash}.zip` : 'handlers/goodbye-world/builds',
      handler: "index.handler",
      runtime: Runtime.NODEJS_10_X.name,
      policies: policy.ref,
      vpcConfig,
      environment: {
        variables: {
          DATABASE_SECRET: isPackaged ? databaseSecret : undefined,
          DATABASE: isPackaged ? undefined : JSON.stringify(localDbConnection)
        }
      },
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

    new cdk.CfnOutput(this, 'databaseSecret', {
      value: databaseSecret
    })
  }
}
