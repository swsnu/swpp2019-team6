import * as actionTypes from '../actions/actionTypes';
// 로그인, 회원가입, 현재 로그인한 유저의 정보를 담습니다.
const initialState = {
  user: null,
  token: null,
};

const reducer = (state = initialState, action) => {
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
      return {
        state,
      };
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

export default reducer;
