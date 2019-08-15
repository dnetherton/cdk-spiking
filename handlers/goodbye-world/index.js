import AWS from 'aws-sdk'
import awsAsPromise from 'aws-sdk-as-promise'
import knex from 'knex'

const delay = period => new Promise(res => setTimeout(res, period))

const region = process.env.AWS_REGION || 'ap-southeast-2'
AWS.config.update({region})

let cachedSecret
async function getDataConnectionDetails() {
  if (cachedSecret)
    return cachedSecret

  if (process.env.DATABASE)
    return cachedSecret = JSON.parse(process.env.DATABASE)

  const secretsmanager = awsAsPromise(new AWS.SecretsManager())
  cachedSecret = await secretsmanager.getSecretValue({SecretId: process.env.DATABASE_SECRET})
  return JSON.parse(cachedSecret.SecretString)
}

export async function handler(event) {

  try {
    const x = await getDataConnectionDetails()

    console.log(JSON.stringify(x))
    const db = knex({
      client: 'mysql',
      connection: {
        host: x.host,
        user: x.username,
        password: x.password,
        database: x.dbname
      }
    });

    const result = await db.raw('select 1 as blah')

    await delay(1500)
    return {
      statusCode: 200,
      body: `Database connection: ${JSON.stringify(result)}\n`
    }
  } catch(err) {
    console.log(err.stack)
    await delay(1500)
    return {
      statusCode: 500,
      body: err.stack
    }
  }
}
