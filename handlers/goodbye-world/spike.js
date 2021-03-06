import AWS from 'aws-sdk'
import awsAsPromise from 'aws-sdk-as-promise'
import knex from 'knex'

const delay = period => new Promise(res => setTimeout(res, period))

const region = process.env.AWS_REGION || 'ap-southeast-2'
AWS.config.update({region})


export async function main() {

  const db = knex({
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'docker',
      database: 'blah'
    }
  });

  const result = await db.raw('select 1 as blah')

  console.log(result)

  db.destroy()
  //console.log(db)
}

main()
