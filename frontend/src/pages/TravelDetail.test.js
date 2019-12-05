import React from 'react';
import { shallow } from 'enzyme';
import TravelDetailPage from './TravelDetail';


jest.mock('../containers/common/HeaderContainer', () => {
  return jest.fn((props) => {
    return (
      <div className="headerContainer" />
    );
  });
});

jest.mock('../containers/travelDetail/TravelDetail', () => {
  return jest.fn((props) => {
    return (
      <div className="travelDetail" />
    );
  });
});


describe('TravelDetail Page', () => {
  it('should render.', () => {
    const component = shallow(<TravelDetailPage />);
    expect(component.find('.travelDetail').length).toBe(1);
  });
});
