import { Login, mapDispatchToProps } from './Login'
import React from 'react'
import { shallow } from 'enzyme';
import { loginUser } from '../../actions';
import { postData } from '../../api/api'
jest.mock('../../api/api')
const loginUserMock = jest.fn();

describe('Login', () => {
  let wrapper;
  it('should match the snapshot', () => {
    wrapper = shallow(<Login loginUser={loginUserMock}/>)
    expect(wrapper).toMatchSnapshot();
  });
  
  describe('methods', () => {
    it('should set state when handleChange is called', () => {
      const mockEvent = {target: {name: 'email', value:'a@a.com'}}
      const mockEvent2 = {target: {name: 'password', value:'x'}}
      wrapper.instance().handleChange(mockEvent);
      expect(wrapper.state('email')).toEqual('a@a.com')
      wrapper.instance().handleChange(mockEvent2);
      expect(wrapper.state('password')).toEqual('x')
    });
    
    it('should update state on handleSubmit', async () => {
      const mockUser = {data: {name: 'hill'}, status: 'success'};
      postData.mockImplementation(() => mockUser);
      const mockEvent = {preventDefault: jest.fn()}



      wrapper.setState({email: 'v@a.com', password: 'a'})
      await wrapper.instance().handleSubmit(mockEvent)
      expect(loginUserMock).toHaveBeenCalledWith(mockUser.data)

    })
  })
  describe('mapDispatchToProps', () => {
    it('should call dispatch when using a function from mapDispatchToProps', () => {
      const mockDispatch = jest.fn();
      const user = { name: 'Hill', email: 'hill@hotmail.com', password: 'hill' }
      const actionToDispatch = loginUser(user)

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.loginUser(user)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  });


})