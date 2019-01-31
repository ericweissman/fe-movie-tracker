import React from 'react'

const MovieCard = (props) => {
  const { title, id: movie_id, poster_path, release_date, vote_average, overview } = props.movie;
  const movieImageUrl = "https://image.tmdb.org/t/p/w500"
  return (
    <div className="movie-card-div">
      <h3>{title}</h3>"
      <img src={movieImageUrl + poster_path} alt="movie poster"/>
      <p>{movie_id}</p>
      <p>{release_date}</p>
      <p>{vote_average}</p>
      <p>{overview}</p>
      <button onClick={() => props.handleFavorite(props.movie, props.user)}>FAVORITE</button>
    </div>
  )
}

export default MovieCard;