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

const _dateFormat = (datetime) => {
  const year = datetime.getFullYear();
  const month = datetime.getMonth() + 1;
  const date = datetime.getDate();
  return `${year}-${month}-${date}`;
};

const _timeFormat = (datetime) => {
  const hour = datetime.getHours();
  const minute = datetime.getMinutes();
  return `${hour}:${minute}`;
};

const convertItemToPushFormat = (travel) => {
  const newTravel = {
    fork_parent: null,
    head: {
      days: [],
      title: '',
      summary: '',
      description: '',
      start_date: '',
      end_date: '',
    },
  };
  newTravel.head.title = travel.header.title;
  newTravel.head.summary = travel.header.summary;
  newTravel.head.description = travel.header.description;
  newTravel.head.start_date = _dateFormat(travel.header.startDate);
  newTravel.head.end_date = _dateFormat(travel.header.endDate);
  const dayBlockIndex = [];
  for (let i = 0; i < travel.items.length; i++) {
    if (travel.items[i].id.startsWith('day')) {
      dayBlockIndex.push(i);
    }
  }
  dayBlockIndex.push(travel.items.length);
  for (let i = 0; i < dayBlockIndex.length - 1; i++) {
    const newDayBlock = {
      blocks: [],
      title: travel.items[dayBlockIndex[i]].info.title,
      day: _dateFormat(travel.items[dayBlockIndex[i]].info.datetime),
      modified: true,
      parent_day: null,
    };
    for (let j = dayBlockIndex[i] + 1; j < dayBlockIndex[i + 1]; j++) {
      let block_type = '';
      if (travel.items[j].id.startsWith('transportation')) {
        block_type = 'TRN';
      } else if (travel.items[j].id.startsWith('custom')) {
        block_type = 'CUS';
      } else if (travel.items[j].id.startsWith('activity')) {
        block_type = 'ACT';
      } else if (travel.items[j].id.startsWith('restaurant')) {
        block_type = 'RST';
      } else if (travel.items[j].id.startsWith('hotel')) {
        block_type = 'ACM';
      }
      newDayBlock.blocks.push({
        title: travel.items[j].info.title,
        description: travel.items[j].info.description,
        time: _timeFormat(travel.items[j].info.startTime),
        start_location: travel.items[j].info.startPoint || travel.items[j].info.point || '.',
        end_location: travel.items[j].info.endPoint,
        block_type: block_type,
        modified: true,
        parent_block: null,
      });
    }
    newTravel.head.days.push(newDayBlock);
  }
  return newTravel;
};

export const createTravel = (travel) => {
  return (dispatch) => {
    const newTravel = convertItemToPushFormat(travel);
    return axios.post('/api/travel/', newTravel, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(
        (res) => {
          dispatch(_createTravel(res.data));
          dispatch(push(`/travel/${res.data.id}/`));
        },
      ).catch(
        (res) => {
          dispatch(push('/error'));
        },
      );
  };
};

export const getPopularTravels_ = (travels) => {
  return { type: actionTypes.GET_POPULAR_TRAVELS, travels: travels };
};

export const getPopularTravels = () => {
  return (dispatch) => {
    return axios.get('/api/travel/popular/')
      .then((res) => dispatch(getPopularTravels_(res.data)));
  };
};

export const getRecentTravels_ = (travels) => {
  return { type: actionTypes.GET_RECENT_TRAVELS, travels: travels };
};

export const getRecentTravels = () => {
  return (dispatch) => {
    return axios.get('/api/travel/recent/')
      .then((res) => dispatch(getRecentTravels_(res.data)));
  };
};

export const getUserTravels_ = (travels) => {
  return { type: actionTypes.GET_USER_TRAVELS, travels: travels };
};

export const getUserTravels = (user_id) => {
  return (dispatch) => {
    return axios.get(`/api/travel/user/${user_id}/`)
      .then((res) => dispatch(getUserTravels_(res.data)));
  };
};
