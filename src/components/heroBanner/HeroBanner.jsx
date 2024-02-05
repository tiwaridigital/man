'use client';
import React, { useState } from 'react';
import './style.scss';
import { useEffect } from 'react';
import Img from '../lazyLoadImage/Img';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import { useRouter } from 'next/navigation';

const HeroBanner = () => {
  const router = useRouter();
  const [background, setBackground] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const bg =
      'https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/11/10-Most-Successful-Manga-Ever-(-How-Many-Copies-Were-Sold).jpg';
    console.log(bg);
    setBackground(bg);
  }, []);

  const handleSearchQuery = (e, type = null) => {
    if (e.key === 'Enter' && query.length > 0) {
      router.push(`/search?s=${query}`);
    } else if (type == 'clicked' && query.length > 0) {
      router.push(`/search?s=${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {/* {!loading && ( */}
      <div className="backdrop-img">
        <Img src={background} alt="backdrop" />
      </div>
      {/* )} */}
      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of TV Shows and People to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show...."
              onKeyUp={handleSearchQuery}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={(e) => handleSearchQuery(e, 'clicked')}>
              Search
            </button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
