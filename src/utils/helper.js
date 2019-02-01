import {fetchData} from '../api/api'

export const getFavorites = async (id) => {
  const url = `http://localhost:3000/api/users/${id}/favorites`
  let userFavorites = await fetchData(url)
  userFavorites = userFavorites.data.map(favorite => {
    return favorite.movie_id
  })

  return userFavorites
}


