import React from 'react'
import './style.scss'

const Genres = ({ data }) => {
  return (
    <div className='genres'>
      {data?.map((genre, idx) => {
        return (
          // <a href={'/genres/'} key={idx} className='genre' rel={genre}>
          <div key={idx} className='genre'>
            {genre}
          </div>
          // </a>
        )
      })}
    </div>
  )
}

export default Genres
