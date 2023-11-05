import React, { Suspense } from 'react'
import DetailsBanner from '../components/details/detailsBanner/Index'
import { getData } from '../../../utils/data/getData'
import { getMangaDex } from '../../../utils/data/getMangaDex'

const Hello = async () => {
  const details = await getMangaDex()
  console.log('details', details)
  return (
    // <h1>hello</h1>
    // <div>
    <>
      <h1>Navbar</h1>
      <Suspense fallback={<p className='text-[50px]'>This is a Loader</p>}>
        <DetailsBanner data={details} meta={details} />
      </Suspense>
    </>
    // </div>
  )
}

export default Hello
