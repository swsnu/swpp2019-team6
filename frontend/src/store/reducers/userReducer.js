import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
};
// user: current focusing user

const initialAction = {
  type: null,
};

const userReducer = (state = initialState, action = initialAction) => {
  switch (action.type) {
    case actionTypes.GET_USER:
      return { ...state, user: action.userInfo };
    case actionTypes.SIGN_UP:
      return { ...state, user: action.userInfo };
    default: break;
  }
  return state;
};


export default userReducer;
