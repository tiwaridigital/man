'use client'
import React, { useEffect, useState } from 'react'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import Link from 'next/link'
import Select from 'react-select'
import Modal from '../modal/Modal'
import { fetchDataServerAction } from '@/app/actions/fetchDataFromServer'
import SINGLE_MANGA_MUTATE from '../../app/admin/graphql/SingleMangaMutation.gql'
import SINGLE_CHAPTER_MUTATE from '../../app/admin/graphql/chapters/SingleChapterMutation.gql'
import client from '../../../client'
import { slugify } from '../../../utils/helpers'

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
     * i.e. function based on 'use server' method -> where you can call other server functions
     * and then use those not directly supported server functions/methods -> indirectly
     */
    const data = await fetchDataServerAction(
      e.value,
      'https://asuratoon.com/manga/6849480105-i-killed-an-academy-player/'
    )
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
        genres,
        // chapters,
      } = data.detail_manga

      const slug = slugify(title)

      // const genres = data.detail_manga.genres.map((x) => x.name)

      // console.log('chapters', chapters)
      const result = await client.mutate({
        mutation: SINGLE_MANGA_MUTATE,
        variables: {
          title,
          alternativeName: 'alterNativeName',
          artist,
          author,
          coverImage,
          genres,
          chapters: 'chapters',
          status,
          description: 'description',
          src: e.value,
          slug
        },
      })
      console.log('result', result)

      /*
       * Create Chapter Now => After Manga is Created
       */
      const chapters = data.detail_manga.chapters.map((x, idx) => {
        return {
          title: x.title,
          url: result.data.insert_singleMang_one.id,
          chapter_data: data.chapterData[idx],
          slug: slugify(`${result.data.insert_singleMang_one.slug} chapter ${data.detail_manga.chapters.length - idx}`)
        }
      })

      console.log('chapters', chapters)

      chapters.forEach(async (x, idx) => {
        const chapterResult = await client.mutate({
          mutation: SINGLE_CHAPTER_MUTATE,
          variables: {
            title: x.title,
            url: x.url,
            data: x.chapter_data,
            slug: x.slug
          },
        })
        console.log('chapterResult', chapterResult)
      })
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
