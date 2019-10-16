import {
  LOGIN_SUBMIT,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUBMIT,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS
} from "../actions/login";

const initialState = {
  error: null,
  isLoading: false,
  loggedIn: false,
  isLogoutLoading: false,
  logoutError: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUBMIT:
      return Object.assign({}, state, {
        error: null,
        isLoading: true,
        loggedIn: false
      });
    case LOGIN_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        isLoading: false,
        loggedIn: false
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        loggedIn: action.data.username
      });
    case LOGOUT_SUBMIT:
      return Object.assign({}, state, {
        logoutError: null,
        isLogoutLoading: true
      });
    case LOGOUT_ERROR:
      return Object.assign({}, state, {
        isLogoutLoading: false,
        logoutError: action.error
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isLogoutLoading: false,
        loggedIn: false
      });
    default:
      return state;
  }
};
