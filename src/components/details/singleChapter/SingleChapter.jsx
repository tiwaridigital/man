'use client'
import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../contentWrapper/ContentWrapper'
import './style.scss'
import Img from '../../lazyLoadImage/Img'
import BreadCrumb from '@/components/breadCrumb/BreadCrumb'
import Image from 'next/image'

const SingleChapter = ({ chapter }) => {
  const [imgHeight, setImgHeight] = useState([])
  const [imgWidth, setImgWidth] = useState([])
  const mangaTitle = chapter?.singleMang?.title

  const handleimgAspectRatio = (e, idx) => {
    console.log('idx', idx, e.currentTarget.naturalHeight)
    setImgHeight((prevImgHeights) => [
      ...prevImgHeights,
      { idx: idx, height: e.currentTarget.naturalHeight },
    ])
    setImgWidth((prevImgWidths) => [
      ...prevImgWidths,
      { idx: idx, width: e.currentTarget.naturalWidth },
    ])
  }

  console.log('imgHeight', imgHeight)

  useEffect(() => {
    // Your logic to set image height and width after loading
    // console.log('imgHeight', imgHeight)
    // console.log('imgWidth', imgWidth)
  }, [imgHeight, imgWidth])

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
            at Asura Scans . Manga <strong>{mangaTitle}</strong> always updated
            at Asura Scans . Dont forget to read the other manga updates. A list
            of manga collections Asura Scans is in the Manga List menu.
          </div>

          <div className='relative flex flex-col items-center'>
            {/* Images */}
            {chapter?.data.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className='backdrop-img md:w-[800px] mb-6'
                  // style={{
                  //   width: imgWidth[idx]?.width || 800,
                  //   height: imgHeight[idx]?.height || 500,
                  // }}
                >
                  {/* <Img src={item.src_origin} alt='' /> */}
                  <Image
                    src={item.src_origin}
                    alt=''
                    // fill
                    width={imgWidth[idx]?.width || 800}
                    height={imgHeight[idx]?.height || 500}
                    // width='0'
                    // height='0'
                    // sizes='80vw'
                    style={{ width: '100%', height: 'auto' }}
                    priority={idx === 0 ? true : false}
                    onLoad={(e) => handleimgAspectRatio(e, idx)}
                    // style={{
                    //   maxWidth: '100%',
                    //   width: '100%',
                    //   height: 'auto',
                    // }}
                  />
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
