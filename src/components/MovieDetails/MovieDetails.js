import React from 'react'

const MovieDetails = ({ title, poster_path, release_date, vote_average, overview }) => {
  const movieImageUrl = "https://image.tmdb.org/t/p/w500"
  return(
    <div className='movie-details'>
      <div className='movie-details-card'>
        <div className='title-area'>
          <h3>{title}</h3>
          <img src={movieImageUrl + poster_path} alt="movie poster" />
        </div>
        <div className='details'>
          <p className='overview'> <span>Synopsis:</span> {overview}</p>
          <p><span>Released:</span> {release_date}</p>
          <p><span>Average Score:</span> {vote_average}</p>
        </div>
      </div>
    </div>

  )
}

export default MovieDetails;
