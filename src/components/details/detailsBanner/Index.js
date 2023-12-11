'use client'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import './style.scss'
import Genres from '../../genres/Genres'
import CircleRating from '../../circleRating/CircleRating'
import Img from '../../lazyLoadImage/Img.jsx'
import PlayIcon from '../PlayIcon'
import { getReleaseDate } from '../../../utils/getReleaseDate'
import { formatDate, tagsMaker } from '../../../utils/helpers'
import Select from 'react-select'
import dynamic from 'next/dynamic'
import BannerSkelton from '@/components/details/detailsBannerDex/BannerSkelton'
import Link from 'next/link'
import ContentWrapper from '../../contentWrapper/ContentWrapper'
import BreadCrumb from '@/components/breadCrumb/BreadCrumb'
import Bookmark from '../../../../public/assets/icons/Bookmark'
import ChaptersList from '../ChaptersList'
import Image from 'next/image'
// const ContentWrapper = dynamic(() =>
//   import('@/components/contentWrapper/ContentWrapper')
// )

const DetailsBanner = ({ manga }) => {
  // const [data, setData] = useState(null)
  // const [manga, setManga] = useState(null)
  const [chapters, setChapters] = useState(null)

  // console.log('data', data)

  // const fetchManga = async () => {
  //     const data = await fetchDataServerAction(
  //         'asuratoon',
  //         'https://asuratoon.com/manga/6849480105-surviving-the-game-as-a-barbarian/'
  //     )
  //     // setManga(data)
  // }

  // useEffect(() => {
  //     if (manga) {
  //         setChapters(manga?.chapters)
  //     }
  //     if (manga) {
  //         getReleaseDate(manga?.uploadedDate)
  //     }
  // }, [manga])

  console.log('manga', manga)

  const selectOptions = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ]

  const sortOrder = (e) => {
    console.log('sortOrder called', e)

    const extractNumber = (title) => parseInt(title.match(/\d+/)?.[0] || 0, 10)

    const compare = (a, b) =>
      e.value === 'desc'
        ? extractNumber(b.title) - extractNumber(a.title)
        : extractNumber(a.title) - extractNumber(b.title)

    const arr = manga.chapters.sort(compare)
    setChapters([...arr])
  }

  const downloadImage = () => {
    console.log('download image')
    // Replace 'image_url' with the actual URL of the image you want to download.
    const image_url =
      'https://cdn.toonily.com/chapters/manga_601d7ee072504/0bc51bcbe6d2b758ae9f5ab5ba298da5/Who%20Made%20Me%20a%20Princess_00.jpg'

    // Create a temporary anchor element.
    const anchor = document.createElement('a')
    anchor.href = image_url
    anchor.download = 'downloaded_image.jpg' // Specify the desired filename.

    // Trigger a click event on the anchor to start the download.
    anchor.click()

    // Cleanup: remove the anchor element.
    document.body.removeChild(anchor)
  }

  //   const { mediaType, id } = useParams()
  //   const { data, loading } = useFetch(`/${mediaType}/${id}`)
  //   const { url } = useSelector((state) => state.home)
  //   const [show, setShow] = useState(false)
  //   const [videoId, setVideoId] = useState(null)

  //   console.log('show', show, videoId)
  const crew = []

  //   const genres = data?.genres.map((genre) => genre.id)

  const directors = crew?.filter((c) => c.job === 'Director')
  const writers = crew?.filter(
    (w) => w.job === 'Screenplay' || w.job === 'Writer' || w.job === 'Story'
  )

  // const formDate = () => {
  //   const originalDate = '2018-12-23T01:55:29+00:00'
  //   const date = new Date(originalDate)

  //   const options = { day: '2-digit', month: 'short', year: 'numeric' }
  //   const formattedDate = date.toLocaleDateString('en-US', options)

  //   console.log('formatted date', formattedDate)
  // }

  return (
    <>
      {manga ? (
        <div className='detailsBanner'>
          <div className='backdrop-img'>
            <Image
              src={
                'https://image.tmdb.org/t/p/original/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg'
              }
              // className='lazy-load-image-background'
              // sizes='100vw'
              fill
              alt=''
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </div>
          <div className='opacity-layer' />
          <ContentWrapper>
            <BreadCrumb title={manga?.title} />
            <div className='content'>
              <div
                className='left'
                itemProp='image'
                itemScope
                itemType='https://schema.org/ImageObject'
              >
                {manga.poster_path ? (
                  <Img className='posterImg' src={manga.coverImage} />
                ) : (
                  <Image
                    className='posterImg'
                    src={manga.coverImage}
                    width={150}
                    height={300}
                    alt=''
                    // sizes='(max-width: 768px) 100vw, (min-width: 640px) 100vw'
                    priority={true}
                    itemProp='image'
                  />
                )}
              </div>
              <div className='right'>
                <div className='title'>
                  {`${manga.title || manga.original_title} (${dayjs(
                    manga.release_date
                  ).format('YYYY')})`}
                </div>

                <div
                  className='subtitle'
                  style={{ fontSize: 16, marginTop: 20 }}
                >
                  {/* if src is toonily then replace text  */}
                  {manga?.alternativeName
                    ? manga?.alternativeName
                    : manga?.title}
                </div>
                <Genres data={manga.genres} />
                {/* <div className='row bg-[#0d285193] p-2 rounded-lg'> */}
                <div className='row p-2 rounded-lg'>
                  <CircleRating rating={manga.rating} />
                  <div className='playbtn'>
                    <Bookmark width={80} height={80} />
                    <div className='span ml-[-10px]'>Bookmark</div>
                  </div>
                </div>
                <div className='overview'>
                  <div className='heading' style={{ marginBottom: 20 }}>
                    Synopsis:{' '}
                    <span style={{ opacity: 0.7 }}>{manga.title}</span>
                  </div>
                  <div className='description'>{manga.description}</div>
                </div>

                <div className='info'>
                  {manga.status && (
                    <div className='infoItem'>
                      <span className='text bold'>Status: </span>
                      <span className='text'>{manga.status}</span>
                    </div>
                  )}

                  <div className='infoItem'>
                    <span className='text bold'>Released By: </span>
                    <span className='text'>asuratoons.com</span>
                  </div>
                </div>

                <div className='info'>
                  {manga?.dates?.uploadedDate && (
                    <div className='infoItem'>
                      <span className='text bold'>Uploaded Date: </span>
                      <span className='text'>{manga?.dates?.uploadedDate}</span>
                    </div>
                  )}

                  {manga?.dates?.updatedDate && (
                    <div className='infoItem'>
                      <span className='text bold'>Updated Date: </span>
                      <span className='text'>{manga?.dates?.updatedDate}</span>
                    </div>
                  )}
                </div>

                <div className='info'>
                  {manga?.author && (
                    <div className='infoItem'>
                      <span className='text bold'>Author: </span>
                      <div className='text'>{manga?.author}</div>
                    </div>
                  )}

                  <div className='infoItem'>
                    <span className='text bold'>Artist: </span>
                    <span className='text'>{manga?.artist}</span>
                  </div>
                </div>

                {/* Creator in case of Tv Series */}
                {manga?.created_by?.length > 0 && (
                  <div className='info'>
                    <span className='text bold'>Creator: </span>
                    <div className='text'>
                      {data?.created_by?.map((creator, idx) => {
                        return (
                          <>
                            <span key={creator.id}>{creator.name}</span>
                            {
                              //checking to add comma only till 2nd last index
                              data?.created_by?.length - 1 !== idx && ', '
                            }
                          </>
                        )
                      })}
                    </div>
                  </div>
                )}
                {/* Chapters Section */}
                <div className='mt-8'>
                  <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-[28px]'>Chapters</h1>
                    <div className='filter'>
                      <Select
                        name='sortby'
                        options={selectOptions}
                        placeholder='Sort by'
                        className='react-select-container sortbyDD'
                        classNamePrefix='react-select'
                        instanceId={manga?.id}
                        onChange={sortOrder}
                        defaultValue={selectOptions[1]}
                        styles={{
                          option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isSelected
                              ? '#06396A'
                              : 'white', // Set the background color for selected and non-selected options
                            color: state.isSelected ? 'white' : 'black', // Set the text color
                            cursor: 'pointer',
                          }),
                        }}
                      />
                    </div>
                  </div>
                  {/* <div
                    className='max-h-[350px] overflow-y-auto chapters-wrapper'
                    id='style-6'
                  > */}
                  <ChaptersList chapters={manga?.chapters} />
                  {/* </div> */}
                </div>
                {/* Chapters Section */}
              </div>
            </div>
            {tagsMaker(manga?.title)}
          </ContentWrapper>
        </div>
      ) : (
        <BannerSkelton />
      )}
    </>
  )
}

export default DetailsBanner
