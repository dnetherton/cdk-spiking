import * as ec2 from '@aws-cdk/aws-ec2'
import * as ecs from '@aws-cdk/aws-ecs'
import * as cdk from '@aws-cdk/core'
import * as ecsPatterns from '@aws-cdk/aws-ecs-patterns'

export class Vpc2Stack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props)

    const vpc = new ec2.Vpc(this, 'Vpc2', { maxAzs: 2 })

    new cdk.CfnOutput(this, 'vpcId', {
      value: vpc.resource.node.scope.vpcId
    })
  }
}
