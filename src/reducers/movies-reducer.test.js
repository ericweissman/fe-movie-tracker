import { movieReducer } from './movies-reducer'
import * as actions from '../actions'

describe('movieReducer', () => {
  it('should return the initial state as default', () => {
    const expected = [];
    const result = movieReducer(undefined, {})
    expect(result).toEqual(expected)
  });

  it('should return the state with movies', () => {
    const movies = [{
      vote_count: 3078,
      id: 297802,
      video: false,
      vote_average: 6.9,
      title: "Aquaman",
      popularity: 805.109,
      poster_path: "/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg",
      original_language: "en",
      original_title: "Aquaman"
    }]
    const expected = movies
    const result = movieReducer(undefined, actions.getMovies(movies))
    expect(result).toEqual(expected)
  });

  
})