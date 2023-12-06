'use client'
import React, { useRef, useState } from 'react'
import './style.scss'
// import useFetch from '../../../hooks/useFetch'
import SwitchTabs from '../switchTabs/SwitchTabs'
import Carousel from '../carousel/Carousel'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import LeftArrow from '../../../public/assets/icons/LeftArrow'
import RightArrow from '../../../public/assets/icons/RightArrow'

const Trending = ({ data }) => {
  const carouselContainer = useRef(null)
  console.log('carouselContainer', carouselContainer)

  const [endPoint, setEndPoint] = useState('day')
  // const { data, loading } = useFetch(`/trending/all/${endPoint}`)

  const onTabChange = (tab) => {
    setEndPoint(tab === 'Day' ? 'day' : 'week')
  }

  const navigation = (direction) => {
    const container = carouselContainer.current

    const scrollAmount =
      direction === 'left'
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20)

    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <div className='carouselSection'>
      <ContentWrapper>
        <span className='carouselTitle'>Trending</span>
        <div className='flex gap-2 cursor-pointer items-center'>
          <div onClick={() => navigation('left')}>
            <LeftArrow fill='#F38D25' />
          </div>
          <div onClick={() => navigation('right')}>
            <RightArrow fill='#F38D25' />
          </div>
          <SwitchTabs data={['Day', 'Week']} onTabChange={onTabChange} />
        </div>
      </ContentWrapper>
      <Carousel
        data={data}
        loading={false}
        endpoint={endPoint}
        carouselContainer={carouselContainer}
      />
    </div>
  )
}

export default Trending