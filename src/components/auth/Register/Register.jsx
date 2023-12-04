'use client'
import ContentWrapper from '@/components/contentWrapper/ContentWrapper'
import React, { useState } from 'react'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegistration = async () => {
    console.log('handleRegistration')
    if (email.length > 0 && password.length > 0) {
      console.log('go ahead')
      const response = await fetch('http://localhost:3000/auth', {
        method: 'POST',
        body: JSON.stringify({
          action: 'register',
          email,
          password,
        }),
      })

      const result = await response.json()
      console.log('result', result)
    }
  }
  return (
    <ContentWrapper>
      <div className='py-[100px] flex flex-col items-center justify-center'>
        <div className='w-[40%] flex flex-col'>
          <h1 className='text-[30px] text-white'>Register</h1>
          <input
            type='text'
            name='email'
            placeholder='Enter Email'
            className='p-2 rounded-lg mb-6 mt-8'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='text'
            name='password'
            placeholder='Enter Password'
            className='p-2 rounded-lg'
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className='bg-teal-500 p-3 rounded-lg mt-8'
            onClick={handleRegistration}
          >
            Register
          </button>
        </div>
      </div>
    </ContentWrapper>
  )
}

export default Register
