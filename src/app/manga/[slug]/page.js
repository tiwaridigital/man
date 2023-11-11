'use client'
import { fetchDataServerAction } from '@/app/actions/fetchDataFromServer'
import DetailsBannerDex from '@/app/components/details/detailsBannerDex/Index'
import React, { useEffect, useState } from 'react'

const Page = () => {
  // const [data, setData] = useState(null)

  // useEffect(() => {
  //   fetchManga()
  // }, [])

  // const fetchManga = async () => {
  //   const data = await fetchDataServerAction('mangadex')
  //   setData(data)
  // }

  return (
    <div>
      <DetailsBannerDex />
    </div>
  )
}

export default Page
