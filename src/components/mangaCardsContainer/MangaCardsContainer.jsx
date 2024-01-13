'use client';
import MovieCard from '@/components/movieCard/MovieCard';
import ContentWrapper from '@/components/contentWrapper/ContentWrapper';
import '../explore/style.scss';
const MangaCardsContainer = ({ items }) => {
  console.log('items', items);
  return (
    <div
      className="explorePage"
      style={{ paddingTop: '5px !important', minHeight: 'auto' }}
    >
      <ContentWrapper>
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
