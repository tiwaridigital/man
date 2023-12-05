import { verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
export async function setTokenCookie(data, token) {
  const cookieOptions = {
    httpOnly: true, // The cookie cannot be accessed via JavaScript
    secure: true, //process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'strict', // Enforce same-site attribute
    maxAge: 365 * 24 * 60 * 60, // Token expiration time in seconds (365 days)
    path: '/', // Cookie path (adjust as needed)
  }
  const cookieName = 'authToken'
  const cookieValue = token
  cookies().set(cookieName, cookieValue, cookieOptions)
}

export const verifyCookie = async () => {
  console.log('verifyCookie called')
  // Parse the authToken from cookies
  const authToken = cookies().get('authToken')
  console.log('authToken', authToken)
  // Validate the JWT AuthToken
  const user = await verifyToken(authToken?.value)
  console.log('user', user)
  /*
   * Check if the user is => Authenticated or Not
   */
  if (user) {
    /*
     * If User is Authenticated -> Then return user
     */
    return { user }
  } else {
    console.log('no user')
    /*
     * If User is not Authenticated -> Then Redirect to Login Page
     */
    return { user: {} }
  }
}

export const deleteCookie = async () => {
  cookies().delete('authToken')
}

const verifyToken = async (authToken) => {
  // Validate the AuthToken
  let user = null
  if (authToken) {
    try {
      user = verify(authToken, process.env.JWT_SECRET)
      return user
    } catch (error) {
      // Token is invalid or has expired
      console.error('Error validating token:', error)
    }
  }
}
