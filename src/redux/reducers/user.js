import {
  FETCH_USER_SUCCESS,
  FETCH_USER_REQUEST,
  FETCH_USER_FAILED,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUEST
} from "../actions/user";


const initialState = {
  isLoading: false,
  error: null,
  uid: null,
  profile: null
};

export default (state = initialState, action) => {
  switch (action.type) {

    /** FETCH HANDLERS **/
    case FETCH_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_USER_SUCCESS:
      return {
        isLoading: false,
        profile: action.payload
      };
    case FETCH_USER_FAILED:
      return {
        isLoading: false,
        error: action.payload
      };

    /** UPDATE HANDLERS **/
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: action.payload
      };
    case UPDATE_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default: return state;
  }
}