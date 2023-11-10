'use client'
import React, { useEffect, useState } from 'react'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import Link from 'next/link'
import Select from 'react-select'
import Modal from '../modal/Modal'
import { myAction } from '@/app/actions/actions'

const Admin = () => {
  const [manga, setManga] = useState(null)
  console.log('manga', manga)

  const [open, setOpen] = useState(false)
  const [srcUrl, setSrcUrl] = useState(null)
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
    if (e.value === 'manga' || e.value === 'chapter') {
      setOpen(true)
    }
  }

  const handleSources = async (e) => {
    console.log('handleSources')
    /*
     * First Fetch The Manga Using myAction Function, which is a => Server Action
     * i.e. fucntion based on 'use server' method -> where you can call other server functions
     * and then use those not directly supported server functions/methods -> indirectly
     */
    const data = await myAction(e.value)
    setManga(data)
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
        <Modal
          setOpen={setOpen}
          open={open}
          options={mangaSources}
          onChange={handleSources}
          setSrcUrl={setSrcUrl}
        />
      </ContentWrapper>
    </div>
  )
}

export default Admin
