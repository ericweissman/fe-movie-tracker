import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieCard from '../MovieCard/MovieCard'
import { populateFavorites } from '../../actions'
import { postData } from '../../api/api';
import { getFavorites } from '../../utils/helper'

export class MovieArea extends Component  {

  handleFavorite = async (movie, user) => {
    if (user.favorites && !user.favorites.includes(movie.movie_id)) {
      await postData('/favorites/new', { ...movie, user_id: user.id });
      let userFavorites = await getFavorites(user.id)
      this.props.populateFavorites(userFavorites)
    } else {
      await postData('/favorites/new', { ...movie, user_id: user.id });
      let userFavorites = await getFavorites(user.id)
      this.props.populateFavorites(userFavorites)    
    }
  }

  render() {
    if (this.props.location.pathname === '/favorites' && this.props.user.favorites) {
      const favorites = this.props.movies.filter((movie) => {
        return this.props.user.favorites.includes(movie.movie_id)
      });
      return favorites.map((movie) => {
        return <MovieCard key={movie.movie_id} movie={movie} handleFavorite={this.handleFavorite} user={this.props.user} />
      })
    } else if (this.props.location.pathname === '/favorites' && !this.props.user.favorites) {
      return(
        <div>
          NO FAVORITES
        </div>
      )
    }
    return this.props.movies.map((movie) => {
      return (
        <MovieCard key={movie.movie_id} movie={movie} handleFavorite={this.handleFavorite} user={this.props.user} />
      )
    })
  }


}



export const mapStateToProps = (state) => ({
  movies: state.movies,
  user: state.user,
})

export const mapDispatchToProps = (dispatch) => ({
  populateFavorites: (favorites) => dispatch(populateFavorites(favorites))
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieArea)