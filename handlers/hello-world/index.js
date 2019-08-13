import aws from 'aws-sdk'
import {map} from 'async_iter/pipeline'

export async function handler(event) {
  return {
    statusCode: 200,
    body: 'Hello world--44444'
  }
}
