import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const MovieCard = ({ movie, user, handleDelete, handleFavorite }) => {
  const { movie_id, poster_path } = movie
  const movieImageUrl = "https://image.tmdb.org/t/p/w500"
  return (
    <div className="movie-card-div">
      <Link to={`/movies/${movie_id}`}>
        <img src={movieImageUrl + poster_path} alt="movie poster" />
      </Link>
      {user.id && user.favorites.includes(movie_id) && (
        <button onClick={() => handleDelete(movie, user)}>DELETE FROM FAVORITES</button>
      )}
      {user.id && !user.favorites.includes(movie_id) && (
        <button onClick={() => handleFavorite(movie, user)}>ADD TO FAVORITES</button>
      )}
      {!user.id && (
        <Link to="/login">
          <button> ADD TO FAVORITES</button>
        </Link>
      )}
    </div>
  )
}

export default MovieCard


MovieCard.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  movies: PropTypes.array,
  user: PropTypes.object.isRequired
}
