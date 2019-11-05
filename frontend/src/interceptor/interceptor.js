import axios from 'axios';
import * as actionCreators from '../store/actions/index';

/*
interceptor.request() : Setting header for the authentication when there is token exist.
interceptor.response() : Checking the authenticaion to block
                         the unlogined user to access other pages.
*/
export default {
  setupInterceptors: (store) => {
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `JWT ${localStorage.getItem('token')}`;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );
    // Add a response interceptor
    axios.interceptors.response.use((response) => {
      return response;
    }, (error) => {
      if (error.response.status === 401) {
        localStorage.clear();
        store.dispatch(actionCreators.logout());
      }
      return Promise.reject(error);
    });
  },
};
