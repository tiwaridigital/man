import React from 'react'
import fetchSingleManga from '../../../../utils/data/fetchSingleManga';
import DetailsBanner from '@/components/details/detailsBanner';

const Page = async ({params}) => {
    const data = await fetchSingleManga(params.slug)
    return (
        <div>
            <h1 className='text-[30px] text-gray-50'>test page</h1>
            {/*<DetailsBannerDex />*/}
            <DetailsBanner manga={data}/>
        </div>
    )
}

export default Page
