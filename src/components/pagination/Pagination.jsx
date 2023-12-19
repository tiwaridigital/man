'use client'
import React from 'react'
import LeftPaginationArrow from '../../../public/assets/icons/LeftPaginationArrow'
import RightPaginationArrow from '../../../public/assets/icons/RightPaginationArrow'

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  const paginationNumber = () => {
    if (pageNumbers.length <= 5) {
      return pageNumbers
    } else if (pageNumbers.length >= 5 && currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', pageNumbers[pageNumbers.length - 1]]
    } else if (
      pageNumbers.length >= 5 &&
      currentPage >= pageNumbers[pageNumbers.length - 4]
    ) {
      return [
        1,
        '...',
        pageNumbers[pageNumbers.length - 5],
        pageNumbers[pageNumbers.length - 4],
        pageNumbers[pageNumbers.length - 3],
        pageNumbers[pageNumbers.length - 2],
        pageNumbers[pageNumbers.length - 1],
      ]
    } else if (
      pageNumbers.length > 5 &&
      currentPage > 4 &&
      currentPage < pageNumbers[pageNumbers.length - 4]
    ) {
      return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        pageNumbers[pageNumbers.length - 1],
      ]
    }
  }

  let paginationItms = paginationNumber()

  const firstPage = () => {
    paginate(1)
  }

  const lastPage = () => {
    paginate(pageNumbers[pageNumbers.length - 1])
  }

  const nextPage = () => {
    paginate(currentPage + 1)
  }

  const prevPage = () => {
    paginate(currentPage - 1)
  }

  return (
    <div className='flex justify-center'>
      <div
        className='pagination flex gap-[5px] md:gap-4 flex-wrap'
        aria-label='Page navigation example'
      >
        {/* <div
        className='paginationItem'
        disabled={currentPage - 1 === 0 ? true : false}
      >
        <div
          className='paginationLink page-link-first'
          onClick={(ev) => {
            ev.preventDefault()
            firstPage()
          }}
          href='#first'
        >
          <div className='text-white font-bold'>left icon</div>
        </div>
      </div> */}
        <div
          className='paginationItem'
          disabled={currentPage - 1 === 0 ? true : false}
        >
          <div
            className='paginationLink page-link-prev'
            onClick={(ev) => {
              ev.preventDefault()
              prevPage()
            }}
            href='#prev'
          >
            <div className='bg-gray-200 w-[32px] h-[32px] flex items-center justify-center cursor-pointer rounded-md'>
              <LeftPaginationArrow fill='black' />
            </div>
          </div>
        </div>
        {/* Pagination Items */}
        <div className='flex gap-[5px] md:gap-4'>
          {paginationItms.map((item) => {
            return (
              <div
                disabled={isNaN(item)}
                className={`paginationItem d-none d-sm-block w-[32px] h-[32px]${
                  currentPage === item ? 'active' : ''
                }`}
                key={item}
              >
                <div
                  className={`paginationLink bg-gray-200 rounded-md w-full h-full text-black flex items-center justify-center cursor-pointer ${
                    currentPage === item ? 'bg-red-500 text-white' : ''
                  }`}
                  tag='a'
                  href='#pageitem'
                  onClick={(ev) => {
                    ev.preventDefault()
                    paginate(item)
                  }}
                >
                  {item}
                </div>
              </div>
            )
          })}
        </div>
        {/* Pagination Items */}
        <div
          className='paginationItem'
          disabled={pageNumbers[pageNumbers.length - 1] === currentPage}
        >
          <div
            className='paginationLink page-link-next'
            onClick={(ev) => {
              ev.preventDefault()
              nextPage()
            }}
            href='#next'
          >
            <div className='bg-gray-200 w-[32px] h-[32px] flex items-center justify-center cursor-pointer rounded-md'>
              <RightPaginationArrow />
            </div>
          </div>
        </div>
        {/* <div
        className='paginationItem'
        disabled={pageNumbers[pageNumbers.length - 1] === currentPage}
      >
        <div
          className='paginationLink     page-link-next'
          onClick={(ev) => {
            ev.preventDefault()
            lastPage()
          }}
          href='#last'
        >
          <div className='text-white font-bold'>right icon</div>
        </div>
      </div> */}
      </div>
    </div>
  )
}
export default Pagination
