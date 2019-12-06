import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
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
  },
};

const mockStore = getMockStore(stubInitialUser, {}, {});

describe('EditUserInfoContainer', () => {
  let editUserInfoContainer;
  let spygetUser;

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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render.', () => {
    const component = mount(editUserInfoContainer);
    expect(component.find('.editUserInfo').length).toBe(1);
    component.unmount();
  });

  it('should handle clicks.', () => {
    const component = mount(editUserInfoContainer);
    const passwordChangeButton = component.find('#passwordChangeButton');
    passwordChangeButton.at(0).simulate('click');
    const nicknameChangeButton = component.find('#nicknameChangeButton');
    nicknameChangeButton.at(0).simulate('click');
    const messageChangeButton = component.find('#messageChangeButton');
    messageChangeButton.at(0).simulate('click');


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
