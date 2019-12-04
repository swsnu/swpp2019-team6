import axios from 'axios';
import { push } from 'connected-react-router';

import * as actionTypes from './actionTypes';

export const _getTravel = (travel) => {
  return { type: actionTypes.GET_TRAVEL, travel: travel };
};

export const getTravel = (id) => {
  return (dispatch) => {
    return axios.get(`/api/travel/${id}/`)
      .then((res) => dispatch(_getTravel(res.data)))
      .catch((res) => dispatch(push('/error')));
  };
};

export const _createTravel = (travel) => {
  return { type: actionTypes.CREATE_TRAVEL, travel: travel };
};

export const createTravel = (travel) => {
  return (dispatch) => {
    return axios.post('/api/travel/', travel, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(
        (res) => {
          dispatch(_createTravel(res.data));
          dispatch(push(`/travel/detail/${res.data.id}/`));
        },
      ).catch(
        (res) => {
          dispatch(push('/error'));
        },
      );
  };
};
