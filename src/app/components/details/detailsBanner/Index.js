// import React, { useState } from 'react'
'use client'
import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { useSelector } from 'react-redux'
import dayjs from 'dayjs'

import './style.scss'

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
// import useFetch from '../../../hooks/useFetch'
import Genres from '../../../components/genres/Genres'
import CircleRating from '../../../components/circleRating/CircleRating'
import Img from '../../../components/lazyLoadImage/Img.jsx'
import PosterFallback from '../../../../assets/no-poster.png'
import PlayIcon from '../PlayIcon'
import { getReleaseDate } from '../../../../../utils/getReleaseDate'
import { imageUpload } from '../../../../../utils/imageUpload'
// import VideoPopup from '../../../components/videoPopUp/VideoPopUp'

const DetailsBanner = ({ data, meta }) => {
  const [manga, setManga] = useState(null)
  console.log('data', meta)

  useEffect(() => {
    setManga(data)
    if (data) {
      getReleaseDate(data?.uploadedDate)
    }
  }, [data])

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

  return (
    <div className='detailsBanner'>
      {manga ? (
        <>
          <div className='backdrop-img'>
            {/* <Img src={url.backdrop + data.backdrop_path} /> */}
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
                {data.poster_path ? (
                  <Img
                    className='posterImg'
                    // src={url.backdrop + data.poster_path}
                    src={
                      'https://toonily.com/wp-content/uploads/2023/10/The-Duke-and-The-Fox-Princess-537x768.webp'
                    }
                  />
                ) : (
                  //   <Img className='posterImg' src={PosterFallback} />
                  <Img
                    className='posterImg'
                    src={
                      'https://toonily.com/wp-content/uploads/2023/10/The-Duke-and-The-Fox-Princess-537x768.webp'
                    }
                  />
                )}
              </div>
              <div className='right'>
                <div className='title'>
                  {`${data.title || data.original_title} (${dayjs(
                    data.release_date
                  ).format('YYYY')})`}
                </div>

                <div
                  className='subtitle'
                  style={{ fontSize: 16, marginTop: 20 }}
                >
                  {/* if src is toonily then replace text  */}
                  {data.alterNativeName.replace('Alt Name(s)', '')}
                </div>
                <Genres data={data.genres} />
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
                    Synopsis: <span style={{ opacity: 0.7 }}>{data.title}</span>
                  </div>
                  {/* <div className='description'>{data.overview}</div> */}
                  <div className='description'>
                    Nobility, dazzling appearance, and talent unparalleled. She
                    had met all the conditions for the life of a princess. She
                    could not be humbled as she walked the royal path. I’m being
                    selfish? So what? She lived her life without caring about
                    what others had thought of her. “Look at this white fur.
                    It’s like a snowball. It’s fluffy.” Have you no shame?! You
                    dare touch me?! No matter how much she yelled, her maids
                    stood dazed. Princess Eristella, an archmage of unprecented
                    abilities, was cursed and turned into a small fox. It wasn’t
                    so bad for the princess to be showered with affection by her
                    dukedom. The same people who used to grit their teeth.
                    “Eristella”
                  </div>
                </div>

                <div className='info'>
                  {data.status && (
                    <div className='infoItem'>
                      <span className='text bold'>Status: </span>
                      <span className='text'>{data.status}</span>
                    </div>
                  )}

                  <div className='infoItem'>
                    <span className='text bold'>Released By: </span>
                    <span className='text'>asuratoons.com</span>
                  </div>
                </div>

                <div className='info'>
                  {data.uploadedDate && (
                    <div className='infoItem'>
                      <span className='text bold'>Uploaded Date: </span>
                      <span className='text'>
                        {getReleaseDate(data.uploadedDate)}
                      </span>
                    </div>
                  )}

                  {data.uploadedDate && (
                    <div className='infoItem'>
                      <span className='text bold'>Updated Date: </span>
                      <span className='text'>
                        {getReleaseDate(data.uploadedDate)}
                      </span>
                    </div>
                  )}
                </div>

                <div className='info'>
                  {data?.author && (
                    <div className='infoItem'>
                      <span className='text bold'>Author: </span>
                      <div className='text'>{data?.author}</div>
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
                <div>
                  <h1 className='text-[30px]' onClick={imageUpload}>
                    Download Image
                  </h1>
                  {
                    // meta.chapterData[0].chapter_data[0].src_origin
                  }
                </div>
              </div>
            </div>
            {/* <VideoPopup
              show={show}
              setShow={setShow}
              videoId={videoId}
              setVideoId={setVideoId}
            /> */}
          </ContentWrapper>
        </>
      ) : (
        <div className='detailsBannerSkeleton'>
          <ContentWrapper>
            <div className='left skeleton'></div>
            <div className='right'>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  )
}

export default DetailsBanner
