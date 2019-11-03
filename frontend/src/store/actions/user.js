import axios from 'axios';
import { push } from 'connected-react-router';

import * as actionTypes from './actionTypes';

export const getUser_ = (temp) => {
  return { type: actionTypes.GET_USER, temp: temp };
};

export const getUser = (temp) => {
  return (dispatch) => {
    return axios.get('/api/user')
      .then((res) => dispatch(getUser_(res.data)));
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
    userInfo: userInfo
  }
}

// userInfo={ email: email, password: password, nickname: nickname }
export const signup = (userInfo) => {
  return (dispatch) => {
    return axios.post('/api/user/signup/', userInfo, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(
        (res) => {
          alert("Sign Up Success")
          dispatch(signup_(res.data))
        }
      )
  };
};
