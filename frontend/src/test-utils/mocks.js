import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import { connectRouter } from 'connected-react-router';

import { history, middlewares } from '../store/store';

const getMockUserReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  },
);

const getMockAuthReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  },
);

const getMockTravelReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  },
);

export const getMockStore = (initialUserState, initialAuthState, initialTravelState) => {
  const mockUserReducer = getMockUserReducer(initialUserState);
  const mockAuthReducer = getMockAuthReducer(initialAuthState);
  const mockTravelReducer = getMockTravelReducer(initialTravelState);
  const rootReducer = combineReducers({
    userReducer: mockUserReducer,
    auth: mockAuthReducer,
    travel: mockTravelReducer,
    router: connectRouter(history),
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)));
  return mockStore;
};
