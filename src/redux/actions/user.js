import { get, post } from "../../utils/request";


export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILED = 'FETCH_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const fetchUser = dispatch => async (uid) => {
  dispatch({ type: FETCH_USER_REQUEST });
  try {
    if (process.env.REACT_APP_USE_OFFLINE) {
      // return local mock data
      return dispatch({
        type: FETCH_USER_SUCCESS,
        payload: require('../../mocks/user')
      });
    }
    const user = await get(`/user/${uid}`);
    dispatch({ type: FETCH_USER_SUCCESS, payload: user })
  } catch (e) {
    dispatch({ type: FETCH_USER_FAILED, payload: e })
  }
};

export const updateUser = dispatch => async (uid, user) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    if (process.env.REACT_APP_USE_OFFLINE) {
      // return local mock data
      return dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: user
      });
    }
    const updatedUser = await post(`/user/${uid}`, user);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: updatedUser })
  } catch (e) {
    dispatch({ type: UPDATE_USER_FAILED, payload: e })
  }
};