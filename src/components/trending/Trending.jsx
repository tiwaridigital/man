'use client';
import React, { useRef, useState } from 'react';
import './style.scss';
import SwitchTabs from '../switchTabs/SwitchTabs';
import Carousel from '../carousel/Carousel';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import LeftArrow from '../../../public/assets/icons/LeftArrow';
import RightArrow from '../../../public/assets/icons/RightArrow';
import LeftNavigation from '../../../public/assets/icons/LeftNavigation';

const Trending = ({ data, title }) => {
  const carouselContainer = useRef(null);

  const [endPoint, setEndPoint] = useState('day');
  // const { data, loading } = useFetch(`/trending/all/${endPoint}`)

  const onTabChange = (tab) => {
    setEndPoint(tab === 'Day' ? 'day' : 'week');
  };

  const navigation = (direction) => {
    const container = carouselContainer.current;

    const scrollAmount =
      direction === 'left'
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">{title}</span>
        <div className="flex gap-2 cursor-pointer items-center">
          <SwitchTabs
            // data={['Day', 'Week']}
            onTabChange={onTabChange}
            navigation={navigation}
          />
        </div>
      </ContentWrapper>
      <Carousel
        data={data}
        loading={false}
        endpoint={endPoint}
        carouselContainer={carouselContainer}
      />
    </div>
  );
};

export default Trending;
