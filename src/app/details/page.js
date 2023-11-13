import React, { Suspense } from 'react'
import DetailsBannerDex from '@/components/details/detailsBannerDex/Index'
import { getData } from '../../../utils/data/getData'
import { getMangaDex } from '../../../utils/data/getMangaDex'
import BannerSkelton from '@/components/details/detailsBannerDex/BannerSkelton'

const Details = async () => {
  const details = await getMangaDex()
  // console.log('details', details)
  return (
    // <h1>hello</h1>
    // <div>
    <Suspense
      fallback={<p className='text-[55px]'>this is loading Screenplay</p>}
    >
      <DetailsBannerDex data={details} meta={details} />
    </Suspense>
    // </div>
  )
}

export default Details
