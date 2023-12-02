import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Bookmark from '../../../public/assets/icons/Bookmark'
import Search from '../../../public/assets/icons/Search'

const ChaptersList = ({ chapters }) => {
  const [search, setSearch] = useState(null)
  const [searchedChapters, setSearchedChapters] = useState(chapters)

  const handleSearch = (e) => {
    const searchText = e.target.value
    setSearch(searchText)
    const results = getSearchResults(searchText)
    console.log('chapter results', results)
    setSearchedChapters(results)

    if (searchText.length === 0) {
      setSearchedChapters(chapters)
    }
  }

  const getSearchResults = (search) => {
    console.log('chapter search', search)
    return chapters.filter((x) => {
      const chapterNumber = x.title.split(' ')
      return search === chapterNumber[1]
    })
  }

  return (
    <div
      className='max-h-[350px] overflow-y-auto chapters-wrapper'
      id='style-6'
    >
      <ul className=''>
        <div className='w-full mt-2 mb-4 pr-2'>
          <div className='relative h-10 w-full min-w-[200px]'>
            <div className='absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4'>
              <Search width={20} height={20} />
            </div>
            <input
              className='peer h-full w-full rounded-[7px] border border-gray-500 opacity-6 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-500 placeholder-shown:border-t-gray-500 focus:border-2 focus:border-gray-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
              placeholder=' '
              onChange={handleSearch}
              type='number'
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-50 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Search Chapter, Example: 25 or 178
            </label>
          </div>
        </div>

        {searchedChapters.length === 0 ? (
          <p>No Results Found!</p>
        ) : (
          searchedChapters?.map((x, idx) => {
            return (
              <Link
                key={idx}
                href={`/details/chapter/${x.slug}/`}
                target='_blank'
              >
                <li className='bg-[#06396B] mb-4 p-2 cursor-pointer border-[1px] border-gray-500 mr-2 rounded-md hover:shadow-lg'>
                  <p className='mb-[5px] text-[14px]'>{x.title}</p>
                  <span className='text-[12px] opacity-70'>
                    {x.last_update}
                  </span>
                </li>
              </Link>
            )
          })
        )}
      </ul>
    </div>
  )
}

export default ChaptersList
