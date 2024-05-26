import React from 'react'

const SignOut = () => {
  const handleSignOut = async () => {
    const response = await fetch('http://localhost:3000/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'signOut',
      }),
    })

    const result = await response.json()
    localStorage.removeItem('token')
  }
  return (
    <button
      onClick={handleSignOut}
      className='text-white px-12 py-3 rounded-md m-auto bg-orange-500'
    >
      Sign Out
    </button>
  )
}

export default SignOut
