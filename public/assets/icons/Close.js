import React from 'react'

const Close = ({ width = 24, height = 24 }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 32 32'
    >
      <path
        fill='currentColor'
        d='M17.414 16L24 9.414L22.586 8L16 14.586L9.414 8L8 9.414L14.586 16L8 22.586L9.414 24L16 17.414L22.586 24L24 22.586L17.414 16z'
      />
    </svg>
  )
}

export default Close
