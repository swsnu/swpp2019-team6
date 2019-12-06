import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';

import UserInfoSectionContainer from './UserInfoSectionContainer';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as userActionCreators from '../../store/actions/user';


jest.mock('../../components/user-info/UserInfoSection', () => {
  return jest.fn((props) => {
    return (
      <div className="userInfoSection">
        {props.is_mypage ? (
          <div>
            User info for my page
          </div>
        ) : (
          <div>
            User info for other users
          </div>
        )}
      </div>
    );
  });
});


const stubInitialUser = {
  user: {
    id: 1,
    email: 'test@test.com',
    nickname: 'test',
    status_message: 'test message',
  },
};

const mockStore = getMockStore(stubInitialUser, {}, {});

describe('UserInfoSectionContainer', () => {
  let userInfoSectionContainer;
  let spygetUser;

  beforeEach(() => {
    userInfoSectionContainer = (
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/user/1']} history={history}>
          <UserInfoSectionContainer />
        </MemoryRouter>
      </Provider>
    );
    spygetUser = jest.spyOn(userActionCreators, 'getUser')
      .mockImplementation(() => { return (dispatch) => {}; });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render.', () => {
    const component = mount(userInfoSectionContainer);
    expect(component.find('.userInfoSection').length).toBe(1);
  });
});
