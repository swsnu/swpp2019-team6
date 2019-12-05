import * as actionTypes from '../actions/actionTypes';

const initialState = {
  travel: {},
  popularTravels :[],
  recentTravels : [],
};
const initialAction = {
  type: null,
};

const travel = (state = initialState, action = initialAction) => {
  switch (action.type) {
    case actionTypes.GET_TRAVEL:
      return { header: action.header, items: action.items, id: action.id };
    case actionTypes.CREATE_TRAVEL:
      return { travel: action.item };
    case actionTypes.GET_POPULAR_TRAVELS:
      return {popularTravels: action.travels}
    default:
      break;
  }
  return state;
};

export default travel;
