'use client'
import Login from '@/components/auth/Login/Login'

const Page = () => {
  const getRes = async () => {
    const response = await fetch('http://localhost:3000/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'login',
        name: 'sahil',
      }),
    })
    const result = await response.json()
    console.log('result from api', result)
  }
  getRes()
  //   const POST = async () => {}
  return <Login />
}

export default Page
