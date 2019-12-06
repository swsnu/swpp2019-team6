import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import { connectRouter } from 'connected-react-router';

import { history, middlewares } from '../store/store';

const getMockUserReducer = jest.fn(
  (initialState) => (state, action) => {
    return initialState;
  },
);

const getMockAuthReducer = jest.fn(
  (initialState) => (state, action) => {
    return initialState;
  },
);

const getMockTravelReducer = jest.fn(
  (initialState) => (state, action) => {
    return initialState;
  },
);

export const getMockStore = (initialUserState, initialAuthState, initialTravelState) => {
  const mockUserReducer = getMockUserReducer(initialUserState);
  const mockAuthReducer = getMockAuthReducer(initialAuthState);
  const mockTravelReducer = getMockTravelReducer(initialTravelState);
  const rootReducer = combineReducers({
    user: mockUserReducer,
    auth: mockAuthReducer,
    travel: mockTravelReducer,
    router: connectRouter(history),
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)));
  return mockStore;
};
