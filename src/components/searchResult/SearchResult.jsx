'use client'
import React from 'react'
// import InfiniteScroll from 'react-infinite-scroll-component'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import Spinner from '../../components/spinner/Spinner'
import noResults from '../../assets/no-results.png'

import './style.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import MovieCard from '../movieCard/MovieCard'
import client from '../../../client'
import SEARCH_MANGA_QUERY from '@/graphql/client/manga/SearchMangaQuery.gql'
import {useSearchParams} from 'next/navigation';

const SearchResult = () => {
  const params = useSearchParams().get('s')
  console.log('params', params)

  const [data, setData] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      client
        .query({
          query: SEARCH_MANGA_QUERY,
          variables: {
            title: `%${params}%`,
          },
        })
        .then((result) => {
          setData(result.data.singleMang)
          setLoading(false)
        })
    } catch (err) {
      console.log('error while fetching search query', err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [params])

  // const fetchInitialData = () => {
  //   setLoading(true)
  //   fetchMoviesFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
  //     (res) => {
  //       setData(res)
  //       setPageNum((prev) => prev + 1)
  //       setLoading(false)
  //     }
  //   )
  // }

  // const fetchNextPageData = () => {
  //   fetchMoviesFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
  //     (res) => {
  //       if (data?.results) {
  //         setData({ ...data, results: [...data?.results, ...res.results] })
  //       } else {
  //         setData(res)
  //       }
  //       setPageNum((prev) => prev + 1)
  //     }
  //   )
  // }

  // useEffect(() => {
  //   setPageNum(1)
  //   fetchInitialData()
  // }, [query])

  console.log('data', data)

  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.length > 0 ? (
            <>
              <div className='pageTitle'>
                {`Search  ${
                  data?.length > 1 ? 'Results' : 'Result'
                } of '${params}'`}
              </div>
              {/* <InfiniteScroll
                className='content'
                dataLength={data?.results.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item, idx) => {
                  if (item.media_type === 'Person') return
                  return <MovieCard data={item} fromSearch={true} />
                })}
              </InfiniteScroll> */}
              <div className='content'>
                {data?.map((item, idx) => {
                  return <MovieCard key={idx} data={item} fromSearch={true} />
                })}
              </div>
            </>
          ) : (
            <span className='resultNotFound'>Sorry, No Results Found!</span>
          )}
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult
