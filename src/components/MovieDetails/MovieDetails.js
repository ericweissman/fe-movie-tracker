import React from 'react'

const MovieDetails = ({title, movie_id, poster_path, release_date, vote_average, overview}) => {
  const movieImageUrl = "https://image.tmdb.org/t/p/w500"
  return(
    <div>
      <h3>{title}</h3>"
      <img src={movieImageUrl + poster_path} alt="movie poster" />
      <p>{movie_id}</p>
      <p>{release_date}</p>
      <p>{vote_average}</p>
      <p>{overview}</p>
    </div>
  )
}

export default MovieDetails;