const { Manga, MangaType } = require('manga-lib')

export const getData = async () => {
  // Create a new instance of the manga site, MangaType.NETTRUYEN is currently support for https://www.nettruyenplus.com/
  const manga = new Manga().build(MangaType.TOONILY)

  // Create a new instance with custom url
  //   const manga = new Manga().build(MangaType.TOONILY, {
  //     baseUrl: 'https://blogtruyen.vn/',
  //   })

  // Get list latest manga
  //   const latest = await manga.getListLatestUpdate()

  // Retrieve the manga details
  const detail_manga = await manga.getDetailManga(
    // 'https://toonily.com/webtoon/i-need-to-raise-my-sister-properly/'
    'https://toonily.com/webtoon/study-group/'
  )

  // get all chapter info
  // const chapters = detail_manga.chapters.map(async (chapter) => {
  //   console.log('map')
  //   const url = `https://toonily.com${chapter.path}`
  //   const data = await manga.getDataChapter(url)
  //   // console.log('data', data)
  //   // chaptersArr.push(data)
  //   return data
  // })
  // // console.log('chaptersArr', chaptersArr)
  // // console.log('chapters', chapters.length)
  // Promise.all(chapters).then((res) => console.log('detail', res))
  const chapterData = await Promise.all(
    detail_manga.chapters.slice(0, 1).map(async (chapter) => {
      const url = `https://toonily.com${chapter.path}`
      const data = await manga.getDataChapter(url)
      return data
    })
  )
  // Get data chapter
  //   const data_chapter = await manga.getDataChapter(
  //     'https://toonily.com/webtoon/nano-machine/chapter-159/'
  //   )
  //   return data_chapter
  // return chapters
  return { detail_manga, chapterData }
}
