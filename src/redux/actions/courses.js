//a
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
		if(Math.random() <= 1)
    	dispatch(requestCoursesSuccess([
    	  	{ uid:`12314124`, name: `test1 test1 test1 test1 test1 this is a little more test and a bit more`, categories: [`math`, `meth`] },
    	  	{ uid:`123123123`, name: `test2`, categories: [`cs`, `css`] },
    	  	{ uid:`23123`, name: `test3`, categories: [`yeet`, `foo`, `bar`, `yeetus deletus`] },
    	  	{ uid:`1231121234124`, name: `test1 test1 test1 test1 test1 this is a little more test and a bit more`, categories: [`math`, `meth`] },
    	  	{ uid:`123`, name: `test2`, categories: [`cs`, `css`] },
    	  	{ uid:`123141244124`, name: `test3`, categories: [`yeet`, `foo`, `bar`, `yeetus deletus`] },
    	  	{ uid:`214124`, name: `test1 test1 test1 test1 test1 this is a little more test and a bit more`, categories: [`math`, `meth`] },
    	  	{ uid:`2412`, name: `test2`, categories: [`cs`, `css`] },
    	  	{ uid:`22`, name: `test3`, categories: [`yeet`, `foo`, `bar`, `yeetus deletus`] }
			]))
		else
			dispatch(requestCoursesFailed(`this is a test error`))
  }, 2000);
};
