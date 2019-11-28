import axios from 'axios';
// import * as router from 'connected-react-router';

import * as actionCreators from './auth';
import store from '../store';

const stubUser = {
  id: 1,
  email: 'test1@test.io',
  nickname: 'testuser',
  status_message: '',
};

describe('ActionCreators : login', () => {
  let spyAxiosPost;
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('\'loginRequest\' Fail', (done) => {
    const stubLoginInfo = { email: 'wrong@wrong.io', password: 'wrong' };

    spyAxiosPost = jest.spyOn(axios, 'post')
      .mockImplementation((url, user) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 400,
          };
          reject(result);
        });
      });

    const spyAlert = jest.spyOn(window, 'alert')
      .mockImplementation(() => {});

    store.dispatch(actionCreators.login(stubLoginInfo)).then(() => {
      const newState = store.getState();
      expect(newState.auth.user).toBeFalsy();
      expect(newState.auth.token).toBeFalsy();
      expect(spyAlert).toBeCalled();
      expect(spyAxiosPost).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'loginRequest\' should change login status and user status correctly', (done) => {
    const stubLoginInfo = { email: 'test1@test.io', password: 'test' };

    spyAxiosPost = jest.spyOn(axios, 'post')
      .mockImplementation((url, user) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: {
              token: '123',
              user: stubUser,
            },
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.login(stubLoginInfo)).then(() => {
      const newState = store.getState();
      expect(newState.auth.user).toEqual(stubUser);
      expect(newState.auth.token).toEqual('123');
      expect(spyAxiosPost).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'logoutRequest\' should change login status and user status correctly', (done) => {
    store.dispatch(actionCreators.logout());
    const newState = store.getState();
    expect(newState.auth.user).toBeFalsy();
    expect(newState.auth.token).toBeFalsy();
    done();
  });
});
