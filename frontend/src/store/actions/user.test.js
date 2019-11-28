import axios from 'axios';

import * as actionCreators from './user';
import store from '../store';

const stubUser = {
  id: 1,
  email: 'email',
  password: 'password',
  nickname: 'nickname',
};


describe('ActionCreators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('signup should post userInfo correctly', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, userInfo) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubUser,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.signup(stubUser)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('signup catch error when response error', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, user_info, headers) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 400,
          };
          resolve(result);
        });
      });
    store.dispatch(actionCreators.signup(stubUser)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('should get user info', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubUser,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getUser(stubUser)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
