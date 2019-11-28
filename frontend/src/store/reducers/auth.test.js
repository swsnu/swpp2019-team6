import React from 'react';

import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

const stubState = {
  user: 'USER',
  token: 'TOKEN',
};


describe('Auth Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, {});
    expect(newState).toEqual({
      user: null,
      token: null,
    });
  });
  it('should initialize form', () => {
    const newState = reducer(undefined, {
      type: actionTypes.INITIALIZE_FORM,
      auth: stubState,
    });
    expect(newState).toEqual({
      user: null,
      token: null,
    });
  });
  it('should login successfully', () => {
    const newState = reducer(undefined, {
      type: actionTypes.LOGIN_SUCCESS,
      auth: stubState,
    });
    expect(newState).toEqual(stubState);
  });
  it('should login failure', () => {
    window.alert = jest.fn((msg) => true);
    const newState = reducer(undefined, {
      type: actionTypes.LOGIN_FAILURE,
      auth: stubState,
    });
    expect(newState).toEqual({
      user: null,
      token: null,
    });
  });
  it('shoul logout successfully', () => {
    const newState = reducer(undefined, {
      type: actionTypes.LOGOUT,
      auth: stubState,
    });
    expect(newState).toEqual({
      user: null,
      token: null,
    });
  });
});
