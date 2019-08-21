import * as ec2 from '@aws-cdk/aws-ec2'
import * as cdk from '@aws-cdk/core'

export class Vpc2Stack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props)

    const vpc = new ec2.Vpc(this, 'Vpc2', {maxAzs: 2})

    new cdk.CfnOutput(this, 'vpcId', {
      value: vpc.resource.node.scope.vpcId
    })

    new cdk.CfnOutput(this, 'DEANdefaultSecurityGroup', {
      value: vpc.vpcDefaultSecurityGroup,
      exportName: 'DEANdefaultSecurityGroup'
    })
  }
}
