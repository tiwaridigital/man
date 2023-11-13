import React from 'react'
import fetchSingleManga from '../../../../utils/data/fetchSingleManga';
import DetailsBanner from '@/components/details/detailsBanner';

const Page = async () => {
    const data = await fetchSingleManga('academys-genius-swordmaster')
    console.log('data', data)
    return (
        <div>
            <h1 className='text-[30px] text-gray-50'>test page</h1>
            {/*<DetailsBannerDex />*/}
            <DetailsBanner manga={data}/>
        </div>
    )
}

export default Page
