import React from 'react';

import * as actionTypes from '../actions/actionTypes';
import userReducer from './userReducer';

const initialState = {
  user: 'USER',
};

describe('userReducer', () => {
  it('should get default', () => {
    const newState = userReducer(undefined, undefined);
    expect(newState).toEqual({
      user: null,
    });
  });
  it('should get action dafault', () => {
    const newState = userReducer(undefined, {
      type: actionTypes.DEFAULT_ACTION_TYPE,
    });
    expect(newState).toEqual({
      user: null,
    });
  });
  it('should get sign up', () => {
    const newState = userReducer(undefined, {
      type: actionTypes.SIGN_UP,
      userInfo: 'USER',
    });
    expect(newState).toEqual(initialState);
  });
});
