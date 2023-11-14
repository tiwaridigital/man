import HeroBanner from '@/components/heroBanner/HeroBanner'
import Trending from '@/components/trending/Trending'
import fetchAllMangas from '../../utils/data/fetchAllMangas'

export default async function Home() {
  const data = await fetchAllMangas()
  console.log('data', data)
  return (
    <div>
      <HeroBanner />
      <Trending data={data} />
    </div>
  )
}
