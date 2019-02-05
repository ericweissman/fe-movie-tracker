import React from "react"
import MovieCard from "../MovieCard/MovieCard"
import { shallow } from "enzyme"

let wrapper;
const handleDeleteMock = jest.fn();
const handleFavoriteMock = jest.fn();
const movieMock = {
  vote_count: 3078,
  id: 297802,
  video: false,
  vote_average: 6.9,
  title: "Aquaman",
  popularity: 805.109,
  poster_path: "/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg",
  original_language: "en",
  original_title: "Aquaman"
}
const userMock = { name: 'Hill', id: 2, favorites: [movieMock]}

describe('MovieCard', () => {

  it('should match snapshot', () => {
    wrapper = shallow(<MovieCard 
      key={movieMock.id}
      movie={movieMock}
      handleFavorite={handleFavoriteMock}
      user={userMock}
      handleDelete={handleDeleteMock} />)
      expect(wrapper).toMatchSnapshot()
  });
});