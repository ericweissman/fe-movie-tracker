import React from 'react';
import ReactDOM from 'react-dom';
import {App, mapDispatchToProps, mapStateToProps } from './App';
import { shallow } from 'enzyme';
import * as api from '../../api/api';
import { getMovies, loginUser } from '../../actions'
describe('App', () => {
let wrapper;
const mockUser = {name: 'eric', id: 2, favorites: [2]}
const mockGetMovies = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<App user={mockUser} getMovies={mockGetMovies}/>)
  });

  it('should match the correct snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('should call fetchData the correct number of times', () => {
      api.fetchData = jest.fn(() => {results: [{movie_id: 2, title: 'Birds', poster_path: 'sfsafas', release_date: '1990-01-01', vote_average: 4.4, overview: 'assafasfas'}]});
      wrapper.instance().componentDidMount();
      expect(api.fetchData).toHaveBeenCalled();
    });

    it('should call getMovies with the correct params', () => {
      api.fetchData = jest.fn({page: 1, total_results: 19845, total_pages: 993, results: [{movie_id: 2, title: 'Birds', poster_path: 'sfsafas', release_date: '1990-01-01', vote_average: 4.4, overview: 'assafasfas'}]})
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().props.getMovies).toHaveBeenCalled();
      // expect(mockGetMovies).toHaveBeenCalled();
    })
  })

  describe('mapStateToProps', () => {
    it('should return an object with the movies array', () => {
      const mockState = {
        user: {name: 'Eric', id: 2, favorites: [3]}
      };
      const expected = {user: {name: 'Eric', id: 2, favorites: [3]}};

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch when using a function from mapDispatchToProps', () => {
      const mockDispatch = jest.fn();
      const movies = { 
        movie_id: 2,
        title: 'Dumb and Dumber',
        poster_path: 'ansfkjasnfjsan.com',
        release_date: '2018-01-01',
        vote_average: 4.1,
        overview: 'Two friends go on a roadtrip.'
       };
      const actionToDispatch = getMovies(movies);
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.getMovies(movies);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  } )
})