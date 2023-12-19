import Explore from '@/components/explore/Explore'
import fetchAllMangas from '@/utils/data/fetchAllMangas'
import { unstable_cache as noStore } from 'next/cache'
import React from 'react'
const Page = async () => {
  noStore()
  const data = await fetchAllMangas()
  return (
    <>
      <Explore manga={data} />
    </>
  )
}

export default Page
