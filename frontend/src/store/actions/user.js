import axios from 'axios';
import { push } from 'connected-react-router';

import * as actionTypes from './actionTypes';

export const getUser_ = (userInfo) => {
  return { type: actionTypes.GET_USER, userInfo: userInfo };
};

export const getUser = (id) => {
  return (dispatch) => {
    return axios.get(`/api/user/${id}/`)
      .then((res) => dispatch(getUser_(res.data)))
      .catch((res) => dispatch(push('/error')));
  };
};

// export const signup_success = (temp) => {
//   return { type: actionTypes.SIGNUP_SUCCESS, temp: temp };
// };

// export const signup_failure = () => {
//   return { type: actionTypes.SIGNUP_FAILURE };
// };

export const signup_ = (userInfo) => {
  return {
    type: actionTypes.SIGN_UP,
    userInfo: userInfo,
  };
};

// userInfo={ email: email, password: password, nickname: nickname }
export const signup = (userInfo) => {
  return (dispatch) => {
    return axios.post('/api/user/signup/', userInfo, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(
        (res) => {
          // alert('Sign Up Success');
          dispatch(signup_(res.data));
          dispatch(push('/login'));
        },
      ).catch(
        (res) => {
          dispatch(push('/error'));
        },
      );
  };
};
