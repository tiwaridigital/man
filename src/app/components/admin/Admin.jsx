'use client'
import React, { useState } from 'react'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import Link from 'next/link'
import Select from 'react-select'
import Modal from '../modal/Modal'
const Admin = () => {
  const [open, setOpen] = useState(false)
  const options = [
    { value: 'manga', label: 'Create Single Manga' },
    { value: 'chapter', label: 'Create Chapter' },
  ]

  const mangaSources = [
    { value: 'mangadex', label: 'Mangadex' },
    { value: 'asuratoon', label: 'Asuratoon' },
    { value: 'toonily', label: 'Toonily' },
    { value: 'nettruyen', label: 'Nettruyen' },
    { value: 'blogtruyen', label: 'Blogtruyen' },
  ]

  const handleActions = (e) => {
    if (e.value === 'manga') {
      /*
       * First Fetch The Manga Using getManga Function
       */
      setOpen(true)
    }
  }

  return (
    <div className='pt-[100px] pb-[100px]'>
      <ContentWrapper>
        <div className='max-w-[300px]'>
          <Select
            options={options}
            placeholder='Select Action...'
            onChange={handleActions}
          />
        </div>
        <button
          className='text-[30px] text-gray-100'
          onClick={() => setOpen(true)}
        >
          Open Modal
        </button>

        <Modal setOpen={setOpen} open={open} options={mangaSources} />
      </ContentWrapper>
    </div>
  )
}

export default Admin
