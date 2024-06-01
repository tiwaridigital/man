import React from 'react';
import dayjs from 'dayjs';
import './style.scss';
import Img from '../lazyLoadImage/Img';
import CircleRating from '../circleRating/CircleRating';
import Genres from '../genres/Genres';
import Link from 'next/link';

const MovieCard = ({ data, fromSearch, mediaType, style }) => {
  return (
    <div className={`movieCard ${style}`}>
      <Link href={`/manga/${data.slug}`}>
        <div className="posterBlock">
          <Img className="posterImg" src={data.coverImage} alt={data.title} />
          {!fromSearch && (
            <>
              <CircleRating rating={data?.rating} />
              <Genres data={data.genres.slice(0, 2)} />
            </>
          )}
        </div>
      </Link>

      <div className="textBlock">
        <h2 className="title">{data.title || data.name}</h2>
        <span className="date">
          {dayjs(data.release_date).format('MMM D, YYYY')}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
