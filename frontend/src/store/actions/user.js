import axios from 'axios';
import { push } from 'connected-react-router';

import * as actionTypes from './actionTypes';

// export const checkEmail_ = (data) =>{
//   return { type:actionTypes.CHECK_EMAIL, checked:data.check}
// }

// export const checkEmail = (email)=>{
//   return dispatch =>{
//     return axios.get('/api/user/check/email/' + email)
//         .then(res=>{
//           dispatch(checkEmail_(res.data))
//         })
//   }
// }

export const getUser_ = (temp) => {
  return { type: actionTypes.GET_USER, temp: temp };
};

export const getUser = (temp) => {
  return (dispatch) => {
    return axios.get('/api/user')
      .then((res) => dispatch(getUser_(res.data)));
  };
};
