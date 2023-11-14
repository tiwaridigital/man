'use client'
import React, { useEffect, useState } from 'react'
import client from '../../../../client'
import SINGLE_CHAPTER_QUERY from '@/graphql/admin/chapters/SingleChapterQuery.gql'
import SingleChapter from '@/components/details/singleChapter/SingleChapter'

const Page = () => {
  const [chapterData, setChapterData] = useState(null)

  const fetchChapter = async () => {
    const result = await client.query({
      query: SINGLE_CHAPTER_QUERY,
      variables: {
        // url: 'b6198714-7c53-4ff7-bd5d-58f9900eaa22',
        slug: 'i-killed-an-academy-player-chapter-6',
      },
    })
    console.log('chapter', result)
    setChapterData(result.data.chapters)
  }
  // console.log('chapterData', chapterData)

  useEffect(() => {
    fetchChapter()
  }, [])

  return (
    <div>
      <SingleChapter chapter={chapterData} />
    </div>
  )
}

export default Page
