import React from 'react'
import { getData } from '../../../utils/data/getData'

const Page = async () => {
  const data = await getData()
  console.log('hello')
  console.log('data', data)
  return <div>Page</div>
}

export default Page
