import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import EditUserInfoPage from './EditUserInfoPage';

import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import 'jest-localstorage-mock';

const stubInitialUser = {
  user: {
    id: 1,
    email: 'test@test.com',
    nickname: 'test',
    status_message: 'test message',
  },
};

const mockStore = getMockStore(stubInitialUser, {}, {});

jest.mock('../containers/common/HeaderContainer', () => {
  return jest.fn((props) => {
    return (
      <div className="headerContainer" />
    );
  });
});


jest.mock('../containers/user-info-edit/EditUserInfoContainer', () => {
  return jest.fn((props) => {
    return (
      <div className="EditUserInfoContainer" />
    );
  });
});

localStorage.setItem('user', JSON.stringify({
  id: 1,
  email: 'test@test.com',
  nickname: 'test',
  status_message: 'test message',
}));

describe('EditUserInfoPage', () => {
  let editUserInfoPage;
  beforeEach(() => {
    editUserInfoPage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <EditUserInfoPage
            match={{ params: { id: '1' } }}
          />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render.', () => {
    const component = mount(editUserInfoPage);
    expect(component.find('.editUserInfoPage').length).toBe(1);
  });

  it('should render error page.', () => {
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify({
      id: 8,
      email: 'test@test.com',
      nickname: 'test',
      status_message: 'test message',
    }));
    const component = mount(editUserInfoPage);
    expect(component.find('.editUserInfoPage').length).toBe(0);
  });

});
