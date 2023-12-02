'use client'
import ContentWrapper from '@/components/contentWrapper/ContentWrapper'

const Login = () => {
  const handleLogin = () => {
    console.log('handleLogin called')
    // const result = await fetch
  }
  return (
    <ContentWrapper>
      <div className='py-[100px]'>
        <h1 className='text-white text-[30px] text-center'>Login Page</h1>
        <button
          className='bg-white p-2 rounded-lg m-auto'
          onClick={handleLogin}
        >
          Click to login{' '}
        </button>
      </div>
    </ContentWrapper>
  )
}

export default Login
