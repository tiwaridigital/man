'use client'
import React, { useEffect, useState } from 'react'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import Link from 'next/link'
import Select from 'react-select'
import Modal from '../modal/Modal'
import { fetchDataServerAction } from '@/app/actions/fetchDataFromServer'
import SINGLE_MANGA_MUTATE from '../../admin/graphql/SingleMangaMutation.gql'
import client from '../../../../client'

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

  const handleDataFetching_Insertion = async (e) => {
    console.log('handleSources')
    /*
     * First Fetch The Manga Using fetchDataServerAction Function, which is a => Server Action
     * i.e. fucntion based on 'use server' method -> where you can call other server functions
     * and then use those not directly supported server functions/methods -> indirectly
     */
    const data = await fetchDataServerAction(e.value)
    setManga(data)

    /*
     * Now Mutate this single manga data to hasura
     */
    try {
      const {
        title,
        alterNativeName,
        artist,
        author,
        coverImage,
        status,
        description,
      } = data.detail_manga

      const genres = data.detail_manga.genres.map((x) => x.name)
      console.log('genres', genres)
      const chapters = data.detail_manga.chapters.map((x) => {
        return {
          chapter: x.chapter,
          title: x.title,
          uploadedDate: x.uploadedDate,
          url: '',
        }
      })
      console.log('chapters', chapters)
      const result = await client.mutate({
        mutation: SINGLE_MANGA_MUTATE,
        variables: {
          title,
          alternativeName: alterNativeName,
          artist,
          author,
          coverImage,
          genres,
          chapters,
          status,
          description,
          src: e.value,
        },
      })
      console.log('result', result)
    } catch (err) {
      throw new Error(`Error Creating Single Manga to DB: ${err}`)
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
        <Modal
          setOpen={setOpen}
          open={open}
          options={mangaSources}
          onChange={handleDataFetching_Insertion}
          setSrcUrl={setSrcUrl}
        />
      </ContentWrapper>
    </div>
  )
}

export default Admin
