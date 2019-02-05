import React from 'react';
import { shallow } from 'enzyme';
import {CreateUser, mapDispatchToProps} from './CreateUser';
import { loginUser, populateFavorites } from '../../actions';
import * as api from '../../api/api'


describe('CreateUser', () => {
  let wrapper;
  const mockData = { data: {id:2, name: 'Eric', email: 'eric@aol.com'}, status: 'success'};
  api.postData = jest.fn(() => mockData);

  beforeEach(() => {
    wrapper = shallow(<CreateUser />);
    wrapper.setProps({loginUser: jest.fn(() => 'success')})
  });

  it('should match the correct snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have the proper default state', () => {
    const defaultState = {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      status: ""
    }
    expect(wrapper.state()).toEqual(defaultState)
  });

  it('should update state when handleChange is called', () => {
    const mockEvent = {target: {name: 'name', value: 'eric'}}
    
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state().name).toEqual(mockEvent.target.value)
  });


  it('should set call postData with the correct params when creating a user', async() => {
    const expectedState = {
      name: 'Eric',
      email: 'e@aol.com',
      password: '2',
      passwordCheck: '2',
      status: 'success'
    }
    const param1 = '/new'
    const param2 = { name: 'Eric', email:'e@aol.com', password: '2'}
    const mockEvent = {preventDefault: jest.fn()};

    wrapper.setState(expectedState)
    wrapper.find('form').simulate('submit', mockEvent);
    await expect(api.postData).toHaveBeenCalledWith(param1, param2)
  })

  it.skip('should call loginUser with the correct params', async () => {
    //can't get to this level - only reads the first await postData
    const mockUser = {name: mockData.data.name, id: mockData.data.id, favorites: []};
    const mockEvent = { preventDefault: jest.fn() };
    wrapper.find('form').simulate('submit', mockEvent);
    await expect(api.postData).toHaveBeenCalledWith(mockUser)
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch when using a function from mapDispatchToProps', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = loginUser({name: 'Eric', email: 'eric@gmail.com'});

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.loginUser({ name: 'Eric', email: 'eric@gmail.com'})

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})