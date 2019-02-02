import { userReducer } from './user-reducer';
import * as actions from '../actions'

describe('userReducer', () => {
  it('should return the initial state', () => {
    const expected = {}
    const result = userReducer(undefined, {})

    expect(result).toEqual(expected)
  });

  it('should return the state with the current user', () => {
    const user = { name: 'Hill', email: 'hill@hotmail.com', password: 'hill' };
    const result = userReducer(undefined, actions.loginUser(user))

    expect(result).toEqual(user)
  });

  it('should return an empty object when we logout user', () => {
    const expected = {}
    const result = userReducer(undefined, actions.logoutUser())
    expect(result).toEqual(expected)
  });

  it('should return the original state plus the favorites when we populate favorites', () => {
    const expected = { name: 'Hill', id: 2, status: 'success', favorites: [2,3] } 
    const result = userReducer(expected, actions.populateFavorites)
    expect(result).toEqual(expected)
  })
})