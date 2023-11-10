import React from 'react'
import Admin from '@/app/components/admin/Admin';
import { fetchData } from '../../../../utils/data/fetchData';

const Page = async () => {
  const data = await fetchData('mangadex')
  console.log('data', data)
  return (
    <>
      <Admin data={data}/>
    </>
  )
}

export default Page
