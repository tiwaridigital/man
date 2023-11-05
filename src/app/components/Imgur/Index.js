'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
const Index = () => {
  const router = useRouter()
  const authorizeUser = () => {
    console.log('authorizeUser called')
    const clientId = '58ee55141a2f9c0'
    const clientSecret = '665252f3995b551c42672783848b599cddf308e6'
    const url = `https://api.imgur.com/oauth2/authorize?client_id=${clientId}&response_type=token&state=APPLICATION_STATE`
    router.push(url)
  }

  return (
    <div>
      Index
      <button onClick={authorizeUser}>Upload Image</button>
    </div>
  )
}

export default Index
