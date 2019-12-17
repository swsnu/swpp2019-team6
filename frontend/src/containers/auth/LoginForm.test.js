import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { connectRouter, ConnectedRouter } from 'connected-react-router';

import { mount } from 'enzyme';
import axios from 'axios';

import LoginForm from './LoginForm';
import { history } from '../../store/store';

import { getMockStore } from '../../test-utils/mocks';

import * as actionCreators from '../../store/actions/user';

const stubInitialState = {

};

const mockStore = getMockStore(stubInitialState, {}, {});

describe('LoginForm Test', () => {
  let loginForm;
  beforeEach(() => {
    loginForm = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={LoginForm} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render LoginForm', () => {
    const component = mount(loginForm);
    const wrapper = component.find('AuthForm');
    expect(wrapper.length).toBe(1);
  });
});
