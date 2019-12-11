import React from 'react';
import { shallow, mount } from 'enzyme';
import UserInfoPage from './UserInfoPage';

jest.mock('../containers/common/HeaderContainer', () => {
  return jest.fn((props) => {
    return (
      <div className="headerContainer" />
    );
  });
});

jest.mock('../containers/user-info/UserInfoSectionContainer', () => {
  return jest.fn((props) => {
    return (
      <div className="UserInfoSectionContainer" />
    );
  });
});

jest.mock('../containers/travel-overview/UserTravelOverviewList', () => {
  return jest.fn((props) => {
    return (
      <div className="UserTravelOverviewList" />
    );
  });
});


jest.mock('../containers/travel-overview/CollaboratorTravelOverviewList', () => {
  return jest.fn((props) => {
    return (
      <div className="CollaboratorTravelOverviewList" />
    );
  });
});


localStorage.setItem('user', JSON.stringify({
  id: 1,
  email: 'test@test.com',
  nickname: 'test',
  status_message: 'test message',
}));

describe('UserInfoPage', () => {
  it('should render. - when not mypage', () => {
    const component = mount(<UserInfoPage match={{ params: { id: '1' } }} />);
    expect(component.find('.userInfoPage').length).toBe(1);
  });


  it('should render. - when not mypage', () => {
    const component = mount(<UserInfoPage match={{ params: { id: '1' } }} />);
    component.setState({ is_mypage: true });
    // const instance = component.instance();
    expect(component.find('.userInfoPage').length).toBe(1);
  });
});
