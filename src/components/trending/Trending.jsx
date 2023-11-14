'use client'
import React, { useState } from 'react'
import './style.scss'
// import useFetch from '../../../hooks/useFetch'
import SwitchTabs from '../switchTabs/SwitchTabs'
import Carousel from '../carousel/Carousel'
import ContentWrapper from '../contentWrapper/ContentWrapper'

const Trending = ({ data }) => {
  const [endPoint, setEndPoint] = useState('day')
  // const { data, loading } = useFetch(`/trending/all/${endPoint}`)

  const onTabChange = (tab) => {
    setEndPoint(tab === 'Day' ? 'day' : 'week')
  }

  return (
    <div className='carouselSection'>
      <ContentWrapper>
        <span className='carouselTitle'>Trending</span>
        <SwitchTabs data={['Day', 'Week']} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data} loading={false} endpoint={endPoint} />
    </div>
  )
}

export default Trending
