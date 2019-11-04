import React from 'react';
import { shallow, mount } from 'enzyme';
import MainPage from './MainPage';


jest.mock('../containers/common/HeaderContainer', () => {
  return jest.fn((props) => {
    return (
      <div className="headerContainer" />
    );
  });
});


jest.mock('../containers/travel-overview/PopularTravelOverviewList', () => {
  return jest.fn((props) => {
    return (
      <div className="popularTravelOverviewList" />
    );
  });
});

jest.mock('../containers/travel-overview/RecentTravelOverviewList', () => {
  return jest.fn((props) => {
    return (
      <div className="recentTravelOverviewList" />
    );
  });
});


describe('MainPage', () => {
  it('should render.', () => {
    const component = shallow(<MainPage />);
    expect(component.find('.mainPage').length).toBe(1);
  });
});
