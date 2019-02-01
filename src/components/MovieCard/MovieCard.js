import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const MovieCard = (props) => {
  console.log(props.movie)
  const { title, movie_id, poster_path, release_date, vote_average, overview } = props.movie;
  const movieImageUrl = "https://image.tmdb.org/t/p/w500"
  return (
    <div className="movie-card-div">
      <h3>{title}</h3>"
      <img src={movieImageUrl + poster_path} alt="movie poster"/>
      <p>{movie_id}</p>
      <p>{release_date}</p>
      <p>{vote_average}</p>
      <p>{overview}</p>
      {(typeof props.user.id === 'number' && props.user.favorites.includes(movie_id)) && (
        <button onClick={() => props.handleDelete(props.movie, props.user)}>DELETE</button>
      )}
      {(typeof props.user.id === 'number' && !props.user.favorites.includes(movie_id)) &&(
        <button onClick={() => props.handleFavorite(props.movie, props.user)}>FAVORITE</button>
      )}
      {typeof props.user.id !== 'number' && (
        <Link to='/login'>
          <button>FAVORITE</button>
        </Link>
      )}
    </div>
  )
}

      //conditionally render button (Add or remove favorite) checking against the vavorties in user and current movie.id
const mapStateToProps = (state) => ({
  user: state.user
})
export default connect(mapStateToProps)(MovieCard);