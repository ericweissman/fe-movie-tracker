import * as actions from './index'

describe('actions', () => {
  it('should return a type of GET_MOVIES with movies', () => {
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
    const expected = {
      type: 'GET_MOVIES',
      movies
    }
    const result = actions.getMovies(movies)
    expect(result).toEqual(expected)
  });

  it('should return a type of LOGIN_USER with a user', () => {
    const user = {name: 'Hill', email: 'hill@hotmail.com', password: 'hill'}
    const expected = {
      type: 'LOGIN_USER',
      user
    }
    const result = actions.loginUser(user)
    expect(result).toEqual(expected)
  });

  it('should return a type of LOGOUT_USER', () => {
    const expected = {
      type: 'LOGOUT_USER',
    }
    const result = actions.logoutUser()
    expect(result).toEqual(expected)
  });

  it('should return a type of POPULATE_FAVORIES', () => {
    const favorites = [2, 3]
    const expected = {
      type: 'POPULATE_FAVORITES',
      favorites
    }
    const result = actions.populateFavorites(favorites)
    expect(result).toEqual(expected)
  });
});