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

    const vpcDefaultSecurityGroup = cdk.Fn.importValue('Vpc2Stack.defaultSecurityGroup')
    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', { vpcName: 'Vpc2Stack/Vpc2' })

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

//    const databaseSecret = cluster.node.children.find(x => x.node.id === 'Secret').secretArn
    const databaseSecret = 'undefined'

    new cdk.CfnOutput(this, 'db', {
      value: cluster.clusterEndpoint.socketAddress
    })
  }
}
