import React from 'react'

const Menu = ({ width = 24, height = 24 }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
    >
      <g
        fill='none'
        stroke='currentColor'
        strokeDasharray='24'
        strokeDashoffset='24'
        strokeLinecap='round'
        strokeWidth='2'
      >
        <path d='M5 5H19'>
          <animate
            fill='freeze'
            attributeName='stroke-dashoffset'
            dur='0.2s'
            values='24;0'
          />
        </path>
        <path d='M5 12H19'>
          <animate
            fill='freeze'
            attributeName='stroke-dashoffset'
            begin='0.2s'
            dur='0.2s'
            values='24;0'
          />
        </path>
        <path d='M5 19H19'>
          <animate
            fill='freeze'
            attributeName='stroke-dashoffset'
            begin='0.4s'
            dur='0.2s'
            values='24;0'
          />
        </path>
      </g>
    </svg>
  )
}

export default Menu
