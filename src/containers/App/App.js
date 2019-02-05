import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import './App.scss'
import '../../index.scss'
import { apiKey } from '../../utils/apiKey'
import { fetchData } from '../../api/api'
import { getMovies, logoutUser } from '../../actions'
import { Header } from '../../components/Header/Header'
import MovieArea from '../MovieArea/MovieArea'
import MovieDetails from '../../components/MovieDetails/MovieDetails'
import Login from '../../containers/Login/Login'
import CreateUser from '../CreateUser/CreateUser'

export class App extends Component {

  componentDidMount = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    let movies = await fetchData(url)
    movies = movies.results.map((movie) => {
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
    const { logoutUser, movies, user } = this.props
    return (
      <div className='App'>
        <Header logoutUser={logoutUser} user={user} />
        <Route exact path='/' component={MovieArea} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={CreateUser} />
        <Route exact path='/favorites' component={MovieArea} />
        <Route
          path='/movies/:id'
          render={({ match }) => {
            const { id } = match.params
            const movie = movies.find((movie) => {
              return movie.movie_id === parseInt(id)
            })
            if (movie) {
              return <MovieDetails {...movie} />
            }
          }}
        />
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  movies: state.movies,
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  getMovies: (movies) => dispatch(getMovies(movies)),
  logoutUser: () => dispatch(logoutUser())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
