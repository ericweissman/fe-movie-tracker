import { combineReducers } from 'redux'
import { movieReducer } from './movies-reducer'
import { userReducer } from './user-reducer'


const rootReducer = combineReducers({
  movies: movieReducer,
  user: userReducer
})

export default rootReducer;