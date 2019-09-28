import { host } from "../../app.json";

export const LOGIN_SUBMIT = "LOGIN_SUBMIT"
export const LOGIN_ERROR = "LOGIN_ERROR"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"

export const submitForm = () => {
    return {
        type:LOGIN_SUBMIT
    }
}

export const loginError = e => {
    return {
        type:LOGIN_ERROR,
        error:e
    }
}

export const loginSuccess = data => {
    return {
        type:LOGIN_SUCCESS,
        data
    }
}

export const fetchLogin = (dispatch, data) => {
    dispatch(submitForm())
    setTimeout(() => { // TODO: replace this with an api request
        if(data.username === `jakob` && data.password === `test`)
            dispatch(loginSuccess(data))
        else
            dispatch(loginError(`invalid username or password`))
    }, Math.random()*10000)
}