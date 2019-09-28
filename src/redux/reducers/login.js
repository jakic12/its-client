import {
    LOGIN_SUBMIT,
    LOGIN_ERROR,
    LOGIN_SUCCESS 
} from '../actions/login'

const initialState = {
    error:null,
    isLoading: false,
    loggedIn:false
}

export default (state = initialState, action) => {
    switch(action.type){
        case LOGIN_SUBMIT:
            return Object.assign({}, state, {
                error:null,
                isLoading:true,
                loggedIn:false
            })
        case LOGIN_ERROR:
            return Object.assign({}, state, {
                error:action.error,
                isLoading:false,
                loggedIn:false
            })
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isLoading:false,
                loggedIn:action.data.username
            })
        default:
            return state
    }
}

