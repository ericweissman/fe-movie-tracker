import React from 'react'

const MovieDetails = ({title, poster_path, release_date, vote_average, overview}) => {
  const movieImageUrl = "https://image.tmdb.org/t/p/w500"
  return(
    <div>
      <h3>{title}</h3>"
      <img src={movieImageUrl + poster_path} alt="movie poster" />
      <p>Released: {release_date}</p>
      <p>Average Score: {vote_average}</p>
      <p className='overview'>Synopsis: {overview}</p>
    </div>
  )
}

export default MovieDetails;