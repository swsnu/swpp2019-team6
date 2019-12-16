import axios from 'axios';
import { push } from 'connected-react-router';

import * as actionTypes from './actionTypes';

export const _getTravel = (travel, isEdit) => {
  const header = {
    title: travel.head.title,
    summary: travel.head.summary,
    description: travel.head.description,
    startDate: new Date(travel.head.start_date),
    endDate: new Date(travel.head.end_date),
    photo: travel.head.photo,
  };
  const items = [];
  for (let i = 0; i < travel.head.days.length; i++) {
    let dayBlock;
    if (isEdit) {
      dayBlock = {
        id: `day-${i}`,
        info: {
          title: travel.head.days[i].title,
          datetime: new Date(travel.head.days[i].day),
          expand: true,
        },
      };
    } else {
      dayBlock = {
        title: travel.head.days[i].title,
        day: travel.head.days[i].day,
        block_type: 'DAY',
      };
    }
    items.push(dayBlock);
    for (let j = 0; j < travel.head.days[i].blocks.length; j++) {
      let travelItemBlock;
      let block_type;
      if (travel.head.days[i].blocks[j].block_type.startsWith('TRN')) {
        block_type = 'transportation';
      } else if (travel.head.days[i].blocks[j].block_type.startsWith('CUS')) {
        block_type = 'custom';
      } else if (travel.head.days[i].blocks[j].block_type.startsWith('ACT')) {
        block_type = 'activity';
      } else if (travel.head.days[i].blocks[j].block_type.startsWith('RST')) {
        block_type = 'restaurant';
      } else if (travel.head.days[i].blocks[j].block_type.startsWith('ACM')) {
        block_type = 'hotel';
      }
      if (isEdit) {
        const time = new Date();
        time.setHours(Number(travel.head.days[i].blocks[j].time.split(':')[0]),
          Number(travel.head.days[i].blocks[j].time.split(':')[1]));
        travelItemBlock = {
          id: `${block_type}-${j}`,
          info: {
            title: travel.head.days[i].blocks[j].title,
            time: time,
            point: travel.head.days[i].blocks[j].start_location,
            description: travel.head.days[i].blocks[j].description,
            expand: false,
          },
        };
      } else {
        travelItemBlock = {
          title: travel.head.days[i].blocks[j].title,
          description: travel.head.days[i].blocks[j].description,
          start_location: travel.head.days[i].blocks[j].start_location,
          end_location: travel.head.days[i].blocks[j].end_location,
          block_type: travel.head.days[i].blocks[j].block_type,
          time: travel.head.days[i].blocks[j].time,
        };
      }
      items.push(travelItemBlock);
    }
  }
  return {
    type: actionTypes.GET_TRAVEL,
    header: header,
    items: items,
    tags: travel.head.tags,
    id: travel.id,
  };
};

export const getTravel = (id, isEdit) => {
  return (dispatch) => {
    return axios.get(`/api/travel/${id}/`)
      .then((res) => dispatch(_getTravel(res.data, isEdit)))
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
      tags: [],
      block_dist: [],
      travel_embed_vector: [],
    },
  };
  // eslint-disable-next-line no-var
  var block_dist = [0, 0, 0, 0, 0];
  newTravel.head.title = travel.header.title;
  newTravel.head.summary = travel.header.summary;
  newTravel.head.description = travel.header.description;
  newTravel.head.tags = travel.tags;
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
        block_dist[0] += 1;
      } else if (travel.items[j].id.startsWith('custom')) {
        block_type = 'CUS';
        block_dist[1] += 1;
      } else if (travel.items[j].id.startsWith('activity')) {
        block_type = 'ACT';
        block_dist[2] += 1;
      } else if (travel.items[j].id.startsWith('restaurant')) {
        block_type = 'RST';
        block_dist[3] += 1;
      } else if (travel.items[j].id.startsWith('hotel')) {
        block_type = 'ACM';
        block_dist[4] += 1;
      }
      newDayBlock.blocks.push({
        title: travel.items[j].info.title,
        description: travel.items[j].info.description,
        time: _timeFormat(travel.items[j].info.time),
        start_location: travel.items[j].info.point,
        end_location: travel.items[j].info.endPoint,
        block_type: block_type,
        modified: true,
        parent_block: null,
      });
    }
    newTravel.head.days.push(newDayBlock);
  }
  if (block_dist.reduce((a, b) => a + b, 0) === 0) {
    block_dist = [1, 1, 1, 1, 1];
  }
  newTravel.head.block_dist = block_dist;
  newTravel.head.travel_embed_vector = Array(512).fill(1);
  return newTravel;
};

const errorMessage = (err, isEdit) => {
  console.log(err);
  let errMsg = '';
  const { response } = err;
  if (response.status === 400) {
    const head = isEdit ? response.data : response.data.head;
    const { title } = head;
    const { tags } = head;
    errMsg += title ? '- Fill in the title\n' : '';
    errMsg += tags ? '- Add at least one tag\n' : '';

    if (head.days) {
      // eslint-disable-next-line array-callback-return
      head.days.map((day, i) => {
        if (day.blocks) {
          // eslint-disable-next-line array-callback-return
          day.blocks.map((block, j) => {
            errMsg += block.title ? `- Fill in the title of Day ${i + 1} Block ${j + 1}\n` : '';
            errMsg += block.start_location ? `- Fill in the start location of Day ${i + 1} Block ${j + 1}\n` : '';
          });
        }
      });
    }
  } else {
    errMsg = response.data;
  }
  return errMsg;
};

export const createTravel = (travel, form_data) => {
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
          if (form_data) {
            axios.put(`/api/travel/travelCommit/${res.data.head.id}/photo/`, form_data, {
              headers: {
                'content-type': 'multipart/form-data',
              },
            }).then((res2) => {
              console.log(res2.data);
            }).catch((err2) => {
              console.log(err2);
            });
          }
          dispatch(push(`/travel/${res.data.id}/`));
        },
      ).catch(
        (err) => {
          const message = errorMessage(err, false);
          console.log(message);
          alert(message);
        },
      );
  };
};


export const editTravel = (id, travel, form_data) => {
  return (dispatch) => {
    const newTravel = convertItemToPushFormat(travel);
    return axios.post(`/api/travel/${id}/travelCommit/`, newTravel.head, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(
        (res) => {
          if (form_data) {
            axios.put(`/api/travel/travelCommit/${res.data.id}/photo/`, form_data, {
              headers: {
                'content-type': 'multipart/form-data',
              },
            }).then((res2) => {
              console.log(res2.data);
            }).catch((err2) => {
              console.log(err2);
            });
          }
          alert(res.data.id);
          dispatch(push(`/travel/${id}/`));
        },
      ).catch(
        (err) => {
          const message = errorMessage(err, true);
          alert(message);
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
      .then((res) => {
        // console.log(res);
        dispatch(getUserTravels_(res.data));
      });
  };
};

export const getOneRawTravel_ = (travel) => {
  return { type: actionTypes.GET_ONE_RAW_TRAVEL, travel: travel };
};

export const getOneRawTravel = (travel_id) => {
  return (dispatch) => {
    return axios.get(`/api/travel/${travel_id}/`)
      .then((res) => {
        axios.put(`/api/travel/view/${travel_id}/`)
          .then((res2) => {
          });
        dispatch(getOneRawTravel_(res.data));
      })
      .catch((res) => dispatch(push('/error')));
  };
};

export const getCollaboratorTravels_ = (travels) => {
  return { type: actionTypes.GET_COLLABORATOR_TRAVELS, travels: travels };
};

export const getCollaboratorTravels = (user_id) => {
  return (dispatch) => {
    return axios.get(`/api/travel/collaborator/${user_id}/`)
      .then((res) => {
        dispatch(getCollaboratorTravels_(res.data));
      });
  };
};

export const getRecommendedTravels_ = (travels) => {
  return { type: actionTypes.GET_RECOMMENDED_TRAVELS, travels: travels };
};

export const getRecommendedTravels = (user_id, travel_id) => {
  return (dispatch) => {
    return axios.get(`/api/travel/recommend/${user_id}/${travel_id}/`)
      .then((res) => {
        dispatch(getRecommendedTravels_(res.data));
      });
  };
};

export const quitCollaborator_ = (user_id, travel_id) => {
  return { type: actionTypes.QUIT_COLLABORATOR, user_id: user_id, travel_id: travel_id };
};

export const quitCollaborator = (user_id, travel_id) => {
  return (dispatch) => {
    const data = {
      deleted_collaborator: user_id,
    };
    return axios.put(`/api/travel/settings/${travel_id}/`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(
        (res) => {
          dispatch(quitCollaborator_(user_id, travel_id));
        },
      )
      .catch(
        (res) => {
          alert('Cannot remove this collaborator');
        },
      );
  };
};

export const likeTravel_ = (user_id, travel_id) => {
  return { type: actionTypes.LIKE_TRAVEL, user_id: user_id, travel_id: travel_id };
};

export const likeTravel = (user_id, travel_id) => {
  return (dispatch) => {
    return axios.put(`/api/travel/like/${travel_id}/`)
      .then(
        (res) => {
          dispatch(likeTravel_(user_id, travel_id));
        },
      )
      .catch(
        (res) => {
          alert('Cannot update travel like count');
        },
      );
  };
};

export const deleteTravel_ = (travel_id) => {
  return {
    type: actionTypes.DELETE_TRAVEL,
    travel_id: travel_id,
  };
};

export const deleteTravel = (travel_id) => {
  return (dispatch) => {
    return axios.delete(`/api/travel/${travel_id}/`)
      .then(
        (res) => {
          dispatch(deleteTravel_(travel_id));
        },
      )
      .catch(
        (res) => {
          alert('Cannot remove this travel');
        },
      );
  };
};

export const getComments_ = (comments) => {
  return { type: actionTypes.GET_COMMENTS, comments: comments };
};

export const getComments = (travel_id) => {
  return (dispatch) => {
    return axios.get(`/api/travel/${travel_id}/comment/`)
      .then((res) => dispatch(getComments_(res.data)))
      .catch((err) => console.log(err));
  };
};

export const postComment_ = (comment) => {
  return { type: actionTypes.POST_COMMENT, comment: comment };
};
export const postComment = (travel_id, comment) => {
  return (dispatch) => {
    return axios.post(`/api/travel/${travel_id}/comment/`, comment)
      .then((res) => dispatch(postComment_(res.data)))
      .catch((err) => alert('Cannot add comment'));
  };
};

export const forkTravel = (travel_id, user_id) => {
  return (dispatch) => {
    return axios.post(`/api/travel/${travel_id}/fork/`)
      .then((res) => {
        alert('FORKED !');
        dispatch(push(`/user/${user_id}/`));
      })
      .catch((err) => alert('Cannot fork travel'));
  };
};
