'use client';
import MovieCard from '@/components/movieCard/MovieCard';
import ContentWrapper from '@/components/contentWrapper/ContentWrapper';
import '../explore/style.scss';
const MangaCardsContainer = ({ items }) => {
  console.log('items', items);
  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="relative">
          <div className="content">
            {items.map((item, index) => {
              return <MovieCard key={index} data={item} mediaType={'hell'} />;
            })}
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default MangaCardsContainer;
