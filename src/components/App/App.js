import React, { Component } from 'react';
import './App.scss';
import { apiKey } from '../../utils/apiKey'
import { fetchData } from '../../api/api'
import { connect } from 'react-redux'
import { getMovies } from '../../actions'



class App extends Component {
  constructor() {
    super()
  }

  componentDidMount = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    const movies = await fetchData(url)
    this.props.getMovies(movies.results)
  }

  render() {
    return (
      <div className="App">

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

export default connect(mapStateToProps, mapDispatchToProps)(App);

//update connect by looking up with router once router is implemenated
