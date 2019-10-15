import { host } from "../../app.json";

export const LOGIN_SUBMIT = "LOGIN_SUBMIT";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const LOGOUT_SUBMIT = "LOGOUT_SUBMIT";
export const LOGOUT_ERROR = "LOGOUT_ERROR";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const submitForm = () => {
  return {
    type: LOGIN_SUBMIT
  };
};

export const loginError = e => {
  return {
    type: LOGIN_ERROR,
    error: e
  };
};

export const loginSuccess = data => {
  return {
    type: LOGIN_SUCCESS,
    data
  };
};

export const fetchLogin = (dispatch, data) => {
  dispatch(submitForm());
  setTimeout(() => {
    // TODO: replace this with an api request
    if (data.username === `jakob` && data.password === `test`)
      dispatch(loginSuccess(data));
    else dispatch(loginError(`invalid username or password`));
  }, Math.random() * 10000);
};

export const logout = () => {
  return {
    type: LOGOUT_SUBMIT
  };
};

export const logoutError = e => {
  return {
    type: LOGOUT_ERROR,
    error: e
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const fetchLogout = dispatch => {
  dispatch(logout());
  setTimeout(() => {
    // TODO: replace this with an api request
    dispatch(logoutSuccess());
  }, Math.random() * 10000);
};
