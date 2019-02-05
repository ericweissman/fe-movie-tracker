import React from "react"
import { shallow } from "enzyme"
import { mapStateToProps, MovieArea } from "./MovieArea"
import { handleFavorite } from "../MovieArea/MovieArea"
// import { getFavorites } from "../../utils/helper";
// import { populateFavorites } from "../../actions"
import * as api from "../../api/api"
jest.mock("../../api/api")

describe("MovieArea", () => {
  let wrapper
  let moviesMock = [
    {
      vote_count: 3078,
      movie_id: 1,
      video: false,
      vote_average: 6.9,
      title: "Aquaman",
      popularity: 805.109,
      poster_path: "/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg",
      original_language: "en",
      original_title: "Aquaman"
    },
    {
      vote_count: 3078,
      movie_id: 2,
      video: false,
      vote_average: 6.9,
      title: "Aquaman",
      popularity: 805.109,
      poster_path: "/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg",
      original_language: "en",
      original_title: "Aquaman"
    }
  ]
  let newFavMovie = {
    vote_count: 3078,
    movie_id: 3,
    video: false,
    vote_average: 6.9,
    title: "Aquaman",
    popularity: 805.109,
    poster_path: "/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg",
    original_language: "en",
    original_title: "Aquaman"
  }
  let userMock = { name: "Hill", id: 265, favorites: [1, 2] }
  let mockLocation = { pathname: "/favorites" }
  let handleFavorite = jest.fn()
  let mockData = {
    status: "success",
    message: "Movie was added to favorites",
    id: 3
  }
  let mockFavoriteIDs = [2, 3]
  let getFavorites = jest.fn(() => mockFavoriteIDs)
  let populateFavoritesMock = jest
    .fn()
    .mockImplementation(() => Promise.all(mockFavoriteIDs))

  it("should match the correct snapshot", () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe("handleFavorite", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <MovieArea
          location={mockLocation}
          user={userMock}
          movies={moviesMock}
          populateFavorites={populateFavoritesMock}
        />
      )
    })
    it.skip("should call postData, getFavorites, populateFavorites if the movie is not in the user favorites", async () => {
      handleFavorite(newFavMovie, userMock)
      api.postData = await jest.fn(() => mockData)
      let favs = await getFavorites(userMock.id)
      expect(wrapper.instance().props.populateFavorites).toHaveBeenCalledWith(
        ...favs
      )
    })
  })

  describe("mapStateToProps", () => {
    it("should return an object with the movies in an array", () => {
      const movies = [
        {
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
      ]
      const mockState = {
        movies,
        user: {}
      }
      const expected = { movies, user: {} }
      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    })
  })
})
