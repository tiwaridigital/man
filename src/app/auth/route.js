import CREATE_USER_MUTATION from '@/graphql/admin/auth/CreateUserMutation.gql'
import client from '../../../client'
import argon2 from 'argon2'
import { NextResponse } from 'next/server'
/*
 * Registration Code Using
 */
export async function POST(req, res) {
  const data = await req.json()
  const { email, password } = data
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
    return NextResponse.json({ error: err }, { status: 400 })
  }
}
