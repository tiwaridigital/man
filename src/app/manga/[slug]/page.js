// 'use client'
import React from 'react'
import fetchSingleManga from '../../../../utils/data/fetchSingleManga'
import DetailsBanner from '@/components/details/detailsBanner/Index'
import BreadCrumb from '@/components/breadCrumb/BreadCrumb'

const Page = async ({ params }) => {
  const manga = await fetchSingleManga(params.slug)
  return (
    <div>
      {/*<DetailsBannerDex />*/}
      <DetailsBanner manga={manga} />
    </div>
  )
}

export default Page
