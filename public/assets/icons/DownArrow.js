import React from 'react'

const DownArrow = ({ height = 24, width = 24 }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 16 7'
    >
      <path
        fill='currentColor'
        d='M8 6.5a.47.47 0 0 1-.35-.15l-4.5-4.5c-.2-.2-.2-.51 0-.71c.2-.2.51-.2.71 0l4.15 4.15l4.14-4.14c.2-.2.51-.2.71 0c.2.2.2.51 0 .71l-4.5 4.5c-.1.1-.23.15-.35.15Z'
      />
    </svg>
  )
}

export default DownArrow
