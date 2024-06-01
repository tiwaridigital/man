import React from 'react';
import './style.scss';

const Genres = ({ data }) => {
  return (
    <div className="genres">
      {data?.map((genre, idx) => {
        return (
          <div key={idx} className="genre">
            {genre}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
