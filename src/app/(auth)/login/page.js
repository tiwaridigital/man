import Login from '@/components/auth/Login/Login'
import { verifyCookie } from '@/lib/cookies'
import { redirect } from 'next/navigation'

const Page = async () => {
  const isUserLoggedIn = await verifyCookie()
  if (isUserLoggedIn.user.hasOwnProperty('userId')) {
    // User is logged in
    redirect('/admin')
  }
  return <Login />
}

export default Page
