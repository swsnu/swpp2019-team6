import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { connectRouter, ConnectedRouter } from 'connected-react-router';

import { mount } from 'enzyme';
import axios from 'axios';

import SignupForm from './SignupForm';
import { history } from '../../store/store';

import { getMockStore } from '../../test-utils/mocks';

import * as actionCreators from '../../store/actions/user';

const stubInitialState = {

};

const stubCheckTrue = {
  check: true,
};
const stubCheckFalse = {
  check: false,
};
const mockStore = getMockStore(stubInitialState);

describe('SignupForm Test', () => {
  let signupForm;
  beforeEach(() => {
    signupForm = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={SignupForm} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render SignupForm', () => {
    const component = mount(signupForm);
    const wrapper = component.find('.SignupForm');
    expect(wrapper.length).toBe(1);
  });
  it('should call clickCheckEmail', (done) => {
    const component = mount(signupForm);
    const wrapper = component.find('button#checkEmail');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('click');

    const SignupFormInstance = component.find(SignupForm.WrappedComponent).instance();
    expect(SignupFormInstance.state.email_helperText).toEqual('Enter your email');

    SignupFormInstance.setState({ email: 'test' });
    axios.get = jest.fn((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200, data: stubCheckTrue,
        };
        resolve(result);
      });
    });

    wrapper.simulate('click');
    expect(axios.get).toHaveBeenCalledTimes(1);


    axios.get = jest.fn((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200, data: stubCheckFalse,
        };
        resolve(result);
      });
    });
    wrapper.simulate('click');
    expect(axios.get).toHaveBeenCalledTimes(1);

    done();
  });

  it('should call clickCheckPassword', () => {
    const component = mount(signupForm);

    const wrapper1 = component.find('input').find({ name: 'password' });
    expect(wrapper1.length).toBe(1);
    wrapper1.simulate('change', { target: { value: 'pw' } });

    const SignupFormInstance = component.find(SignupForm.WrappedComponent).instance();
    expect(SignupFormInstance.state.password_helperText).toEqual('Enter your password');

  });

  it('should call clickCheckNickname', (done) => {
    const component = mount(signupForm);
    const wrapper = component.find('button#checkNickname');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('click');

    const SignupFormInstance = component.find(SignupForm.WrappedComponent).instance();
    expect(SignupFormInstance.state.nickname_helperText).toEqual('Enter your nickname');

    SignupFormInstance.setState({ nickname: 'test' });
    axios.get = jest.fn((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200, data: stubCheckTrue,
        };
        resolve(result);
      });
    });
    wrapper.simulate('click');
    expect(axios.get).toHaveBeenCalledTimes(1);

    axios.get = jest.fn((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200, data: stubCheckFalse,
        };
        resolve(result);
      });
    });
    wrapper.simulate('click');
    expect(axios.get).toHaveBeenCalledTimes(1);
    done();
  });

  it('should call clickSubmit', () => {
    const spySignup = jest.spyOn(actionCreators, 'signup')
      .mockImplementation((userInfo) => { return (dispatch) => { }; });

    const component = mount(signupForm);
    const wrapper = component.find('button#submit');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('click');

    const SignupFormInstance = component.find(SignupForm.WrappedComponent).instance();
    SignupFormInstance.setState({ email_checked: true });
    SignupFormInstance.setState({ password_checked: true });
    SignupFormInstance.setState({ nickname_checked: true });

    wrapper.simulate('click');
    expect(spySignup).toHaveBeenCalledTimes(1);
  });
});
