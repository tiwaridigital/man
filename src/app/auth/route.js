import CREATE_USER_MUTATION from '@/graphql/admin/auth/CreateUserMutation.gql'
import SINGLE_USER_QUERY from '@/graphql/admin/auth/SingleUserQuery.gql'
import client from '../../../client'
import argon2 from 'argon2'
import { NextResponse } from 'next/server'
/*
 * Registration Code Using
 */
export async function POST(req, res) {
  const data = await req.json()
  const { email, password, action } = data
  if (action === 'register') {
    try {
      const hasedPassword = await argon2.hash(password)
      const result = await client.mutate({
        mutation: CREATE_USER_MUTATION,
        variables: {
          email,
          password: hasedPassword,
        },
      })

      console.log('result from db', result)

      return NextResponse.json({ result }, { status: 200 })
    } catch (err) {
      console.log('error creating user', err)
      return NextResponse.json(
        { message: 'Registration Failed', error: err },
        { status: 400 }
      )
    }
  } else if (action === 'login') {
    console.log('login called')
    /*
     * Check If User Exists in Database
     */
    const user = await handleUserRetrieval(email)
    console.log('user', user)
    return NextResponse.json({ message: 'login', data: user })
  }
}

const handleUserRetrieval = async (email) => {
  console.log('handleUserRetrieval', email)
  const result = await client.query({
    query: SINGLE_USER_QUERY,
    variables: {
      email,
    },
  })
  return result
}
