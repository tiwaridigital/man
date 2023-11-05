'use client'
import React, { useEffect, useState } from 'react'
// import Spinner from '../spinner/Spinner'

const Index = ({ data }) => {
  const [manga, setManga] = useState(null)
  useEffect(() => {
    setManga(data)
  }, [data])

  console.log('data', data)
  // if (!manga) {
  //   return <Spinner />
  // }

  return <div>Index manga {manga?.author}</div>
}

export default Index
