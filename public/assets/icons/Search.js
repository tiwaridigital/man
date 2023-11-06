import React from 'react'

const Search = ({ width = 24, height = 24 }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 36 36'
    >
      <path
        fill='currentColor'
        d='M16.33 5.05A10.95 10.95 0 1 1 5.39 16A11 11 0 0 1 16.33 5.05m0-2.05a13 13 0 1 0 13 13a13 13 0 0 0-13-13Z'
        class='clr-i-outline clr-i-outline-path-1'
      />
      <path
        fill='currentColor'
        d='m35 33.29l-7.37-7.42l-1.42 1.41l7.37 7.42A1 1 0 1 0 35 33.29Z'
        class='clr-i-outline clr-i-outline-path-2'
      />
      <path fill='none' d='M0 0h36v36H0z' />
    </svg>
  )
}

export default Search
