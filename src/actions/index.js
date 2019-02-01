export const getMovies = (movies) => ({
  type: 'GET_MOVIES',
  movies
});

export const loginUser = (user) => ({
  type: 'LOGIN_USER',
  user
})

export const logoutUser = () => ({
  type: 'LOGOUT_USER'
})

export const populateFavorites = (favorites) => ({
  type: 'POPULATE_FAVORITES',
  favorites
})
