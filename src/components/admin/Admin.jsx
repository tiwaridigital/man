'use client'
import React, { useState } from 'react'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import Select from 'react-select'
import Modal from '../modal/Modal'
import { fetchDataServerAction } from '@/app/actions/fetchDataFromServer'
import SINGLE_MANGA_MUTATE from '../../graphql/admin/SingleMangaMutation.gql'
import SINGLE_CHAPTER_MUTATE from '@/graphql/admin/chapters/SingleChapterMutation.gql'
import COMPLETE_CHAPTER_MUTATION from '@/graphql/client/chapter_tracker/completeChapterMutation.gql'
import INCOMPLETE_CHAPTER_MUTATION from '@/graphql/client/chapter_tracker/inCompleteChapterMutation.gql'
import client from '../../../client'
import { slugify } from '../../../utils/helpers'
import gql from 'graphql-tag'

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
      'https://asuratoon.com/manga/6849480105-the-dark-mages-return-to-enlistment/'
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
        rate: rating,
        uploadedDate,
        updatedDate,
      } = data.detail_manga

      const slug = slugify(title)
      const genres = data.detail_manga.genres.map((x) => x.name)
      const dates = {
        uploadedDate: uploadedDate,
        updatedDate,
      }
      /*
       * Create Chapter in Single Manga => To get chapter details for later user => for fetching the chapters
       */
      let chapters = data.detail_manga.chapters.map((x, idx) => {
        return {
          title: x.title,
          slug: slugify(
            `${slug} chapter ${data.detail_manga.chapters.length - idx}`
          ),
          last_update: x.last_update,
        }
      })

      const mangaResult = await client.mutate({
        mutation: SINGLE_MANGA_MUTATE,
        variables: {
          title,
          alternativeName: 'alterNativeName',
          artist,
          author,
          coverImage,
          genres,
          status,
          description: 'description',
          src: e.value,
          slug,
          chapters,
          rating,
          dates,
        },
      })
      console.log('mangaResult', mangaResult)

      await createChapters(data, mangaResult)
    } catch (err) {
      throw new Error(`Error Creating Single Manga to DB: ${err}`)
    }
  }

  const createChapters = async (data, mangaResult) => {
    /*
     * Create Chapter Now => After Manga is Created
     */
    let chaptersArr = data.detail_manga.chapters.map((x, idx) => {
      return {
        title: x.title,
        url: mangaResult.data.insert_singleMang_one.id,
        chapter_data: data.chapterData[idx],
        slug: slugify(
          `${mangaResult.data.insert_singleMang_one.slug} chapter ${
            data.detail_manga.chapters.length - idx
          }`
        ),
        last_update: x.last_update,
      }
    })

    console.log('chapters', chaptersArr)

    let count = 0
    for (const x of chaptersArr) {
      const idx = chaptersArr.indexOf(x) // gets current idx
      console.log('idx', idx)
      const chapterResult = await client.mutate({
        mutation: SINGLE_CHAPTER_MUTATE,
        variables: {
          title: x.title,
          url: x.url,
          data: x.chapter_data,
          slug: x.slug,
        },
      })
      console.log('chapterResult', chapterResult)
      count++
    }

    /*
     * Chapters Completion Tracker
     * Push manga id into chapter_tracker's => complete col if all chapters are inserted
     * else push into => incomplete col
     */
    if (count === chaptersArr.length) {
      const chapterTrackerResult = await client.mutate({
        mutation: COMPLETE_CHAPTER_MUTATION,
        variables: {
          chapterId: mangaResult.data.insert_singleMang_one.id,
        },
      })
      console.log('chapterTracker Complete', chapterTrackerResult)
    } else {
      const chapterTrackerResult = await client.mutate({
        mutation: INCOMPLETE_CHAPTER_MUTATION,
        variables: {
          chapterId: mangaResult.data.insert_singleMang_one.id,
        },
      })
      console.log('chapterTracker Incomplete', chapterTrackerResult)
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
