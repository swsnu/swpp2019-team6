import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import axios from 'axios';
import EditUserInfoContainer from './EditUserInfoContainer';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as userActionCreators from '../../store/actions/user';

const stubInitialUser = {
  user: {
    id: 1,
    email: 'test@test.com',
    nickname: 'test',
    status_message: 'test message',
    profile_photo: 'test.jpg',
  },
};

const mockStore = getMockStore(stubInitialUser, {}, {});

describe('EditUserInfoContainer', () => {
  let editUserInfoContainer;
  let spygetUser;
  let spyAxiosGet;
  let spyAxiosPut;

  beforeEach(() => {
    editUserInfoContainer = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <EditUserInfoContainer />
        </ConnectedRouter>
      </Provider>
    );
    spygetUser = jest.spyOn(userActionCreators, 'getUser')
      .mockImplementation(() => { return (dispatch) => {}; });


    spyAxiosGet = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: {
              id: 2,
              nickname: 'test',
              check: true,
            },
          };
          resolve(result);
        });
      });

    spyAxiosPut = jest.spyOn(axios, 'put')
      .mockImplementation((url, data, headers) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: {
              id: 2,
            },
          };
          resolve(result);
        });
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render nothing', () => {
    const component = mount(
      <Provider store={getMockStore({}, {}, {})}>
        <ConnectedRouter history={history}>
          <EditUserInfoContainer />
        </ConnectedRouter>
      </Provider>,
    );
    expect(component.find('.editUserInfo').length).toBe(0);
  });

  it('should render.', () => {
    const component = mount(editUserInfoContainer);
    expect(component.find('.editUserInfo').length).toBe(1);
    component.unmount();
  });

  it('should handle clicks. - when all the requests succeed', () => {
    spyAxiosGet = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: {
              id: 2,
              nickname: 'test',
              check: true,
            },
          };
          resolve(result);
        });
      });

    spyAxiosPut = jest.spyOn(axios, 'put')
      .mockImplementation((url, data, headers) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: {
              id: 2,
            },
          };
          resolve(result);
        });
      });

    const component = mount(editUserInfoContainer);
    const passwordChangeButton = component.find('#passwordChangeButton');
    passwordChangeButton.at(0).simulate('click');
    const nicknameChangeButton = component.find('#nicknameChangeButton');
    nicknameChangeButton.at(0).simulate('click');
    const messageChangeButton = component.find('#messageChangeButton');
    messageChangeButton.at(0).simulate('click');

    const imageInput = component.find('#icon-button-file').find('input');
    const blob = new Blob(['foo'], { type: 'image/png' });
    imageInput.simulate('change', { target: { files: [blob] } });
    const child = component.find('EditUserInfoContainer');
    child.setState({
      profilePhotoChanged: true,
      profilePhoto: new Blob(['foo'], { type: 'image/png', name: 'test.png' }),
    });
    const profileConfirmButton = component.find('#profilePhotoConfirmButton').find('button');
    profileConfirmButton.simulate('click');

    const currentPasswordField = component.find('#currentPasswordField').find('input');
    currentPasswordField.simulate('change', { target: { value: 'test' } });
    const newPasswordField = component.find('#newPasswordField').find('input');
    newPasswordField.simulate('change', { target: { value: 'test' } });
    const confirmNewPasswordField = component.find('#confirmNewPasswordField').find('input');
    confirmNewPasswordField.simulate('change', { target: { value: 'test' } });
    const newNicknameField = component.find('#newNicknameField').find('input');
    newNicknameField.simulate('change', { target: { value: 'test' } });
    const newMessageField = component.find('#newMessageField').find('textarea').at(0);
    newMessageField.simulate('change', { target: { value: 'test' } });

    const passwordCancelButton = component.find('#passwordCancelButton');
    passwordCancelButton.at(0).simulate('click');
    const nicknameCancelButton = component.find('#nicknameCancelButton');
    nicknameCancelButton.at(0).simulate('click');
    const messageCancelButton = component.find('#messageCancelButton');
    messageCancelButton.at(0).simulate('click');

    const passwordChangeButton2 = component.find('#passwordChangeButton');
    passwordChangeButton2.at(0).simulate('click');
    const nicknameChangeButton2 = component.find('#nicknameChangeButton');
    nicknameChangeButton2.at(0).simulate('click');
    const messageChangeButton2 = component.find('#messageChangeButton');
    messageChangeButton2.at(0).simulate('click');


    currentPasswordField.simulate('change', { target: { value: 'test' } });
    newPasswordField.simulate('change', { target: { value: 'test' } });
    confirmNewPasswordField.simulate('change', { target: { value: 'test' } });
    newNicknameField.simulate('change', { target: { value: 'test' } });
    newMessageField.simulate('change', { target: { value: 'test' } });

    const passwordConfirmButton = component.find('#passwordConfirmButton');
    passwordConfirmButton.at(0).simulate('click');
    const nicknameConfirmButton = component.find('#nicknameConfirmButton');
    nicknameConfirmButton.at(0).simulate('click');
    const messageConfirmButton = component.find('#messageConfirmButton');
    messageConfirmButton.at(0).simulate('click');

    expect(component.find('.editUserInfo').length).toBe(1);
  });

  it('should handle clicks. - when all the requsets fail', () => {
    spyAxiosGet = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 400,
            data: {
              id: 2,
              nickname: 'test',
              check: true,
            },
          };
          reject(result);
        });
      });

    spyAxiosPut = jest.spyOn(axios, 'put')
      .mockImplementation((url, data, headers) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 400,
            data: {
              id: 2,
            },
          };
          reject(result);
        });
      });

    const component = mount(editUserInfoContainer);
    const passwordChangeButton = component.find('#passwordChangeButton');
    passwordChangeButton.at(0).simulate('click');
    const nicknameChangeButton = component.find('#nicknameChangeButton');
    nicknameChangeButton.at(0).simulate('click');
    const messageChangeButton = component.find('#messageChangeButton');
    messageChangeButton.at(0).simulate('click');
    const imageInput = component.find('#icon-button-file').find('input');

    const blob = new Blob(['foo'], { type: 'image/png' });
    imageInput.simulate('change', { target: { files: [blob] } });
    const child = component.find('EditUserInfoContainer');
    child.setState({
      profilePhotoChanged: true,
      profilePhoto: new Blob(['foo'], { type: 'image/png', name: 'test.png' }),
    });
    const profileConfirmButton = component.find('#profilePhotoConfirmButton').find('button');
    profileConfirmButton.simulate('click');

    const currentPasswordField = component.find('#currentPasswordField').find('input');
    currentPasswordField.simulate('change', { target: { value: 'test' } });
    const newPasswordField = component.find('#newPasswordField').find('input');
    newPasswordField.simulate('change', { target: { value: 'test' } });
    const confirmNewPasswordField = component.find('#confirmNewPasswordField').find('input');
    confirmNewPasswordField.simulate('change', { target: { value: 'test' } });
    const newNicknameField = component.find('#newNicknameField').find('input');
    newNicknameField.simulate('change', { target: { value: 'test' } });
    const newMessageField = component.find('#newMessageField').find('textarea').at(0);
    newMessageField.simulate('change', { target: { value: 'test' } });

    const passwordConfirmButton = component.find('#passwordConfirmButton');
    passwordConfirmButton.at(0).simulate('click');
    const nicknameConfirmButton = component.find('#nicknameConfirmButton');
    nicknameConfirmButton.at(0).simulate('click');
    const messageConfirmButton = component.find('#messageConfirmButton');
    messageConfirmButton.at(0).simulate('click');

    expect(component.find('.editUserInfo').length).toBe(1);
  });

  it('should handle clicks. some other cases. - when all the requests succeed', () => {
    spyAxiosGet = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: {
              id: 2,
              nickname: 'test',
              check: false,
            },
          };
          resolve(result);
        });
      });

    spyAxiosPut = jest.spyOn(axios, 'put')
      .mockImplementation((url, data, headers) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: {
              id: 2,
            },
          };
          resolve(result);
        });
      });

    const component = mount(editUserInfoContainer);
    const passwordChangeButton = component.find('#passwordChangeButton');
    passwordChangeButton.at(0).simulate('click');
    const nicknameChangeButton = component.find('#nicknameChangeButton');
    nicknameChangeButton.at(0).simulate('click');
    const messageChangeButton = component.find('#messageChangeButton');
    messageChangeButton.at(0).simulate('click');

    const profileConfirmButton = component.find('#profilePhotoConfirmButton').find('button');
    profileConfirmButton.simulate('click');

    const currentPasswordField = component.find('#currentPasswordField').find('input');
    currentPasswordField.simulate('change', { target: { value: 'fdsf' } });
    const newPasswordField = component.find('#newPasswordField').find('input');
    newPasswordField.simulate('change', { target: { value: 'fefs' } });
    const confirmNewPasswordField = component.find('#confirmNewPasswordField').find('input');
    confirmNewPasswordField.simulate('change', { target: { value: 'zvxcv' } });
    const newNicknameField = component.find('#newNicknameField').find('input');
    newNicknameField.simulate('change', { target: { value: 'test' } });
    const newMessageField = component.find('#newMessageField').find('textarea').at(0);
    newMessageField.simulate('change', { target: { value: 'egs' } });

    currentPasswordField.simulate('change', { target: { value: 'fdsf' } });
    newPasswordField.simulate('change', { target: { value: 'fefs' } });
    confirmNewPasswordField.simulate('change', { target: { value: 'zvxcv' } });
    newNicknameField.simulate('change', { target: { value: 'test' } });
    newMessageField.simulate('change', { target: { value: 'egs' } });

    const passwordConfirmButton = component.find('#passwordConfirmButton');
    passwordConfirmButton.at(0).simulate('click');
    const nicknameConfirmButton = component.find('#nicknameConfirmButton');
    nicknameConfirmButton.at(0).simulate('click');
    const messageConfirmButton = component.find('#messageConfirmButton');
    messageConfirmButton.at(0).simulate('click');

    expect(component.find('.editUserInfo').length).toBe(1);
  });


  it('should handle clicks. some other cases2. - when all the requests succeed', () => {
    spyAxiosGet = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: {
              id: 2,
              nickname: 'test',
              check: false,
            },
          };
          resolve(result);
        });
      });

    spyAxiosPut = jest.spyOn(axios, 'put')
      .mockImplementation((url, data, headers) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: {
              id: 2,
            },
          };
          resolve(result);
        });
      });

    const component = mount(editUserInfoContainer);
    const passwordChangeButton = component.find('#passwordChangeButton');
    passwordChangeButton.at(0).simulate('click');
    const nicknameChangeButton = component.find('#nicknameChangeButton');
    nicknameChangeButton.at(0).simulate('click');
    const messageChangeButton = component.find('#messageChangeButton');
    messageChangeButton.at(0).simulate('click');

    const profileConfirmButton = component.find('#profilePhotoConfirmButton').find('button');
    profileConfirmButton.simulate('click');

    const currentPasswordField = component.find('#currentPasswordField').find('input');
    const newPasswordField = component.find('#newPasswordField').find('input');
    const confirmNewPasswordField = component.find('#confirmNewPasswordField').find('input');
    const newNicknameField = component.find('#newNicknameField').find('input');
    const newMessageField = component.find('#newMessageField').find('textarea').at(0);

    currentPasswordField.simulate('change', { target: { value: '' } });
    newPasswordField.simulate('change', { target: { value: '' } });
    confirmNewPasswordField.simulate('change', { target: { value: '' } });
    newNicknameField.simulate('change', { target: { value: '' } });
    newMessageField.simulate('change', { target: { value: '' } });

    const passwordConfirmButton = component.find('#passwordConfirmButton');
    passwordConfirmButton.at(0).simulate('click');
    const nicknameConfirmButton = component.find('#nicknameConfirmButton');
    nicknameConfirmButton.at(0).simulate('click');
    const messageConfirmButton = component.find('#messageConfirmButton');
    messageConfirmButton.at(0).simulate('click');

    expect(component.find('.editUserInfo').length).toBe(1);
  });
});
/*
Fields list
passwordConfirmButton
passwordCancelButton
passwordChangeButton
nicknameConfirmButton
nicknameCancelButton
nicknameChangeButton
messageConfirmButton
messageCancelButton
messageChangeButton
currentPasswordField
newPasswordField
confirmNewPasswordField
newNicknameField
newMessageField
*/
