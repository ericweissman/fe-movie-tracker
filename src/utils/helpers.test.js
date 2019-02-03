import { getFavorites } from './helper'
import * as api from '../api/api'

const mockID = 2
const mockUserFavorites = {
  data: [ {movie_id: 2}, {movie_id: 4} ]
}
api.fetchData = jest.fn(() => mockUserFavorites )

describe('getFavorites',  () => {
  it('should return an array of movie IDs when getFavorites is called', async () => {
    const expected = [2, 4]
    const result = await getFavorites(mockID)
    expect(result).toEqual(expected)
  });

  it('should fetch data with the correct URL', () => {
    const expectedURL = `http://localhost:3000/api/users/2/favorites`
    getFavorites(mockID);
    expect(api.fetchData).toHaveBeenCalledWith(expectedURL)
  })
})