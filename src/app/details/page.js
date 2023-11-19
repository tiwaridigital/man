import React, { Suspense } from 'react'
import DetailsBannerDex from '@/components/details/detailsBannerDex/Index'
import { getMangaDex } from '../../utils/admin/data/getMangaDex'

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
