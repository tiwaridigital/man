import { imgBBUpload } from '@/utils/imageUpload'
import axios from 'axios'

const { Manga, MangaType } = require('manga-lib')
const FormData = require('form-data')

export const fetchData = async (src, url) => {
  if (src === 'mangadex') {
    try {
      // Create a new instance of the manga site, MangaType.NETTRUYEN is currently support for https://www.nettruyenplus.com/
      const manga = new Manga().build(MangaType.MANGADEX)

      // Retrieve the manga details
      const detail_manga = await manga.getDetailManga(
        // '05bd710c-d94a-45eb-be99-2109d58f1006'
        url
      )

      // get all chapters data
      const chapterData = await Promise.all(
        detail_manga.chapters.map(async (chapter) => {
          // Introduce a delay of 1 second between each iteration
          await new Promise((resolve) => setTimeout(resolve, 3000))
          const data = await manga.getDataChapter(chapter.path)
          return data
        })
      )

      return { detail_manga, chapterData }
    } catch (err) {
      throw new Error(`An error occurred while fetching from Mangadex ${err}`)
    }
  } else if (src === 'asuratoon') {
    const manga = new Manga().build(MangaType.ASURASCANS)
    // try {
    // Retrieve the manga details
    const detail_manga = await manga.getDetailManga(
      // 'https://asuratoon.com/manga/6849480105-revenge-of-the-iron-blooded-sword-hound/'
      url
    )

    console.log('detail_manga', detail_manga)

    // get all chapters data
    const chapterData = await Promise.all(
      detail_manga.chapters.map(async (chapter) => {
        const data = await manga.getDataChapter(chapter.url)
        return data.chapter_data.filter(
          (x) =>
            x.src_origin !==
            'https://www.asurascans.com/wp-content/uploads/2021/04/page100-10.jpg'
        )
      })
    )

    console.log('chapterDate retuned now uploading')

    // Upload Images to Imgur
    for (const chapters of chapterData.slice(2, 4)) {
      // await new Promise((resolve) => setTimeout(resolve, 5000))
      console.log('inside for of loop', new Date())
      let idx = 0
      for (const chapter of chapters) {
        // await new Promise((resolve) => setTimeout(resolve, 3000))
        console.log('uploadImage called')
        let data = new FormData()
        data.append(
          'image',
          chapter.src_origin
          //   'https://uploads.mangadex.org/data/04e12b8f9dcf8a68bec3f61633bfdef0/z1-aa3688f681533e9fa53ede12bb13da0d53d87ea4c7b0232bdc21cfccf83888b5.jpg'
        )
        data.append('type', 'url')
        data.append('name', `manubook ${idx + 1}.webp`)
        data.append('title', `Manu ${idx + 1}`)
        data.append('description', `This is an macbook air m${idx + 1} image.`)

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://api.imgur.com/3/upload',
          headers: {
            Authorization: 'Bearer 80a8d3e2afa3486e87d47ed2fecdde4f7c7e4218',
          },
          data: data,
        }

        axios
          .request(config)
          .then((response) => {
            console.log('response')
            console.log(JSON.stringify(response.data))
          })
          .catch((error) => {
            console.log('error')
            console.log(error)
          })
        idx += 1
      }
    }

    // // Upload Images to imgBB
    // for (const chapters of chapterData) {
    //   console.log('inside 1st for of', new Date())
    //   for (const chapter of chapters) {
    //     console.log('uploading image')
    //     const image = await imgBBUpload(chapter.src_origin)
    //     console.log('image', image)
    //   }
    // }

    return { detail_manga, chapterData }
    // } catch (err) {
    //   throw new Error(`An error occurred while fetching from Asuratoon ${err}`)
    // }
  } else if (src === 'nettruyenus') {
    // try {
    // Create a new instance of the manga site, MangaType.NETTRUYEN is currently support for https://www.nettruyenplus.com/
    const manga = new Manga().build(MangaType.NETTRUYEN)

    // Get list latest manga
    // const latest = await manga.getListLatestUpdate();
    // Retrieve the manga details
    const detail_manga = await manga.getDetailManga(
      // '71a621f8-c2bc-496e-aa34-f4b91e9874ac'
      'https://www.nettruyenus.com/truyen-tranh/the-reincarnation-magician-of-the-inferior-eyes-215350'
    )

    console.log('detail_manga', detail_manga)

    // get all chapters data
    const chapterData = await Promise.all(
      detail_manga.chapters.slice(0, 1).map(async (chapter) => {
        const data = await manga.getDataChapter(chapter.url)
        return data
      })
    )

    return { detail_manga, chapterData }
    // } catch (err) {
    //   throw new Error(`An error occurred while fetching from Mangadex ${err}`)
    // }
  }

  // Upload Images to Imgur
  // chapterData[0].chapter_data.map((chapter, idx) => {
  //   console.log('uploadImage called')
  //   let data = new FormData()
  //   data.append(
  //     'image',
  //     chapter.src_origin
  //     //   'https://uploads.mangadex.org/data/04e12b8f9dcf8a68bec3f61633bfdef0/z1-aa3688f681533e9fa53ede12bb13da0d53d87ea4c7b0232bdc21cfccf83888b5.jpg'
  //   )
  //   data.append('type', 'url')
  //   data.append('name', `manubook ${idx + 1}.webp`)
  //   data.append('title', `Manu ${idx + 1}`)
  //   data.append('description', `This is an macbook air m${idx + 1} image.`)

  //   let config = {
  //     method: 'post',
  //     maxBodyLength: Infinity,
  //     url: 'https://api.imgur.com/3/upload',
  //     headers: {
  //       Authorization: 'Bearer 80a8d3e2afa3486e87d47ed2fecdde4f7c7e4218',
  //     },
  //     data: data,
  //   }

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       console.log('response')
  //       console.log(JSON.stringify(response.data))
  //     })
  //     .catch((error) => {
  //       console.log('error')
  //       console.log(error)
  //     })
  // })
}
