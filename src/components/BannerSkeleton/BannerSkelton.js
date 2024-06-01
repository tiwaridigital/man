import React from 'react';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import './style.scss';

const BannerSkelton = () => {
  return (
    <div className="detailsBanner">
      <div className="detailsBannerSkeleton">
        <ContentWrapper>
          <div className="left skeleton"></div>
          <div className="right">
            <div className="row skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row skeleton"></div>
          </div>
        </ContentWrapper>
      </div>
    </div>
  );
};

export default BannerSkelton;
