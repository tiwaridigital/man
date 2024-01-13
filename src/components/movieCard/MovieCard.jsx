import React from 'react';
import dayjs from 'dayjs';

import './style.scss';
import Img from '../lazyLoadImage/Img';
import CircleRating from '../circleRating/CircleRating';
import Genres from '../genres/Genres';
import PosterFallback from '../../assets/no-poster.png';
import Link from 'next/link';

const MovieCard = ({ data, fromSearch, mediaType, style }) => {
  // const { url } = useSelector((state) => state.home)
  return (
    <div className={`movieCard ${style}`}>
      <Link href={`/manga/${data.slug}`}>
        <div className="posterBlock">
          <Img className="posterImg" src={data.coverImage} />
          {!fromSearch && (
            <>
              <CircleRating rating={data?.rating} />
              <Genres data={data.genres.slice(0, 2)} />
            </>
          )}
        </div>
      </Link>

      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <span className="date">
          {dayjs(data.release_date).format('MMM D, YYYY')}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
