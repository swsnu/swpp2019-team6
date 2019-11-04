import axios from 'axios';
import { push } from 'connected-react-router';

import * as actionTypes from './actionTypes';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const login_success = (auth) => {
  return { type: actionTypes.LOGIN_SUCCESS, auth: auth };
};

export const login_failure = () => {
  return { type: actionTypes.LOGIN_FAILURE };
};

// login({ email: email, password: password })
export const login = (info) => {
  return (dispatch) => {
    return axios.post('/api/user/auth/', info, config)
      .then((res) => {
        dispatch(login_success(res.data));
      })
      .then(() => dispatch(push('/main/')))
      .catch((res) => dispatch(login_failure()));
  };
};

export const logout_ = () => {
  return { type: actionTypes.LOGOUT };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(logout_());
    dispatch(push('/login'));
  };
};

export const signUp_success = (temp) => {
  return { type: actionTypes.SIGNUP_SUCCESS, temp: temp };
};

export const signUp_failure = () => {
  return { type: actionTypes.SIGNUP_FAILURE };
};

// signUp({ email: email, password: password, nickname: nickname }
export const signUp = (info) => {
  return (dispatch) => {
    return axios.post('/api/user/signup/', info)
      .then((res) => dispatch(signUp_success(res.data)))
      .catch((res) => dispatch(signUp_failure()));
    // dispatch(login_success(info.email));
  };
};
