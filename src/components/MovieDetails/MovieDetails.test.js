import { shallow } from 'enzyme';
import MovieDetails from './MovieDetails'
import React from 'react'

describe('MovieDetails', () => {
  let wrapper

  it('should match the correct snapshot', () => {
    wrapper = shallow(<MovieDetails />)
    expect(wrapper).toMatchSnapshot();
  })
})