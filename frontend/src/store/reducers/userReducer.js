import * as actionTypes from '../actions/actionTypes';

const initialState = {

  user: null,
};
const initialAction = {

  type: actionTypes.DEFAULT_ACTION_TYPE,
};

const userReducer = (state = initialState, action = initialAction) => {
  switch (action.type) {
    case actionTypes.DEFAULT_ACTION_TYPE:
      break;
    case actionTypes.SIGN_UP:
      return { ...state, user: action.userInfo };

    default: break;
  }
  return state;
};


export default userReducer;
