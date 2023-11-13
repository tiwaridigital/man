'use client'
import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'

import './style.scss'

// import ContentWrapper from '../../contentWrapper/ContentWrapper'
const ContentWrapper = dynamic(() =>
  import('@/components/contentWrapper/ContentWrapper')
)
import Genres from '../../genres/Genres'
import CircleRating from '../../circleRating/CircleRating'
import Img from '../../lazyLoadImage/Img.jsx'
import PosterFallback from '../../../assets/no-poster.png'
import PlayIcon from '../PlayIcon'
import { getReleaseDate } from '../../../../utils/getReleaseDate'
import { imageUpload } from '../../../../utils/imageUpload'
import Spinner from '../../spinner/Spinner'
import { formatDate } from '../../../../utils/helpers'
import Select from 'react-select'
import Date from '../../../../public/assets/icons/Date'
import Link from 'next/link'
import Header from '../../header/Header'
import dynamic from 'next/dynamic'
import { fetchDataServerAction } from '@/app/actions/fetchDataFromServer'
import BannerSkelton from './BannerSkelton'

const DetailsBannerDex = () => {
  // const [data, setData] = useState(null)
  const [manga, setManga] = useState(null)
  const [chapters, setChapters] = useState(null)
  // console.log('data', data)

  useEffect(() => {
    fetchManga()
  }, [])

  const fetchManga = async () => {
    const data = await fetchDataServerAction('asuratoon', 'https://asuratoon.com/manga/6849480105-surviving-the-game-as-a-barbarian/')
    setManga(data)
  }

  useEffect(() => {
    if (manga) {
      setChapters(manga.detail_manga.chapters)
    }
    if (manga) {
      getReleaseDate(manga?.uploadedDate)
    }
  }, [manga])

  console.log('chapters', manga)

  const selectOptions = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ]

  const sortOrder = (e) => {
    console.log('sortOrder called', e)

    if (e.value === 'desc') {
      const arr = chapters.sort((a, b) => b.chapter - a.chapter)
      console.log('desc', arr)
      setChapters([...arr])
      // setChapters([...chapters.sort((a, b) => a - b)])
    } else {
      const arr = chapters.sort((a, b) => a.chapter - b.chapter)
      setChapters([...arr])
      console.log('asc', arr)
    }
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
            <Img
              src={
                'https://image.tmdb.org/t/p/original/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg'
              }
            />
          </div>
          <div className='opacity-layer'/>
          <ContentWrapper>
            <div className='content'>
              <div className='left'>
                {manga.detail_manga.poster_path ? (
                  <Img
                    className='posterImg'
                    src={manga.detail_manga.coverImage}
                  />
                ) : (
                  <Img
                    className='posterImg'
                    src={manga.detail_manga.coverImage}
                  />

                  // <Img
                  //   className='posterImg'
                  //   src={
                  //     'https://toonily.com/wp-content/uploads/2023/10/The-Duke-and-The-Fox-Princess-537x768.webp'
                  //   }
                  // />
                )}
              </div>
              <div className='right'>
                <div className='title'>
                  {`${
                    manga.detail_manga.title ||
                    manga.detail_manga.original_title
                  } (${dayjs(manga.detail_manga.release_date).format('YYYY')})`}
                </div>

                <div
                  className='subtitle'
                  style={{ fontSize: 16, marginTop: 20 }}
                >
                  {/* if src is toonily then replace text  */}
                  {manga?.alterNativeName}
                </div>
                <Genres data={manga.detail_manga.genres}/>
                <div className='row'>
                  <CircleRating rating={manga?.rate}/>
                  <div
                    className='playbtn'
                    onClick={() => {
                      setShow(true)
                      setVideoId(video.key)
                    }}
                  >
                    <PlayIcon/>
                    <div className='span'>Watch Trailer</div>
                  </div>
                </div>

                <div className='overview'>
                  <div className='heading' style={{ marginBottom: 20 }}>
                    Synopsis:{' '}
                    <span style={{ opacity: 0.7 }}>
                      {manga.detail_manga.title}
                    </span>
                  </div>
                  <div className='description'>
                    {manga.detail_manga.description}
                  </div>
                </div>

                <div className='info'>
                  {manga.detail_manga.status && (
                    <div className='infoItem'>
                      <span className='text bold'>Status: </span>
                      <span className='text'>{manga.detail_manga.status}</span>
                    </div>
                  )}

                  <div className='infoItem'>
                    <span className='text bold'>Released By: </span>
                    <span className='text'>asuratoons.com</span>
                  </div>
                </div>

                <div className='info'>
                  {manga.detail_manga.uploadedDate && (
                    <div className='infoItem'>
                      <span className='text bold'>Uploaded Date: </span>
                      <span className='text'>
                        {formatDate(manga.detail_manga.uploadedDate)}
                      </span>
                    </div>
                  )}

                  {manga.detail_manga.uploadedDate && (
                    <div className='infoItem'>
                      <span className='text bold'>Updated Date: </span>
                      <span className='text'>
                        {getReleaseDate(manga.detail_manga.uploadedDate)}
                      </span>
                    </div>
                  )}
                </div>

                <div className='info'>
                  {manga?.detail_manga.author && (
                    <div className='infoItem'>
                      <span className='text bold'>Author: </span>
                      <div className='text'>{manga?.detail_manga.author}</div>
                    </div>
                  )}

                  <div className='infoItem'>
                    <span className='text bold'>Artist: </span>
                    <span className='text'>{manga?.detail_manga.artist}</span>
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
                        onChange={sortOrder}
                      />
                    </div>
                  </div>
                  <div
                    className='max-h-[350px] overflow-y-auto chapters-wrapper'
                    id='style-6'
                  >
                    <ul className=''>
                      {chapters?.slice(0, 10).map((x, idx) => {
                        return (
                          <Link
                            key={idx}
                            href={`/details/chapter-${x.chapter}/`}
                            target='_blank'
                          >
                            <li
                              className='bg-[#173D77] mb-4 p-2 cursor-pointer border-[1px] border-gray-500 mr-2 rounded-md hover:shadow-lg'>
                              <p className='mb-[5px] text-[14px]'>
                                Chapter {x.chapter}
                              </p>
                              <span className='text-[12px] opacity-70'>
                                {formatDate(x.uploadedDate)}
                              </span>
                            </li>
                          </Link>
                        )
                      })}
                    </ul>
                  </div>
                </div>
                {/* Chapters Section */}
              </div>
            </div>
            {/* <VideoPopup
             show={show}
             setShow={setShow}
             videoId={videoId}
             setVideoId={setVideoId}
             /> */}
          </ContentWrapper>
        </div>
      ) : (
        <BannerSkelton/>
      )}
    </>
  )
}

export default DetailsBannerDex
