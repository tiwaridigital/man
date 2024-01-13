'use client';
import MovieCard from '@/components/movieCard/MovieCard';
import ContentWrapper from '@/components/contentWrapper/ContentWrapper';
import '../explore/style.scss';
import Link from 'next/link';
const MangaCardsContainer = ({ items }) => {
  console.log('items', items);
  return (
    <div
      className="explorePage"
      style={{ paddingTop: '5px !important', minHeight: 'auto' }}
    >
      <ContentWrapper>
        <div className="pageHeader !mb-0 sm:!mb-[24px] !flex-row">
          <div
            className="pageTitle"
            style={{ fontWeight: 400, lineHeight: '24px' }}
          >
            Latest Update
          </div>
          <Link href={'/explore'} className="cardsNavBtn">
            View All
          </Link>
        </div>
        <div className="relative">
          <div className="content">
            {items.map((item, index) => {
              return (
                <MovieCard
                  key={index}
                  data={item}
                  mediaType={'hell'}
                  pageType={'home'}
                  style={
                    (index === items.length - 1 ? 'md:hidden' : '') ||
                    (index === items.length - 2 ? 'md:hidden lg:block' : '')
                  }
                />
              );
            })}
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default MangaCardsContainer;
