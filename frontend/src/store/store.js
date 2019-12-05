import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import authReducer from './reducers/auth';
import travelReducer from './reducers/travel';
import userReducer from './reducers/userReducer';

export const history = createBrowserHistory();
const rootReducer = combineReducers({
  auth: authReducer,
  travel: travelReducer,
  user: userReducer, // not for current logged-in user
  router: connectRouter(history),
});
export const middlewares = [thunk, routerMiddleware(history)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,
  composeEnhancers(
    applyMiddleware(...middlewares),
  ));

export default store;
