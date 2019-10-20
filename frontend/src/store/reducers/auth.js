import * as actionTypes from "../actions/actionTypes";

const initialState = {
  auth: null,
  authError: null,
  user: null,
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return state;
        case actionTypes.LOGIN_FAILURE:
            return state;
        case actionTypes.LOGOUT:
            return state;
        case actionTypes.SIGNUP_SUCCESS:
            return state;
        case actionTypes.SIGNUP_FAILURE:
            return state;
        default:
            break;
    }
    return state;
}

export default reducer;