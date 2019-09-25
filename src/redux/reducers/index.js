//import redux
import { combineReducers } from 'redux'

//import reducers
import coursesReducer from './courses'

export default combineReducers({
    courses: coursesReducer
})