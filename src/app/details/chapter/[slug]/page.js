import React from 'react'

import SingleChapter from '@/components/details/singleChapter/SingleChapter'
import fetchSingleChapter from '@/utils/data/fetchSingleChapter'

const Page = async ({ params }) => {
  const chapterData = await fetchSingleChapter(params.slug)

  return (
    <div>
      <SingleChapter chapter={chapterData} />
    </div>
  )
}

export default Page
