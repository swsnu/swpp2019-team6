import axios from 'axios';
import { push } from 'connected-react-router';

import * as actionTypes from './actionTypes';

export const _getTravel = (travel) => {
  const header = {
    title: travel.head.title,
    summary: travel.head.summary,
    description: travel.head.description,
    startDate: travel.head.start_date,
    endDate: travel.head.end_date,
  };
  const items = [];
  for (let i = 0; i < travel.head.days.length; i++) {
    const dayBlock = {
      title: travel.head.days[0].title,
      day: travel.head.days[0].day,
      block_type: 'DAY',
    };
    items.push(dayBlock);
    for (let j = 0; j < travel.head.days[i].blocks.length; j++) {
      const travelItemBlock = {
        title: travel.head.days[i].blocks[j].title,
        description: travel.head.days[i].blocks[j].description,
        start_location: travel.head.days[i].blocks[j].start_location,
        end_location: travel.head.days[i].blocks[j].end_location,
        block_type: travel.head.days[i].blocks[j].block_type,
        time: travel.head.days[i].blocks[j].time,
      };
      items.push(travelItemBlock);
    }
  }
  return {
    type: actionTypes.GET_TRAVEL,
    header: header,
    items: items,
    id: travel.id,
  };
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

export const getPopularTravels_ = (travels) => {
  return { type: actionTypes.GET_POPULAR_TRAVELS, travels: travels }
}

export const getPopularTravels = () => {
  return dispatch => {
      return axios.get('/api/travel/popular/')
          .then(res => dispatch(getPopularTravels_(res.data)));
  }
}
