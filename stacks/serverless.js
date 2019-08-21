import * as ec2 from '@aws-cdk/aws-ec2'
import * as cdk from '@aws-cdk/core'
import * as iam from '@aws-cdk/aws-iam'
import {Runtime} from '@aws-cdk/aws-lambda'
import * as sam from '@aws-cdk/aws-sam'

const isPackaged = process.env.SAM_LOCAL !== 'true'
const buildNumber = process.env.BUILD_NUMBER ?? '0'

const localDbConnection = {
  password: 'docker',
  dbname: 'blah',
  engine: 'mysql',
  port: 3306,
  host: 'mysql-docker',
  username: 'root'
}

const stageName = 'blah'

export class ServerlessStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props)

    if (isPackaged)
      new cdk.CfnInclude(this, 'Spike', {
        template: {Globals: {Api: {OpenApiVersion: '2.0'}}}
      })

    const vpcDefaultSecurityGroup = cdk.Fn.importValue('DEANdefaultSecurityGroup')



    const api = new sam.CfnApi(this, 'MyServerlessApi', {
      stageName,
      openApiVersion: '2.0'
    })

    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', { vpcName: 'Vpc2Stack/Vpc2' })

    const helloWorld = new sam.CfnFunction(this, "HelloWorldFunction", {
      codeUri: isPackaged ? `s3://deans-spike/hello-world-${buildNumber}.zip` : 'builds/hello-world',
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
      securityGroupIds: [vpcDefaultSecurityGroup],
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
      managedPolicyName: 'deans-policy',
      policyDocument
    })

    const goodbyeWorld = new sam.CfnFunction(this, "GoodbyeWorldFunction", {
      codeUri: isPackaged ? `s3://deans-spike/goodbye-world-${buildNumber}.zip` : 'builds/goodbye-world',
      handler: "index.handler",
      runtime: Runtime.NODEJS_10_X.name,
      policies: policy.ref,
      vpcConfig,
      environment: {
        variables: {
          DATABASE_SECRET: isPackaged ? 'databaseSecret' : undefined,
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
  }
}
