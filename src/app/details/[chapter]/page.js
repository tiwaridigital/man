'use client'
import SingleChapter from '@/components/details/singleChapter/SingleChapter'
import React, { useEffect, useState } from 'react'
import client from '../../../../client'
import SINGLE_CHAPTER_QUERY from '@/app/admin/graphql/chapters/SingleChapterQuery.gql'

const Page = () => {
  const [chapterData, setChapterData] = useState(null)

  const fetchChapter = async () => {
    const result = await client.query({
      query: SINGLE_CHAPTER_QUERY,
      variables: {
        url: '0810564f-ac3f-4db8-b3d6-bf42f4e3c513',
      },
    })
    setChapterData(result.data.chapters)
  }
  console.log('chapterData', chapterData)

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
