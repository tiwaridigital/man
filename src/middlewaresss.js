import { NextResponse } from 'next/server'

export function middleware() {
  // Log the current request path

  // retrieve the current response
  const res = NextResponse.next()

  // add the CORS headers to the response
  res.headers.set('Access-Control-Allow-Credentials', 'true')
  res.headers.set('Access-Control-Allow-Origin', '*') // replace this with your actual origin
  res.headers.set(
    'Access-Control-Allow-Methods',
    'GET, DELETE, PATCH, POST, PUT'
  )
  res.headers.set(
    'Access-Control-Allow-Headers',
    'Authorization',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // Log the modified response object
  console.log('Modified response:', res)

  return res // return the modified response object
}

// specify the path regex to apply the middleware to
export const config = {
  //   matcher: '/upload/:path*',
  matcher: '/:path*',
}
