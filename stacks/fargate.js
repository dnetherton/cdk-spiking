import * as ec2 from '@aws-cdk/aws-ec2'
import * as ecs from '@aws-cdk/aws-ecs'
import * as iam from '@aws-cdk/aws-iam'
import * as cdk from '@aws-cdk/core'
import * as ecsPatterns from '@aws-cdk/aws-ecs-patterns'

export class FargateStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props)

    //const spike = core.fn.importValue('VpcStack.vpcSpike')

    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', { vpcName: 'Vpc2Stack/Vpc2' })

    const cluster = new ecs.Cluster(this, 'Ec2Cluster', { vpc })


    // create a task definition with CloudWatch Logs
/*    const logging = new ecs.AwsLogDriver({
      streamPrefix: "myapp",
    })
*/

    const executionRole = new iam.Role(this, 'TaskRole', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com')
    })

    executionRole.addToPolicy(new iam.PolicyStatement({
      resources: '*',
      actions: [
        'ecr:BatchCheckLayerAvailability',
        'ecr:BatchGetImage',
        'ecr:GetDownloadUrlForLayer',
        'ecr:GetAuthorizationToken'
      ]
    }))

    const imageName = 'amazon/amazon-ecs-sample'
    const f = new ecsPatterns.LoadBalancedFargateService(this, "MyFargateService", {
      cluster: cluster, // Required
      cpu: 256, // Default is 256
      desiredCount: 1, // Default is 1
      image: ecs.ContainerImage.fromRegistry('672317684965.dkr.ecr.ap-southeast-2.amazonaws.com/spike:latest'), // Required
      memoryLimitMiB: 512, // Default is 512
      publicLoadBalancer: true, // Default is false
      enableLogging: true,
      executionRole
    })

   f.service.resource.deploymentConfiguration.maximumPercent = 100
   f.service.resource.deploymentConfiguration.minimumHealthyPercent = 0

/*
    const taskDef = new ecs.FargateTaskDefinition(this, "MyTaskDefinition", {
      memoryLimitMiB: 512,
      cpu: 256,
    })

    taskDef.addContainer("AppContainer", {
      image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
      logging,
    })

    // Instantiate ECS Service with just cluster and image
    new ecs.FargateService(this, "FargateService", {
      cluster,
      taskDefinition: taskDef
    })*/
  }
}
