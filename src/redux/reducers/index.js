//import redux
import { combineReducers } from 'redux'

//import reducers
import coursesReducer from './courses'
import loginReducer from './login'

export default combineReducers({
    courses: coursesReducer,
    login: loginReducer
})