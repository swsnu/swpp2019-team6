import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import UserInfoSectionContainer from './UserInfoSectionContainer';

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


describe('UserInfoSectionContainer', () => {
  let userInfoSectionContainer;

  beforeEach(() => {
    userInfoSectionContainer = (
      <MemoryRouter initialEntries={['/user/1']}>
        <UserInfoSectionContainer />
      </MemoryRouter>

    );
  });

  it('should render.', () => {
    const component = mount(userInfoSectionContainer);
    expect(component.find('.userInfoSection').length).toBe(1);
  });
});
