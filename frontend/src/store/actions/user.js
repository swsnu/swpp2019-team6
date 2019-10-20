import * as actionTypes from './actionTypes';
import axios from 'axios';

import { push } from 'connected-react-router';

export const getUser_ = (temp) => {
    return { type: actionTypes.GET_USER, temp: temp};
};

export const getUser = (temp) => {
    return dispatch => {
        return axios.get('/api/user')
            .then(res => dispatch(getUser_(res.data)));
    }
}