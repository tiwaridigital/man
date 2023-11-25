'use client'
import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import InfiniteScroll from 'react-infinite-scroll-component'
import Select from 'react-select'

import './style.scss'

// import useFetch from '../../hooks/useFetch'
// import { fetchMoviesFromApi } from '../../utils/api'
import MovieCard from '../../components/movieCard/MovieCard'
import Spinner from '../../components/spinner/Spinner'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import genres from '../../lib/genres'

let filters = {}

const sortbyData = [
  { value: 'popularity.desc', label: 'Popularity Descending' },
  { value: 'popularity.asc', label: 'Popularity Ascending' },
  { value: 'vote_average.desc', label: 'Rating Descending' },
  { value: 'vote_average.asc', label: 'Rating Ascending' },
  {
    value: 'primary_release_date.desc',
    label: 'Release Date Descending',
  },
  { value: 'primary_release_date.asc', label: 'Release Date Ascending' },
  { value: 'original_title.asc', label: 'Title (A-Z)' },
]

const Explore = ({ manga }) => {
  const [data, setData] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false)
  const [genre, setGenre] = useState(null)
  const [sortby, setSortby] = useState(null)
  const { mediaType } = 'movies'

  useEffect(() => {
    setData([...manga])
  }, [manga])

  const genresData = [
    { value: 'action', label: 'Action' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'martial arts', label: 'Martial Arts' },
    { value: 'reincarnation', label: 'Reincarnation' },
    { value: 'comedy', label: 'Comedy' },
  ]

  // const { data: genresData } = useFetch(`/genre/${mediaType}/list`)

  // const fetchInitialData = () => {
  //   setLoading(true)
  //   fetchMoviesFromApi(`/discover/${mediaType}`, filters).then((res) => {
  //     setData(res)
  //     setPageNum((prev) => prev + 1)
  //     setLoading(false)
  //   })
  // }

  // const fetchNextPageData = () => {
  //   fetchMoviesFromApi(`/discover/${mediaType}?page=${pageNum}`, filters).then(
  //     (res) => {
  //       if (data?.results) {
  //         setData({
  //           ...data,
  //           results: [...data?.results, ...res.results],
  //         })
  //       } else {
  //         setData(res)
  //       }
  //       setPageNum((prev) => prev + 1)
  //     }
  //   )
  // }

  useEffect(() => {
    filters = {}
    // setData(null)
    setPageNum(1)
    setSortby(null)
    // setGenre(null)
    // fetchInitialData()
  }, [mediaType])

  const onChange = (selectedItems, action) => {
    if (action.name === 'sortby') {
      setSortby(selectedItems)
      if (action.action !== 'clear') {
        filters.sort_by = selectedItems.value
      } else {
        delete filters.sort_by
      }
    }

    if (action.name === 'genres') {
      setGenre(selectedItems)
      const genresLabel = genre.map((x) => x.label)
      console.log('genres label', genresLabel)
      const temp = data.filter((item) => item.genres.includes(genresLabel))
      console.log('genres temp', temp)

      console.log('genres temp', temp)
      if (action.action !== 'clear') {
        // let genreId = selectedItems.map((g) => g.id)
        // genreId = JSON.stringify(genreId).slice(1, -1)
        // filters.with_genres = genreId
      } else {
        delete filters.with_genres
      }
    }

    setPageNum(1)
    // fetchInitialData()
  }

  const sortGenres = (e) => {
    const selectedGenres = e.map((x) => x.label)
    console.log('sortgenres called', selectedGenres)

    const filteredData = manga.filter((item) =>
      item.genres.some((genre) => selectedGenres.includes(genre))
    )

    console.log('sortgenres sorted', filteredData)
    setData(filteredData)
  }

  console.log('genre', genre)
  console.log('data', data)

  return (
    <div className='explorePage'>
      <ContentWrapper>
        <div className='pageHeader'>
          <div className='pageTitle'>Explore Manga</div>
          <div className='filters'>
            <Select
              isMulti
              name='genres'
              // value={genre}
              closeMenuOnSelect={false}
              options={genres}
              // getOptionLabel={(option) => option.name}
              // getOptionValue={(option) => option.id}
              onChange={sortGenres}
              placeholder='Select genres'
              className='react-select-container genresDD'
              classNamePrefix='react-select'
              instanceId={'react-select-1'}
            />
            <Select
              name='sortby'
              value={sortby}
              options={sortbyData}
              onChange={onChange}
              isClearable={true}
              placeholder='Sort by'
              className='react-select-container sortbyDD'
              classNamePrefix='react-select'
              instanceId={'react-select-12'}
            />
          </div>
        </div>
        {loading && <Spinner initial={true} />}
        {!loading && (
          <>
            {data?.length > 0 ? (
              // <InfiniteScroll
              //   className='content'
              //   dataLength={data?.results?.length || []}
              //   next={fetchNextPageData}
              //   hasMore={pageNum <= data?.total_pages}
              //   loader={<Spinner />}
              // >
              //   {data?.results?.map((item, index) => {
              //     if (item.media_type === 'person') return
              //     return (
              //       <MovieCard key={index} data={item} mediaType={mediaType} />
              //     )
              //   })}
              // </InfiniteScroll>
              <div className='content'>
                {data?.map((item, index) => {
                  return (
                    <MovieCard key={index} data={item} mediaType={mediaType} />
                  )
                })}
              </div>
            ) : (
              <span className='resultNotFound'>Sorry, Results not found!</span>
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  )
}

export default Explore
