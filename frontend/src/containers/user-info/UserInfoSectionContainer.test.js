import React from 'react';
import { shallow, mount } from 'enzyme';
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


describe('SearchTravelOverviewList', () => {
  let userTravelOverviewList;

  beforeEach(() => {
    userTravelOverviewList = (
      <UserInfoSectionContainer />
    );
  });

  it('should render.', () => {
    const component = mount(userTravelOverviewList);
    expect(component.find('.userInfoSection').length).toBe(1);
  });
});
