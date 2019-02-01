import React, { Component } from 'react';
import './App.scss';
import { apiKey } from '../../utils/apiKey'
import { fetchData } from '../../api/api'
import { connect } from 'react-redux'
import { getMovies, logoutUser } from '../../actions'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import  MovieArea  from '../MovieArea/MovieArea'
import Login from '../Login/Login'
import CreateUser from '../CreateUser/CreateUser'
// import { userInfo } from 'os';
import { Header } from '../Header/Header'
import '../../index.scss'



export class App extends Component {
  // constructor() {
  //   super()
  // }

  componentDidMount = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    let movies = await fetchData(url)
    movies = movies.results.map(movie => {
      return {
        movie_id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        overview: movie.overview
      }
    })
    this.props.getMovies(movies)
  }

  render() {
    return (
      <div className="App">
        <Header logoutUser={this.props.logoutUser} user={this.props.user}/>
        <Route exact path='/' component={MovieArea}/>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={CreateUser}/>
        <Route path='/favorites' component={MovieArea}/>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  movies: state.movies,
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  getMovies: (movies) => dispatch(getMovies(movies)),
  logoutUser: () => dispatch(logoutUser()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
