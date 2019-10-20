import * as actionTypes from './actionTypes';
import axios from 'axios';

import { push } from 'connected-react-router';

export const login_success = (auth) => {
    return { type: actionTypes.LOGIN_SUCCESS, auth: auth};
};

export const login_failure = (temp) => {
    return { type: actionTypes.LOGIN_FAILURE, temp: temp};
};

// login({ username: username, password: password })
export const login = (info) => {
    return dispatch => {
        // return axios.get('/api/user')
        //     .then(res => dispatch(login_success(res.data)));
        dispatch(login_success(info.username));
    }
}

export const logout_ = (temp) => {
    return { type: actionTypes.LOGOUT, temp: temp};
};

export const logout = (temp) => {
    return dispatch => {
        return axios.get('/api/user')
            .then(res => dispatch(logout_(res.data)));
    }
}

export const signUp_success = (temp) => {
    return { type: actionTypes.SIGNUP_SUCCESS, temp: temp};
};

export const signUp_failure = (temp) => {
    return { type: actionTypes.SIGNUP_FAILURE, temp: temp};
};

// signUp({ username: username, password: password, nickname: nickname }
export const signUp = (info) => {
    return dispatch => {
        return axios.get('/api/user')
            .then(res => dispatch(signUp_success(res.data)));
    }
}