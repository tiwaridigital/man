'use client'
import React, { useState } from 'react'
import ContentWrapper from '../../contentWrapper/ContentWrapper'
import './style.scss'
import Img from '../../lazyLoadImage/Img'
import BreadCrumb from '@/components/breadCrumb/BreadCrumb'

const SingleChapter = ({ chapter }) => {
  const mangaTitle = chapter?.singleMang?.title
  return (
    <div className='pt-[100px]'>
      <ContentWrapper>
        <BreadCrumb
          title={chapter?.singleMang?.title}
          chapterTitle={chapter?.title}
          type={'chapter'}
        />
        <div className='mt-8 chapter-wrapper'>
          <h1 className='text-center text-[20px] font-semibold text-gray-100'>
            {mangaTitle} - {chapter?.title}
          </h1>
          <div className='subtitle' style={{ marginTop: 20 }}>
            Read the latest manga{' '}
            <strong>
              {mangaTitle} - {chapter?.title}
            </strong>{' '}
            at Asura Scans . Manga <strong>{mangaTitle}</strong>
            always updated at Asura Scans . Dont forget to read the other manga
            updates. A list of manga collections Asura Scans is in the Manga
            List menu.
          </div>

          <div className='flex flex-col items-center'>
            {/* Images */}
            {chapter?.data.map((item, idx) => {
              return (
                <div key={idx} className='backdrop-img w-[800px] mb-6'>
                  <Img src={item.src_origin} alt='' />
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
