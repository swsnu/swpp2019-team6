import React from 'react';

import reducer from './travel';
import * as actionTypes from '../actions/actionTypes';

const stubTravelState = {
  id: 'TRAVELID',
  header: 'HEADER',
  items: 'ITEMS',
};


describe('Travel Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, undefined);
    expect(newState).toEqual({
      travel: {},
      popularTravels: [],
      recentTravels: [],
    });
  });
  it('should get travel successfully', () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_TRAVEL,
      header: stubTravelState.header,
      id: stubTravelState.id,
      items: stubTravelState.items,
    });
    expect(newState).toEqual(stubTravelState);
  });
  it('should create travel', () => {
    const newState = reducer(undefined, {
      type: actionTypes.CREATE_TRAVEL,
      travel: stubTravelState,
    });
    expect(newState).toEqual({
      travel: stubTravelState.travel,
    });
  });
});
