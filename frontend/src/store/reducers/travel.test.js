import React from 'react';

import reducer from './travel';
import * as actionTypes from '../actions/actionTypes';

const stubTravelState = {
  id: 'TRAVELID',
  header: 'HEADER',
  items: 'ITEMS',
};

const stubInitialState = {
  travel: {},
  popularTravels: [],
  recentTravels: [],
  userTravels: [],
  oneRawTravel: {},
  collaboratorTravels: [],
  recommendedTravels: [],
};

describe('Travel Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, undefined);
    expect(newState).toEqual(stubInitialState);
  });
  it('should get travel successfully', () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_TRAVEL,
      header: stubTravelState.header,
      id: stubTravelState.id,
      items: stubTravelState.items,
    });
    expect(newState).toEqual({ ...stubTravelState, ...stubInitialState });
  });
  it('should get popular travel successfully', () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_POPULAR_TRAVELS,
      travels: [],
    });
    expect(newState).toEqual(stubInitialState);
  });
  it('should get recent travel successfully', () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_RECENT_TRAVELS,
      travels: [],
    });
    expect(newState).toEqual(stubInitialState);
  });
  it('should create travel', () => {
    const newState = reducer(undefined, {
      type: actionTypes.CREATE_TRAVEL,
      travel: stubTravelState,
    });
    expect(newState).toEqual({
      ...stubInitialState,
      travel: stubTravelState.travel,
    });
  });
});
