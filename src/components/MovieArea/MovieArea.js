import React from 'react';
import { connect } from 'react-redux';
import MovieCard from '../MovieCard/MovieCard'

const MovieArea = (props) => {
  return props.movies.map((movie) => {
    return(
      <MovieCard {...movie}/>
    )
  })
}

const mapStateToProps = (state) => ({
  movies: state.movies
})

export default connect(mapStateToProps)(MovieArea)