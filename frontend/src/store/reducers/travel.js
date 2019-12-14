import * as actionTypes from '../actions/actionTypes';

const initialState = {
  travel: {},
  popularTravels: [],
  recentTravels: [],
  userTravels: [],
  oneRawTravel: {},
  collaboratorTravels: [],
  recommendedTravels: [],
};
const initialAction = {
  type: null,
};

const travel = (state = initialState, action = initialAction) => {
  switch (action.type) {
    case actionTypes.GET_TRAVEL:
      return {
        ...state, header: action.header, items: action.items, tags: action.tags, id: action.id,
      };
    case actionTypes.CREATE_TRAVEL:
      return { ...state, travel: action.item };
    case actionTypes.EDIT_TRAVEL:
      return { ...state, travel: action.item };
    case actionTypes.GET_POPULAR_TRAVELS:
      return { ...state, popularTravels: action.travels };
    case actionTypes.GET_RECENT_TRAVELS:
      return { ...state, recentTravels: action.travels };
    case actionTypes.GET_USER_TRAVELS:
      return { ...state, userTravels: action.travels };
    case actionTypes.GET_ONE_RAW_TRAVEL:
      return { ...state, oneRawTravel: action.travel };
    case actionTypes.GET_COLLABORATOR_TRAVELS:
      return { ...state, collaboratorTravels: action.travels };
    case actionTypes.QUIT_COLLABORATOR: {
      const modified = state.collaboratorTravels.filter((travel_) => {
        return travel_.id !== action.travel_id;
      });
      return { ...state, collaboratorTravels: modified };
    }
    case actionTypes.DELETE_TRAVEL: {
      const modified = state.userTravels.filter((travel_) => {
        return travel_.id !== action.travel_id;
      });
      return { ...state, userTravels: modified };
    }
    case actionTypes.GET_RECOMMENDED_TRAVELS:
      return { ...state, recommendedTravels: action.travels };
    case actionTypes.LIKE_TRAVEL: {
      const modified = {
        ...state.oneRawTravel,
        likes: state.oneRawTravel.likes.add(action.user_id),
      };
      return { ...state, oneRawTravel: modified };
    }
    default:
      break;
  }
  return state;
};

export default travel;
