import React from 'react';

import reducer from './travel';
import * as actionTypes from '../actions/actionTypes';

const stubState = {
  travel: 'TRAVEL',
};


describe('Travel Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, undefined);
    expect(newState).toEqual({
      travel: {},
    });
  });
  it('should get travel successfully', () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_TRAVEL,
      travel: stubState,
    });
    expect(newState).toEqual(stubState);
  });
  it('should create travel', () => {
    const newState = reducer(undefined, {
      type: actionTypes.CREATE_TRAVEL,
      travel: stubState,
    });
    expect(newState).toEqual({
      travel: stubState.travel,
    });
  });
});
