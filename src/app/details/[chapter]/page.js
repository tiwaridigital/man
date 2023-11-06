import SingleChapter from '@/app/components/details/singleChapter/SingleChapter'
import React from 'react'
const { Manga, MangaType } = require('manga-lib')

const Page = async () => {
  const getChapter = async () => {
    // Create a new instance of the manga site, MangaType.NETTRUYEN is currently support for https://www.nettruyenplus.com/
    const manga = new Manga().build(MangaType.MANGADEX)
    // get all chapters data
    const data = await manga.getDataChapter(
      '/f0f81be0-0941-4fde-a229-79a09b968fe3'
    )
    return data
  }

  const chapterData = await getChapter()
  //   console.log('chapterData', chapterData)
  return (
    <div>
      <SingleChapter chapter={chapterData} />
    </div>
  )
}

export default Page
