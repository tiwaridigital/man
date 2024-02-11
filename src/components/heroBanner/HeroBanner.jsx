'use client';
import React, { useState } from 'react';
import './style.scss';
import { useEffect } from 'react';
import Img from '../lazyLoadImage/Img';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import { useRouter } from 'next/navigation';
import mangaBg from '/public/manga-bg.avif';
const HeroBanner = () => {
  const router = useRouter();
  const [background, setBackground] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setBackground(mangaBg.src);
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
          <span className="subTitle"></span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a Manga..."
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
