import CREATE_USER_MUTATION from '@/graphql/admin/auth/CreateUserMutation.gql';
import SINGLE_USER_QUERY from '@/graphql/admin/auth/SingleUserQuery.gql';
import client from '../../../client';
import argon2 from 'argon2';
import { NextResponse } from 'next/server';
import { deleteCookie, setTokenCookie } from '@/lib/cookies';
import { sign } from 'jsonwebtoken';
/*
 * Registration Code Using
 */
export async function POST(req, res) {
  const data = await req.json();
  const { email, password, action } = data;
  if (action === 'register') {
    try {
      const hasedPassword = await argon2.hash(password);
      const result = await client.mutate({
        mutation: CREATE_USER_MUTATION,
        variables: {
          email,
          password: hasedPassword,
        },
      });

      return NextResponse.json({ result }, { status: 200 });
    } catch (err) {
      console.error('error creating user', err);
      return NextResponse.json(
        { message: 'Registration Failed', error: err },
        { status: 400 },
      );
    }
  } else if (action === 'login') {
    /*
     * Check If User Exists in Database
     */
    const user = await handleUserRetrieval(email);
    if (user.data.users.length === 0) {
      return NextResponse.json.json(
        { message: 'User not found' },
        { status: 401 },
      );
    }

    /*
     * Verify Password using Argon2
     */
    const passwordMatch = await argon2.verify(
      user.data.users[0].password,
      password,
    );

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid Credentials' });
    }

    /*
     *  Generate a JWT token for the authenticated user
     */
    const token = sign(
      { userId: user.data.users[0].id },
      process.env.JWT_SECRET,
      { expiresIn: '365d' },
    );

    setTokenCookie(res, token);

    return NextResponse.json({
      token,
      uid: user.data.users[0].id,
    });
  } else if (action === 'signOut') {
    deleteCookie();
    return NextResponse.json({ message: 'Cookie Deleted' });
  }
}

const handleUserRetrieval = async (email) => {
  const result = await client.query({
    query: SINGLE_USER_QUERY,
    variables: {
      email,
    },
  });
  return result;
};
