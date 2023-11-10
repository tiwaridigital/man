import React from 'react'
import Admin from '@/app/components/admin/Admin'
import { fetchData } from '../../../../utils/data/fetchData'
import { SubmitButton } from '@/app/components/Form/SubmitBtn'
import InputComponent from '@/app/components/Form/InputComponent'
import Test from '@/app/components/Form/Test'

const Page = async () => {
  return (
    <>
      <div className='pt-[100px]'>
        <Admin />
      </div>
    </>
  )
}

export default Page
