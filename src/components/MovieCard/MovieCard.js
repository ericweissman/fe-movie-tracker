import React from 'react'
import { Link } from 'react-router-dom'


const MovieCard = ({movie, user, handleDelete, handleFavorite}) => {
  const { movie_id, poster_path } = movie;
  const movieImageUrl = "https://image.tmdb.org/t/p/w500"
  return (
    <div className="movie-card-div">
      <Link to={`/movies/${movie_id}`} > 
          <img src={movieImageUrl + poster_path} alt="movie poster" />
      </Link>
      {(typeof user.id === 'number' && user.favorites.includes(movie_id)) && (
        <button onClick={() => handleDelete(movie, user)}>DELETE</button>
      )}
      {(typeof user.id === 'number' && !user.favorites.includes(movie_id)) &&(
        <button onClick={() => handleFavorite(movie, user)}>FAVORITE</button>
      )}
      {typeof user.id !== 'number' && (
        <Link to='/login'>
          <button>FAVORITE</button>
        </Link>
      )}
    </div>
  )
}

export default MovieCard;
