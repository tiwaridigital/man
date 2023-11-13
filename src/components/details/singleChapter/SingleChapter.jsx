'use client'
import React from 'react'
import ContentWrapper from '../../contentWrapper/ContentWrapper'
import './style.scss'
import Img from '../../lazyLoadImage/Img'

const SingleChapter = ({chapter}) => {
    // console.log('chapterData', chapter)
    return (
        <div className='pt-[100px]'>
            <ContentWrapper>
                <div className='mt-12 chapter-wrapper'>
                    <h1 className='text-center text-[25px] text-gray-100'>
                        {chapter?.title}
                    </h1>
                    <div className='subtitle' style={{marginTop: 20}}>
                        Read the latest manga {chapter?.title}
                        at Asura Scans . Manga The Dark Mage’s Return to Enlistment is
                        always updated at Asura Scans . Dont forget to read the other manga
                        updates. A list of manga collections Asura Scans is in the Manga
                        List menu.
                    </div>

                    <div className='flex flex-col items-center'>
                        {/* Images */}
                        {chapter?.[0].data.map((item, idx) => {
                            return (
                                <div key={idx} className='backdrop-img w-[800px] mb-6'>
                                    <Img src={item.src_origin} alt=''/>
                                </div>
                            )
                        })}
                        {/* Images */}
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default SingleChapter
