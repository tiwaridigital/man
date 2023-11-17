import React from 'react'

const Home = ({ color, width = 24, height = 24 }) => {
  return (
    <svg
      stroke='currentColor'
      fill={color}
      strokeWidth='0'
      viewBox='0 0 24 24'
      height={height}
      width={width}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M6 19.0001H18V9.15757L12 3.70302L6 9.15757V19.0001ZM19 21.0001H5C4.44772 21.0001 4 20.5524 4 20.0001V11.0001L1 11.0001L11.3273 1.61162C11.7087 1.26488 12.2913 1.26488 12.6727 1.61162L23 11.0001L20 11.0001V20.0001C20 20.5524 19.5523 21.0001 19 21.0001ZM7.5 13.0001H9.5C9.5 14.3808 10.6193 15.5001 12 15.5001C13.3807 15.5001 14.5 14.3808 14.5 13.0001H16.5C16.5 15.4854 14.4853 17.5001 12 17.5001C9.51472 17.5001 7.5 15.4854 7.5 13.0001Z'></path>
    </svg>
  )
}

export default Home
