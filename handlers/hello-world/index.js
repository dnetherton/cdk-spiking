const aws = require('aws-sdk')
const sqs = new aws.SQS()

exports.handler = async (event) => {
    return {
        statusCode: 200,
        body: 'Hello world'
    }
}
