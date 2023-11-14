'use client'
import React, { useState } from 'react'
import './style.scss'
import { useEffect } from 'react'
import Img from '../lazyLoadImage/Img'
import ContentWrapper from '../contentWrapper/ContentWrapper'

const HeroBanner = () => {
  const [background, setBackground] = useState('')
  const [query, setQuery] = useState('')
  // const {data, setData} = useFetch('')
  // const { url } = useSelector((state) => state.home)

  useEffect(() => {
    const bg =
      'https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/11/10-Most-Successful-Manga-Ever-(-How-Many-Copies-Were-Sold).jpg'
    console.log(bg)
    setBackground(bg)
  }, [])

  const handleSearchQuery = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }

  return (
    <div className='heroBanner'>
      {/* {!loading && ( */}
      <div className='backdrop-img'>
        <Img src={background} />
      </div>
      {/* )} */}
      <div className='opacity-layer'></div>

      <ContentWrapper>
        <div className='heroBannerContent'>
          <span className='title'>Welcome.</span>
          <span className='subTitle'>
            Millions of TV Shows and People to discover. Explore now.
          </span>
          <div className='searchInput'>
            <input
              type='text'
              placeholder='Search for a movie or tv show....'
              onKeyUp={handleSearchQuery}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner
