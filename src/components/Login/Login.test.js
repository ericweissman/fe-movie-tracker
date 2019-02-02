import { Login, mapDispatchToProps } from './Login'
import React from 'react'
import { shallow } from 'enzyme';
import { loginUser, populateFavorites } from '../../actions';
import { postData } from '../../api/api';
import { getFavorites } from '../../utils/helper'

jest.mock('../../api/api')
jest.mock('../../utils/helper')
// jest.mock('../../actions')

const loginUserMock = jest.fn();
const mockFavoriteIDs = [2, 3]
// getFavorites = jest.fn().mockImplementation(() => Promise.resolve(
//   mockFavoriteIDs
// ))
const populateFavoritesMock = jest.fn().mockImplementation(() => Promise.all(
  mockFavoriteIDs
))



describe('Login', () => {
  let wrapper;
  it('should match the snapshot', () => {
    wrapper = shallow(<Login />)
    expect(wrapper).toMatchSnapshot();
  });
  
  describe('handleChange', () => {
    it('should set state when handleChange is called', () => {
      const mockEvent = {target: {name: 'email', value:'a@a.com'}}
      const mockEvent2 = {target: {name: 'password', value:'x'}}
      wrapper.instance().handleChange(mockEvent);
      expect(wrapper.state('email')).toEqual('a@a.com')
      wrapper.instance().handleChange(mockEvent2);
      expect(wrapper.state('password')).toEqual('x')
    });
    
  })

  describe('handleSubmit', () => {
    beforeEach(() => {
      const mockEvent = { preventDefault: jest.fn() }
      wrapper.find('form').simulate('submit', mockEvent)
    });

    it('should call postData when the form is submitted', () => {
      expect(postData).toHaveBeenCalled()
    });

    it.skip('should call loginUser with the correct params', () => {
      const mockCurrentUser = {name: 'hill', id: 2, favorites: [], status: 'success'};
      wrapper.setProps({ loginUser: loginUserMock })
      expect(loginUserMock).toHaveBeenCalled();
      expect(loginUserMock).toHaveBeenCalledWith(mockCurrentUser)
    });

    it('should set state with the correct status', () => {

    })
  })

  describe('handleFavorites', () => {
    it('should call get favorites with the correct params', async () => {
      const mockId = 2;
      wrapper.setProps({populateFavorites: populateFavoritesMock})
      wrapper.instance().handleFavorites(mockId)
      await expect(getFavorites).toHaveBeenCalledWith(mockId)
    });

    it('should call populate favorites with the correct params', () => {
      //wrapper setProps with mock of populateFavorites
      //make mockFAvoriteMovieIDs
      //run wrapper.instance of handleFavorites
      //expect populate favorites to have been called with mocked IDs
      //need to mock getFavorites so it resolves to array of ideas


      const mockId = 2;
      wrapper.setProps({ populateFavorites: populateFavoritesMock });
      wrapper.instance().handleFavorites(mockId);
      expect(populateFavoritesMock).toHaveBeenCalled()
      expect(populateFavoritesMock).toHaveBeenCalledWith(mockFavoriteIDs)
      
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch when using a function from mapDispatchToProps', () => {
      const mockDispatch = jest.fn();
      const user = { name: 'Hill', email: 'hill@hotmail.com', password: 'hill' }
      const favorites = [2, 4]
      const actionToDispatch = loginUser(user)
      const actionToDispatch2 = populateFavorites(favorites)
      const mappedProps = mapDispatchToProps(mockDispatch);
      
      mappedProps.loginUser(user)  
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)

      mappedProps.populateFavorites(favorites)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch2)
    })
  });
 

})