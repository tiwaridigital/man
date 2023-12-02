import { fetchDataServerAction } from '@/app/_actions/fetchDataFromServer'

const { Manga, MangaType } = require('manga-lib')
const Page = async () => {
  // const data = await fetchDataServerAction('nettruyenus', 'https://asuratoon.com/manga/6849480105-the-dark-mages-return-to-enlistment/')
  // console.log("data", data)

  // Create a new instance of the manga site, MangaType.NETTRUYEN is currently support for https://www.nettruyenplus.com/
  const manga = new Manga().build(MangaType.ASURASCANS)

  // Retrieve the manga details
  const detail_manga = await manga.getDetailManga(
    'https://asuratoon.com/manga/6849480105-wandering-warrior-of-wudang/'
  )

  console.log('detail_manga', detail_manga)

  // console.log("detail", detail_manga)
  return <div>Page</div>
}

export default Page
