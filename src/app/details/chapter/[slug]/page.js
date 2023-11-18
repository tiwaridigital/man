'use client'
import React, { useEffect, useState } from 'react'
import client from '../../../../../client'
import SINGLE_CHAPTER_QUERY from '@/graphql/admin/chapters/SingleChapterQuery.gql'
import SingleChapter from '@/components/details/singleChapter/SingleChapter'

const Page = ({ params }) => {
  const [chapterData, setChapterData] = useState(null)

  const fetchChapter = async () => {
    const result = await client.query({
      query: SINGLE_CHAPTER_QUERY,
      variables: {
        slug: params.slug,
      },
    })
    console.log('chapter', result)
    setChapterData(result.data.chapters[0])
  }
  // console.log('chapterData', chapterData)

  useEffect(() => {
    fetchChapter()
  }, [params])

  return (
    <div>
      <SingleChapter chapter={chapterData} />
    </div>
  )
}

export default Page
