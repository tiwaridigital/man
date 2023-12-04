'use client'
import ContentWrapper from '@/components/contentWrapper/ContentWrapper'
import { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const handleLogin = async () => {
    console.log('handleLogin called')
    if (email.length > 0 && password.length > 0) {
      const response = await fetch('http://localhost:3000/auth', {
        method: 'POST',
        body: JSON.stringify({
          action: 'login',
          email,
          password,
        }),
      })
      const result = await response.json()
      console.log('result', result)
    }
  }

  const inputElements = [
    {
      name: 'email',
      placeholder: 'Enter Email',
      type: 'text',
      onChange: (e) => setEmail(e.target.value),
    },
    {
      name: 'password',
      placeholder: 'Enter Password',
      type: 'password',
      onChange: (e) => setPassword(e.target.value),
    },
  ]

  console.log('email', email)
  return (
    <ContentWrapper>
      <div className='py-[100px] flex flex-col items-center justify-center'>
        <div className='w-[40%]'>
          <h1 className='text-white text-[30px] text-center mb-12'>
            Login Page
          </h1>
          <div className='flex flex-col gap-8 mb-4'>
            {inputElements.map((element, idx) => (
              <div key={idx} className='relative h-11 w-full min-w-[200px]'>
                <input
                  className='peer h-full w-full border-b border-white bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border-emerald-500 focus:border-emerald-500 focus:outline-0 disabled:border-0 disabled:bg-emerald-500'
                  placeholder=' '
                  onChange={element.onChange}
                />
                <label className="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-emerald-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-white peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:after:scale-x-100 peer-focus:after:border-emerald-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  {element.placeholder}
                </label>
              </div>
            ))}
          </div>
          <button
            className='bg-white p-2 rounded-lg m-auto'
            onClick={handleLogin}
          >
            Click to login{' '}
          </button>
        </div>
      </div>
    </ContentWrapper>
  )
}

export default Login
