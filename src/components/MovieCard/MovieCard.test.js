import React from "react"
import MovieCard from "../MovieCard/MovieCard"
import { shallow } from "enzyme"

let wrapper;
const handleDeleteMock = jest.fn();
const handleFavoriteMock = jest.fn();
const movieMock = {
  vote_count: 3078,
  movie_id: 297802,
  video: false,
  vote_average: 6.9,
  title: "Aquaman",
  popularity: 805.109,
  poster_path: "/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg",
  original_language: "en",
  original_title: "Aquaman"
}
const userMock = { name: 'Hill', id: 2, favorites: [297802]}

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

  it('should call handleDelete when the delete button is clicked', () => {
    wrapper.find('.delete').simulate('click');
    expect(handleDeleteMock).toHaveBeenCalled();
  });

  it('should match snapshot if user has no favorites or if there is no user', () => {
    const user2 = {};
    wrapper = shallow(<MovieCard 
      key={movieMock.id}
      movie={movieMock}
      handleFavorite={handleFavoriteMock}
      user={user2}
      handleDelete={handleDeleteMock} />);
      expect(wrapper).toMatchSnapshot();
  })

  it('should call handleFavorite when the favorite button is clicked and there is a user without the favorite in the array', () => {
    const user3 = {name: 'Christy', id: 5, favorites: []}
    wrapper = shallow(<MovieCard 
        key={movieMock.id}
        movie={movieMock}
        handleFavorite={handleFavoriteMock}
        user={user3}
        handleDelete={handleDeleteMock} />);
    wrapper.find('.favorite').simulate('click');
    expect(handleFavoriteMock).toHaveBeenCalled();
    });

  it('should match the correct snapshot when there is a user without favorites', () => {
    expect(wrapper).toMatchSnapshot();
  });
});