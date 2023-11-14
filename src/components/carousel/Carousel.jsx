import React, {useRef} from 'react'
import './style.scss'
// import {
//   BsFillArrowLeftCircleFill,
//   BsFillArrowRightCircleFill,
// } from "react-icons/bs";
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
import dayjs from 'dayjs'

import ContentWrapper from '../contentWrapper/ContentWrapper'
import Img from '../lazyLoadImage/Img'
import PosterFallback from '../../assets/no-poster.png'
import CircleRating from '../circleRating/CircleRating'
import Genres from '../genres/Genres'
import Link from 'next/link';

const Carousel = ({data, loading, endpoint, title = 'Ujjwal Tiwari'}) => {
    console.log('data', data)
    const carouselContainer = useRef(null)
    // const { url } = useSelector((state) => state.home)
    // const navigate = useNavigate()

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
    const skeletonItem = () => {
        return (
            <div className='skeletonItem'>
                <div className='posterBlock'></div>
                <div className='textBlock'>
                    <span className='title'></span>
                    <span className='date'></span>
                </div>
            </div>
        )
    }
    return (
        <div className='carousel'>
            <ContentWrapper>
                {title && <div className='carouselTitle'>{title}</div>}
                {/* <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        /> */}
                {loading ? (
                    <div className='loadingSkeleton'>
                        {skeletonItem()}
                        {skeletonItem()}
                        {skeletonItem()}
                        {skeletonItem()}
                        {skeletonItem()}
                        {skeletonItem()}
                    </div>
                ) : (
                    <div className='carouselItems' ref={carouselContainer}>
                        {data?.map((item) => {
                            const posterUrl = item.coverImage
                                ? item.coverImage
                                : PosterFallback
                            return (

                                <div
                                    key={item.id}
                                    className='carouselItem'
                                >
                                    <Link href={`/manga/${item.slug}`} target='_blank'>
                                        <div className='posterBlock'>
                                            <Img src={posterUrl}/>
                                            <CircleRating rating={7.89.toFixed(1)}/>
                                            <Genres data={item.genres.slice(0, 2)}/>
                                        </div>
                                        <div className='textBlock'>
                                            <span className='title'>{item.title || item.name}</span>
                                            <span className='date'>
                      {dayjs(item.uploadedDate).format('MMM D, YYYY')}
                    </span>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                )}
            </ContentWrapper>
        </div>
    )
}

export default Carousel
