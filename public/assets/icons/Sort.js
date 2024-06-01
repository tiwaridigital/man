import React from 'react';

const Sort = ({ width = 24, height = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 21 21"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m10.5 12.5l4 4.107l4-4.107m-8-4l-4-4l-4 3.997m4-3.997v12m8-12v12"
      />
    </svg>
  );
};

export default Sort;
