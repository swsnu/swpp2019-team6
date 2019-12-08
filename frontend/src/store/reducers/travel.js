import * as actionTypes from '../actions/actionTypes';

const initialState = {
  travel: {},
  popularTravels: [],
  recentTravels: [],
  userTravels: [],
  oneRawTravel: {},
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
      return { ...state, popularTravels: action.travels };
    case actionTypes.GET_RECENT_TRAVELS:
      return { ...state, recentTravels: action.travels };
    case actionTypes.GET_USER_TRAVELS:
      return { ...state, userTravels: action.travels };
    case actionTypes.GET_ONE_RAW_TRAVEL:
      return { ...state, oneRawTravel: action.travel };
    default:
      break;
  }
  return state;
};

export default travel;
