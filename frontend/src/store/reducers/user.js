import * as actionTypes from '../actions/actionTypes';

const initialState = {

  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP:
      return { ...state, user: action.userInfo };

    default: break;
  }
  return state;
};


export default userReducer;
