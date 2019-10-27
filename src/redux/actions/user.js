import { get } from "../../utils/request";

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILED = 'FETCH_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';


export const fetchUser = dispatch => async (uid) => {
  dispatch({ type: FETCH_USER_REQUEST });
  try {
    //const user = await get(`/user/${uid}`);
    const user = require('../../mocks/users')[0];
    dispatch({ type: FETCH_USER_SUCCESS, payload: user })
  } catch (e) {
    dispatch({ type: FETCH_USER_FAILED, payload: e })
  }
};

export const updateUser = dispatch => async (uid) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    //const user = await get(`/user/${uid}`);
    const user = require('../../mocks/users')[0];
    dispatch({ type: UPDATE_USER_SUCCESS, payload: user })
  } catch (e) {
    dispatch({ type: UPDATE_USER_FAILED, payload: e })
  }
};