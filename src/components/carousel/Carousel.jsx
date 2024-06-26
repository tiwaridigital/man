import React from 'react';
import './style.scss';
import dayjs from 'dayjs';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import Img from '../lazyLoadImage/Img';
import PosterFallback from '../../assets/no-poster.png';
import CircleRating from '../circleRating/CircleRating';
import Genres from '../genres/Genres';
import Link from 'next/link';

const Carousel = ({
  data,
  loading,
  endpoint,
  title = 'Ujjwal Tiwari',
  carouselContainer,
}) => {
  const skeletonItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock"></div>
        <div className="textBlock">
          <span className="title"></span>
          <span className="date"></span>
        </div>
      </div>
    );
  };
  return (
    <div className="carousel">
      <ContentWrapper>
        {/* {title && <div className='carouselTitle'>{title}</div>} */}
        {loading ? (
          <div className="loadingSkeleton">
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
          </div>
        ) : (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const posterUrl = item.coverImage
                ? item.coverImage
                : PosterFallback;
              return (
                <div key={item.id} className="carouselItem">
                  <Link href={`/manga/${item.slug}`}>
                    <div className="posterBlock">
                      <Img src={posterUrl} alt={item.title} />
                      <CircleRating rating={Number(item.rating).toFixed(1)} />
                      <Genres data={item.genres.slice(0, 2)} />
                    </div>
                    <div className="textBlock">
                      <h2 className="title">{item.title || item.name}</h2>
                      <span className="date">
                        {dayjs(item.uploadedDate).format('MMM D, YYYY')}
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
