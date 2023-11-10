'use client'
import { myAction } from '@/app/actions/actions'
import React from 'react'
const Test = () => {
  const handleClik = async (e) => {
    const d = await myAction(e.target.name)
    console.log('d called', d)
  }
  return (
    <div>
      Test
      <button
        name='mangadex'
        className='text-[30px] text-gray-50'
        onClick={handleClik}
      >
        Mangadex
      </button>
      <button
        name='asuratoon'
        className='text-[30px] text-gray-50'
        onClick={handleClik}
      >
        Asuratoon
      </button>
    </div>
  )
}

export default Test
