import * as actionTypes from '../actions/actionTypes';

const initialState = {
    // 'email_checked': null,

};

const userReducer = (state=initialState, action) =>{
    switch(action.type){
        // case actionTypes.CHECK_EMAIL:
        //     return {...state, email_checked:!action.checked}
        default: break
    }
    return state

}


export default userReducer
