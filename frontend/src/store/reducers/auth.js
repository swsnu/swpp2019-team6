import * as actionTypes from "../actions/actionTypes";

// 로그인, 회원가입, 현재 로그인한 유저의 정보를 담습니다.
const initialState = {
  auth: null,
  authError: null,
  user: null,
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.INITIALIZE_FORM:
            return initialState;
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                auth: action.auth,
                authError: null,
            };
        case actionTypes.LOGIN_FAILURE:
            alert("Email or password is wrong")
            return {
                state,
            };
        case actionTypes.LOGOUT:
            return state;
        case actionTypes.SIGNUP_SUCCESS:
            return {
                state
            };
        case actionTypes.SIGNUP_FAILURE:
            return {
                state
            };
        default:
            break;
    }
    return state;
}

export default reducer;