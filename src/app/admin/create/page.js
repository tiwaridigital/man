import React from 'react'
import Admin from '@/app/components/admin/Admin';
import { fetchData } from '../../../../utils/data/fetchData';
import { SubmitButton } from '@/app/components/Form/SubmitBtn';
import InputComponent from '@/app/components/Form/InputComponent';
import { console } from 'next/dist/compiled/@edge-runtime/primitives';

const Page = async () => {
  // const data = await fetchData('mangadex')
  // console.log('data', data)
  var val = null

  async function create(formData){
    'use server'
    console.log('formdata', formData)
    // Access the value using the get method
    const manga = formData.get('source')
    const chapter = formData.get('chapter');

    // mutate data
    // revalidate cache

    if (manga === 'mangadex') {
      // const data = await fetchData('mangadex')
      // console.log('mangadex', data)
      fetchData('mangadex').then(res => {
        // console.log('res', res)
        formData.append('manga', res)
        console.log('sourceValue', formData)
      })
    }


  }

  return (
    <>
      {/*{*/}
      {/*  val && <Admin data={val}/>*/}
      {/*}*/}
      {/*<Admin data={val} />*/}
      <div className='pt-[100px]'>
        <form action={create}>
          <InputComponent name={'source'} placeholder={'Enter URL...'}/>
          <InputComponent name={'chapter'} placeholder={'Enter Chapter URL...'}/>
          <SubmitButton/>
        </form>
      </div>
    </>
  )
}

export default Page
