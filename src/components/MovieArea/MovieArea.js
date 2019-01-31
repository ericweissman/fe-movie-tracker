import React from 'react';
import { connect } from 'react-redux';
import MovieCard from '../MovieCard/MovieCard'
import { addFavorite } from '../../actions'
import { postData } from '../../api/api';

export const MovieArea = (props) => {
  return props.movies.map((movie) => {
    return(
      <MovieCard movie={movie} handleFavorite={handleFavorite} user={props.user}/>
    )
  })
}

const handleFavorite = async (movie, user) => {
  console.log(movie)
  if (!user.favorites.includes(movie.movie_id) && typeof user.id === 'number') {
    await postData('/favorites/new', {...movie, user_id: user.id})
  } else {
    console.log('you are not logged in')
  }
}

export const mapStateToProps = (state) => ({
  movies: state.movies,
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  addFavorite: (movie) => dispatch(addFavorite(movie))
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieArea)