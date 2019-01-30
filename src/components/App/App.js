import React, { Component } from 'react';
import './App.scss';
import { apiKey } from '../../utils/apiKey'
import { fetchData } from '../../api/api'
import { connect } from 'react-redux'
import { getMovies } from '../../actions'
import { NavLink, Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import  MovieArea  from '../MovieArea/MovieArea'
import Login from '../Login/Login'
import CreateUser from '../CreateUser/CreateUser'



class App extends Component {
  constructor() {
    super()
  }

  componentDidMount = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    const movies = await fetchData(url)
    //add cleaner function?
    this.props.getMovies(movies.results)
  }

  render() {
    return (
      <div className="App">
        <header>
          <NavLink to='/' className='nav'>Show All Movies</NavLink>
          <NavLink to='/login' className='nav'>Login</NavLink>
          <NavLink to='/signup' className='nav'>Signup</NavLink>
          <NavLink to='/favorites' className='nav' >View Favorites</NavLink>
        </header>
        <Route exact path='/' component={MovieArea}/>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={CreateUser}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies
})

const mapDispatchToProps = (dispatch) => ({
  getMovies: (movies) => dispatch(getMovies(movies))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
