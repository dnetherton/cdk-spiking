import * as sns from '@aws-cdk/aws-sns'
import * as subs from '@aws-cdk/aws-sns-subscriptions'
import * as sqs from '@aws-cdk/aws-sqs'
import * as cdk from '@aws-cdk/core'

export class Spike2Stack extends cdk.Stack {
  /**
   * @param {cdk.App} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props)

    const queue = new sqs.Queue(this, 'Spike2Queue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    })

    const topic = new sns.Topic(this, 'Spike2Topic')

    topic.addSubscription(new subs.SqsSubscription(queue))
  }
}
