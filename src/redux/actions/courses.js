import { host } from "../../app.json";
import { get } from "../../utils/request";
import courses from "../../mocks/courses.json";


export const FETCH_COURSES_REQUEST = "FETCH_COURSES_REQUEST";
export const FETCH_COURSES_FAILURE = "FETCH_COURSES_FAILURE";
export const FETCH_COURSES_SUCCESS = "FETCH_COURSES_SUCCESS";

export const requestCourses = () => {
  return {
    type: FETCH_COURSES_REQUEST
  };
};

export const requestCoursesFailed = error => {
  return {
    type: FETCH_COURSES_FAILURE,
    error
  };
};

export const requestCoursesSuccess = courses => {
  return {
    type: FETCH_COURSES_SUCCESS,
    courses
  };
};

export const fetchCourses = async dispatch => {
  dispatch(requestCourses());
  try {
    if (process.env.REACT_APP_USE_OFFLINE) {
      // return local mock data
      return dispatch(requestCoursesSuccess(courses));
    }
    dispatch(requestCoursesSuccess(await get('/education')))
  } catch (e) {
    dispatch(requestCoursesFailed(e));
  }
};