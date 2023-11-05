'use client'
import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'

import './style.scss'

import ContentWrapper from '../../contentWrapper/ContentWrapper'
import Genres from '../../genres/Genres'
import CircleRating from '../../circleRating/CircleRating'
import Img from '../../lazyLoadImage/Img.jsx'
import PosterFallback from '../../../../assets/no-poster.png'
import PlayIcon from '../PlayIcon'
import { getReleaseDate } from '../../../../../utils/getReleaseDate'
import { imageUpload } from '../../../../../utils/imageUpload'
import Spinner from '../../spinner/Spinner'
import { formatDate } from '../../../../../utils/helpers'
import Select from 'react-select'

const DetailsBannerDex = ({ data, meta }) => {
  const [manga, setManga] = useState(null)
  console.log('data', data)

  useEffect(() => {
    setManga(data.detail_manga)
    if (data) {
      getReleaseDate(data?.uploadedDate)
    }
  }, [data])

  const selectOptions = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ]

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

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`
  }

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
            {/* <Img src={url.backdrop + manga.backdrop_path} /> */}
            <Img
              src={
                'https://image.tmdb.org/t/p/original/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg'
              }
            />
          </div>
          <div className='opacity-layer' />
          <ContentWrapper>
            <div className='content'>
              <div className='left'>
                {manga.poster_path ? (
                  <Img className='posterImg' src={manga.coverImage} />
                ) : (
                  <Img className='posterImg' src={manga.coverImage} />

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
                  {`${manga.title || manga.original_title} (${dayjs(
                    manga.release_date
                  ).format('YYYY')})`}
                </div>

                <div
                  className='subtitle'
                  style={{ fontSize: 16, marginTop: 20 }}
                >
                  {/* if src is toonily then replace text  */}
                  {manga?.alterNativeName}
                </div>
                <Genres data={manga.genres} />
                <div className='row'>
                  <CircleRating rating={data?.rate} />
                  <div
                    className='playbtn'
                    onClick={() => {
                      setShow(true)
                      setVideoId(video.key)
                    }}
                  >
                    <PlayIcon />
                    <div className='span'>Watch Trailer</div>
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
                  {manga.uploadedDate && (
                    <div className='infoItem'>
                      <span className='text bold'>Uploaded Date: </span>
                      <span className='text'>
                        {formatDate(manga.uploadedDate)}
                      </span>
                    </div>
                  )}

                  {manga.uploadedDate && (
                    <div className='infoItem'>
                      <span className='text bold'>Updated Date: </span>
                      <span className='text'>
                        {getReleaseDate(manga.uploadedDate)}
                      </span>
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
                    <span className='text'>{data?.artist}</span>
                  </div>
                </div>

                {/* Creator in case of Tv Series */}
                {data?.created_by?.length > 0 && (
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
                  <h1 className='text-[28px] mb-4'>Chapters</h1>
                  <div className='filter mb-12'>
                    <Select
                      className='basic-single'
                      classNamePrefix='select'
                      defaultValue={selectOptions[1]}
                      name='color'
                      options={selectOptions}
                    />
                  </div>
                  <div
                    className='max-h-[350px] overflow-y-auto chapters-wrapper'
                    id='style-6'
                  >
                    <ul className=''>
                      {manga.chapters.slice(0, 15).map((x, idx) => {
                        return (
                          <li
                            key={idx}
                            className='bg-[#173D77] mb-4 p-3 cursor-pointer border-[1px] border-gray-500 mr-2 rounded-md hover:shadow-lg'
                          >
                            Chapter {idx + 1}
                          </li>
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
      ) : null}
    </>
  )
}

export default DetailsBannerDex
