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
import Genres from '../filters/Genres/Genres'
import Status from '../filters/Status/Status'
import DownArrow from '../../../public/assets/icons/DownArrow'
import Added from '../filters/Added/Added'
import Pagination from '../pagination/Pagination'
// import Pagination from '../pagination/Pagination'

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
  const [data, setData] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false)
  const [genre, setGenre] = useState(null)
  const [sortby, setSortby] = useState(null)
  const { mediaType } = 'movies'
  const [selectedGenres, setSelectedGenres] = useState([])
  const [showGenres, setShowGenres] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [showStatus, setShowStatus] = useState(false)
  const [selectedAdded, setSelectedAdded] = useState(null)
  const [showAdded, setShowAdded] = useState(false)
  const [showFilters, setShowFilters] = useState({
    genres: false,
    status: false,
    added: false,
  })
  /*
   * Pagination
   */
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(data?.length / itemsPerPage)
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const endIdx = currentPage * itemsPerPage
  const startIdx = endIdx - itemsPerPage

  console.log('paginate data size', totalPages)
  console.log('paginate start', startIdx)
  console.log('paginate end', endIdx)
  console.log('paginate current page', currentPage)

  useEffect(() => {
    setData([...manga])
  }, [manga])

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

  const handleShowFilters = (btnName) => {
    console.log('handleShowFilters', btnName)
    if (btnName === 'genres') {
      console.log('genres show')
      setSelectedStatus(null)
      setShowFilters((prev) => ({ genres: !prev.genres }))
    } else if (btnName === 'status') {
      console.log('status show')
      setSelectedGenres([])
      setShowFilters((prev) => ({ status: !prev.status }))
    } else if (btnName === 'added') {
      console.log('handleShowFilter added show')
      setShowFilters((prev) => ({ added: !prev.added }))
    }
  }

  // console.log('handleShowFilters', showFilters)

  const sortGenres = (e) => {
    // const selectedGenres = e.map((x) => x.label)
    // setData([...manga])
    console.log('selectedGenres sortgenres called', selectedGenres)
    console.log('selectedGenres manga', manga)

    const filteredData = manga.filter((item) =>
      item.genres.some((genre) => selectedGenres.includes(genre))
    )

    console.log('filteredData genres', filteredData)
    setData(filteredData)

    if (selectedGenres.length == 0) {
      setData([...manga])
    }
  }

  const filterStatus = (e) => {
    // setData([...manga])
    console.log('filterStatus status', selectedStatus)
    console.log('filterStatus manga', manga)
    const filteredData = manga.filter((item) => item.status === selectedStatus)
    console.log('filteredData status', filteredData)
    setData(filteredData)

    if (!selectedStatus) {
      setData([...manga])
    }
  }

  const filterAdded = (e) => {
    console.log('filterAdded added', selectedAdded)
    console.log('filterAdded manga', manga)
    let filteredData = []
    if (selectedAdded === 'az') {
      //a-z sorting
      filteredData = manga.sort((a, b) => {
        const nameA = a.title.toUpperCase()
        const nameB = b.title.toUpperCase()

        if (nameA < nameB) {
          return -1
        }

        if (nameA > nameB) {
          return 1
        }

        // Names are equal
        return 0
      })
    } else if (selectedAdded === 'za') {
      //a-z sorting
      filteredData = manga.sort((a, b) => {
        const nameA = a.title.toUpperCase()
        const nameB = b.title.toUpperCase()

        if (nameA > nameB) {
          return -1
        }

        if (nameA < nameB) {
          return 1
        }

        // Names are equal
        return 0
      })
    }
    console.log('filteredData added', filteredData)
    setData(filteredData)

    if (!selectedAdded) {
      setData([...manga])
    }
  }

  return (
    <div className='explorePage '>
      <ContentWrapper>
        <div className='relative'>
          <div
            className='filters'
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <button
              className='p-1 bg-white filter'
              onClick={() => handleShowFilters('genres')}
            >
              Show Genres <DownArrow width={20} height={20} />
            </button>
            <button
              className='p-1 bg-white filter'
              onClick={() => handleShowFilters('status')}
            >
              Status <DownArrow width={20} height={20} />
            </button>
            <button
              className='p-1 bg-white filter'
              onClick={() => handleShowFilters('added')}
            >
              Order By Added <DownArrow width={20} height={20} />
            </button>
          </div>
          <Genres
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            onChange={sortGenres}
            show={showFilters.genres}
          />
          <Status
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            onChange={filterStatus}
            show={showFilters.status}
          />
          <Added
            selectedAdded={selectedAdded}
            setSelectedAdded={setSelectedAdded}
            onChange={filterAdded}
            show={showFilters.added}
          />
          <div className='pageHeader'>
            <div className='pageTitle'>Explore Manga</div>
            <div className='filters'>
              {/* <Select
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
              /> */}
            </div>
          </div>
          {data.length === 0 && <Spinner initial={true} />}
          {!loading && (
            <>
              <div className='content'>
                {data?.slice(startIdx, endIdx).map((item, index) => {
                  return (
                    <MovieCard key={index} data={item} mediaType={mediaType} />
                  )
                })}
              </div>
            </>
          )}
        </div>

        <Pagination
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          paginate={paginate}
          totalItems={data?.length}
          style={{ marginBottom: 40 }}
        />
      </ContentWrapper>
    </div>
  )
}

export default Explore
