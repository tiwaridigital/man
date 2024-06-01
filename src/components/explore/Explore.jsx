'use client';
import React, { useState, useEffect, useCallback } from 'react';
import './style.scss';
import MovieCard from '../../components/movieCard/MovieCard';
import Spinner from '../../components/spinner/Spinner';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import Genres from '../filters/Genres/Genres';
import Status from '../filters/Status/Status';
import DownArrow from '../../../public/assets/icons/DownArrow';
import Added from '../filters/Added/Added';
import Pagination from '../pagination/Pagination';

const Explore = ({ manga }) => {
  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const { mediaType } = 'movies';
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedAdded, setSelectedAdded] = useState(null);
  const [showFilters, setShowFilters] = useState({
    genres: false,
    status: false,
    added: false,
  });
  /*
   * Pagination
   */
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const endIdx = currentPage * itemsPerPage;
  const startIdx = endIdx - itemsPerPage;

  useEffect(() => {
    setData([...manga]);
  }, [manga]);

  useEffect(() => {
    setPageNum(1);
    setSortby(null);
  }, [mediaType]);

  const handleShowFilters = (btnName) => {
    if (btnName === 'genres') {
      setSelectedStatus(null);
      setShowFilters((prev) => ({ genres: !prev.genres }));
    } else if (btnName === 'status') {
      setSelectedGenres([]);
      setShowFilters((prev) => ({ status: !prev.status }));
    } else if (btnName === 'added') {
      setShowFilters((prev) => ({ added: !prev.added }));
    }
  };

  const sortGenres = useCallback(
    (e) => {
      const filteredData = manga.filter((item) =>
        item.genres.some((genre) => selectedGenres.includes(genre)),
      );
      setData(filteredData);

      if (selectedGenres.length == 0) {
        setData([...manga]);
      }
    },
    [manga, selectedGenres, setData],
  );

  const filterStatus = useCallback(
    (e) => {
      const filteredData = manga.filter(
        (item) => item.status === selectedStatus,
      );
      setData(filteredData);

      if (!selectedStatus) {
        setData([...manga]);
      }
    },
    [manga, setData, selectedStatus],
  );

  const filterAdded = useCallback(
    (e) => {
      let filteredData = [];
      if (selectedAdded === 'az') {
        //a-z sorting
        filteredData = manga.sort((a, b) => {
          const nameA = a.title.toUpperCase();
          const nameB = b.title.toUpperCase();

          if (nameA < nameB) {
            return -1;
          }

          if (nameA > nameB) {
            return 1;
          }

          // Names are equal
          return 0;
        });
      } else if (selectedAdded === 'za') {
        //a-z sorting
        filteredData = manga.sort((a, b) => {
          const nameA = a.title.toUpperCase();
          const nameB = b.title.toUpperCase();

          if (nameA > nameB) {
            return -1;
          }

          if (nameA < nameB) {
            return 1;
          }

          // Names are equal
          return 0;
        });
      }
      setData(filteredData);

      if (!selectedAdded) {
        setData([...manga]);
      }
    },
    [selectedAdded, manga, setData],
  );

  return (
    <div className="explorePage ">
      <ContentWrapper>
        <div className="relative">
          <div
            className="filters"
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <button
              className="p-1 bg-white filter"
              onClick={() => handleShowFilters('genres')}
            >
              Show Genres <DownArrow width={20} height={20} />
            </button>
            <button
              className="p-1 bg-white filter"
              onClick={() => handleShowFilters('status')}
            >
              Status <DownArrow width={20} height={20} />
            </button>
            <button
              className="p-1 bg-white filter"
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
          <div className="pageHeader">
            <div className="pageTitle mt-2">Explore Manga</div>
          </div>
          {data.length === 0 && <Spinner initial={true} />}
          {!loading && (
            <>
              <div className="content">
                {data?.slice(startIdx, endIdx).map((item, index) => {
                  return (
                    <MovieCard key={index} data={item} mediaType={mediaType} />
                  );
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
  );
};

export default Explore;
