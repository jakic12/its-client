//import redux
import { combineReducers } from "redux";

//import reducers
import coursesReducer from "./courses";
import loginReducer from "./login";
import userReducer from './user';


export default combineReducers({
  courses: coursesReducer,
  login: loginReducer,
  user: userReducer
});
