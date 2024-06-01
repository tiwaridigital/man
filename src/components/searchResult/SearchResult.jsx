'use client';
import React from 'react';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import Spinner from '../../components/spinner/Spinner';
import './style.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import MovieCard from '../movieCard/MovieCard';
import client from '../../../client';
import SEARCH_MANGA_QUERY from '@/graphql/client/manga/SearchMangaQuery.gql';
import { useSearchParams } from 'next/navigation';
import Error404 from '../Error/Error404';

const SearchResult = () => {
  const params = useSearchParams().get('s');
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      client
        .query({
          query: SEARCH_MANGA_QUERY,
          variables: {
            title: `%${params}%`,
          },
        })
        .then((result) => {
          setData(result.data.singleMang);
          setLoading(false);
        });
    } catch (err) {
      console.error('error while fetching search query', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search  ${
                  data?.length > 1 ? 'Results' : 'Result'
                } of '${params}'`}
              </div>
              <div className="content">
                {data?.map((item, idx) => {
                  return <MovieCard key={idx} data={item} fromSearch={true} />;
                })}
              </div>
            </>
          ) : (
            <Error404
              description="Looks like the searched result is not Found! Please Try With
            Correct Spelling or the Manga Doesn't Exist on Our Website"
            />
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
