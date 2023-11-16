import HeroBanner from '@/components/heroBanner/HeroBanner'
import Trending from '@/components/trending/Trending'
import fetchAllMangas from '../../utils/data/fetchAllMangas'
import { unstable_noStore as noStore } from 'next/cache';
export default async function Home() {
    noStore()
  const data = await fetchAllMangas()
  return (
    <div>
      <HeroBanner />
      <Trending data={data} />
    </div>
  )
}
