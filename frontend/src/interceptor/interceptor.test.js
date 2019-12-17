import axios from 'axios';
import * as userActionCreators from '../store/actions/user';
import interceptor from './interceptor';

const client = interceptor.setupInterceptors({
  dispatch: () => {
    return null;
  },
});


describe('axios interceptor', () => {
  it('should get 200 response', () => {
    expect(axios.interceptors.response.handlers[0].fulfilled({ data: 'foo' }))
      .toMatchObject({ data: 'foo' });
  });

  it('should get 400 response', () => {
    expect(axios.interceptors.response.handlers[0].rejected({
      response: {
        statusText: 'NotFound',
        status: 404,
        data: { message: 'Page not found' },
      },
    })).rejects.toMatchObject({
      response: {
        statusText: 'NotFound',
        status: 404,
        data: { message: 'Page not found' },
      },
    });
  });

  it('should get 401 response', () => {
    const spy = jest.spyOn(userActionCreators, 'getUser')
      .mockImplementation(() => { return (dispatch) => {}; });
    expect(axios.interceptors.response.handlers[0].rejected({
      response: {
        status: 401,
        data: { message: 'Authorization' },
      },
    })).rejects.toHaveBeenCalled(spy);
  });

  it('should push 200 request', () => {
    localStorage.setItem('token', 'TEST');
    expect(axios.interceptors.request.handlers[0].fulfilled({ headers: {} }))
      .toMatchObject({ headers: { 'Content-Type': 'application/json' } });
  });

  it('should push 400 request', () => {
    axios.interceptors.request.handlers[0].rejected({
      response: {
        statusText: 'NotFound',
        status: 404,
        data: { message: 'Page not found' },
      },
    });
  });
});
