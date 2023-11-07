import React from 'react'
import { getData } from '../../../utils/data/getData'
import axios from 'axios'

const Page = async () => {
  // const data = await getData()
  // console.log('hello')
  const getdb = () => {
    // curl --location --request POST 'https://tender-cardinal-77.hasura.app/v1/graphql/v1alpha1/pg_dump' --header 'x-hasura-admin-secret: <password>' --header 'Content-Type: application/json' --data-raw '{  "opts": ["-O", "-x", "--schema", "public", "--schema", "auth"],  "clean_output": true}' -o backup.sql

    //tiwaridigitalocean:LcdiB8Fkw3TA@ep-red-field-68523959.us-west-2.aws.neon.tech/neondb
    // pg_dump -Fc -v -d tiwaridigitalocean:LcdiB8Fkw3TA@ep-red-field-68523959.us-west-2.aws.neon.tech/neondb backFile
    // pg_dump -h ep-red-field-68523959.us-west-2.aws.neon.tech -U tiwaridigitalocean -d neondb -F c -f helloFile
    axios.post(
      'https://tender-cardinal-77.hasura.app/v1/graphql/v1alpha1/pg_dump',
      {
        Headers: {
          'x-hasura-admin-secret':
            'f4DPpHJ9T4wpMN2UUrwqzoBbgL9dney8qdtGR4puKHyS33IvWlgJpk8aA6ri2dKy',
          'Content-Type': 'application/json',
        },
      }
    )
  }
  console.log('data', data)
  return <div>Page</div>
}

export default Page
