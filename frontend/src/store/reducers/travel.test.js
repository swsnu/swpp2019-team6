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
  comments: [],
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

  it('should get search travel successfully', () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_SEARCH_TRAVELS,
      travels: [],
    });
    expect(newState).toHaveProperty('searchTravels');
  });

  it('should get user travel successfully', () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_USER_TRAVELS,
      travels: [],
    });
    expect(newState).toEqual(stubInitialState);
  });

  it('should get collaborators travel successfully', () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_COLLABORATOR_TRAVELS,
      travels: [],
    });
    expect(newState).toEqual(stubInitialState);
  });

  it('should get one raw travel successfully', () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_ONE_RAW_TRAVEL,
      travels: [],
    });
    expect(newState).toHaveProperty('oneRawTravel');
  });

  it('should create travel', () => {
    const newState = reducer(undefined, {
      type: actionTypes.CREATE_TRAVEL,
    });
    expect(newState).toHaveProperty('travel');
  });

  it('should edit travel', () => {
    const newState = reducer(undefined, {
      type: actionTypes.EDIT_TRAVEL,
      travel: stubTravelState,
    });
    expect(newState).toHaveProperty('travel');
  });

  it('should delete collaborators successfully', () => {
    const newState = reducer(undefined, {
      type: actionTypes.QUIT_COLLABORATOR,
      travel_id: 0,
    });
    expect(newState).toHaveProperty('collaboratorTravels');
  });

  it('should delete travel successfully', () => {
    const newState = reducer(undefined, {
      type: actionTypes.DELETE_TRAVEL,
      travel_id: 0,
    });
    expect(newState).toHaveProperty('userTravels');
  });

  it('should get recommended travels successfully', () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_RECOMMENDED_TRAVELS,
    });
    expect(newState).toHaveProperty('recommendedTravels');
  });

  it('should push like travels successfully', () => {
    const newState = reducer({
      travel: {},
      popularTravels: [],
      recentTravels: [],
      userTravels: [],
      oneRawTravel: {
        likes: {
          add: () => {},
        },
      },
      collaboratorTravels: [],
      recommendedTravels: [],
      comments: [],
    }, {
      type: actionTypes.LIKE_TRAVEL,
    });
    expect(newState).toHaveProperty('oneRawTravel');
  });

  it('should get comments successfully', () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_COMMENTS,
    });
    expect(newState).toHaveProperty('comments');
  });

  it('should post comments successfully', () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_COMMENTS,
    });
    expect(newState).toHaveProperty('comments');
  });

  it('should merge travel successfully', () => {
    const newState = reducer(undefined, {
      type: actionTypes.MERGE_TRAVEL_COMMIT,
    });
    expect(newState).toHaveProperty('userTravels');
  });
});
