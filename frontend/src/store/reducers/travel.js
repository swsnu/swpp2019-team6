import * as actionTypes from '../actions/actionTypes';

const initialState = {
  travel: {},
};
const initialAction = {
  type: null,
};

const travel = (state = initialState, action = initialAction) => {
  switch (action.type) {
    case actionTypes.GET_TRAVEL:
      return { travel: action.travel.travel };
    case actionTypes.CREATE_TRAVEL:
      return { travel: action.travel.travel };
    default:
      break;
  }
  return state;
};

export default travel;
