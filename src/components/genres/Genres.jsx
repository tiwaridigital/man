import React from 'react'
import './style.scss'

const Genres = ({data}) => {
    // const { genres } = useSelector((state) => state.home);

    return (
        <div className='genres'>
            {data?.map((genre, idx) => {
                // if (!genres[genreId]?.name) return;
                return (
                    <div key={idx} className='genre'>
                        {genre}
                    </div>
                )
            })}
        </div>
    )
}

export default Genres
