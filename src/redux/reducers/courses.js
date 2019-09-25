import {
    FETCH_COURSES_REQUEST,
    FETCH_COURSES_FAILURE,
    FETCH_COURSES_SUCCESS
} from '../actions/courses'

const initialState = {
    error:null,
    isLoading: false,
    courses:[]
}

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_COURSES_REQUEST:
            return Object.assign({}, state, {
                error:null,
                isLoading:true
            })
        case FETCH_COURSES_FAILURE:
            return Object.assign({}, state, {
                error:action.error,
                isLoading:false
            })
        case FETCH_COURSES_SUCCESS:
            return Object.assign({}, state, {
                error:null,
                isLoading:false,
                courses:action.courses
            })
        default:
            return state;
    }
}