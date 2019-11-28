import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  token: null,
};
const initialAction = {
  type: actionTypes.INITIALIZE_FORM,
};

const auth = (state = initialState, action = initialAction) => {
  switch (action.type) {
    case actionTypes.INITIALIZE_FORM:
      return initialState;
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.auth.user));
      localStorage.setItem('token', action.auth.token);
      return {
        user: action.auth.user,
        token: action.auth.token,
      };
    case actionTypes.LOGIN_FAILURE:
      // eslint-disable-next-line no-alert
      alert('Email or password is wrong');
      break;
    case actionTypes.LOGOUT:
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return {
        user: null,
        token: null,
      };
    default:
      break;
  }
  return state;
};

export default auth;
