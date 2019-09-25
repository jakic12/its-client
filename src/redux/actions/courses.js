import { host } from "../../app.json";

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

export const fetchCourses = dispatch => {
  dispatch(requestCourses());
  setTimeout(() => {
		if(Math.random() < 0.7)
    	dispatch(requestCoursesSuccess([
    	  	{ name: `test1 test1 test1 test1 test1`, categories: [`math`, `meth`] },
    	  	{ name: `test2`, categories: [`cs`, `css`] },
    	  	{ name: `test3`, categories: [`yeet`, `foo`, `bar`, `yeet`, `foo`, `bar`] }
			]))
		else
			dispatch(requestCoursesFailed(`this is a test error`))
  }, 5000);
};
