import React from 'react'
import { Header } from './Header'
import { shallow } from 'enzyme'

let wrapper;
const logoutUserMock = jest.fn();
const userMock1 = {name: 'Eric', id: 2}
const noUserMock = {}

describe('Header', () => {
  it('should match the correct snapshot when there is a user in the store', () => {
    wrapper = shallow(<Header  logoutUser={logoutUserMock} user={userMock1} />)
    expect(wrapper).toMatchSnapshot()  
  });

  it('should match the correct snapshot when there is not a user in the store', () => {
    wrapper = shallow(<Header logoutUser={logoutUserMock} user={noUserMock} />)
    expect(wrapper).toMatchSnapshot()
  })

})