import React from 'react'
import { shallow } from 'enzyme';
import { mapStateToProps, MovieArea } from './MovieArea'

describe('MovieArea', () => {
  let wrapper;
  // it('should match the correct snapshot', () => {
  //   wrapper = shallow(<MovieArea />);
  //   expect(wrapper).toMatchSnapshot();
  // })

  describe('mapStateToProps', () => {
    it('should return an object with the movies in an array', () => {
    
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
      const mockState = {
        movies,
        user: {}
      }
      const expected = { movies, user: {} }
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected)
    })
  })
})