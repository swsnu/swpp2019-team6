import React from 'react';
import { shallow } from 'enzyme';
import EditTravelPage from './EditTravel';


jest.mock('../containers/common/HeaderContainer', () => {
  return jest.fn((props) => {
    return (
      <div className="headerContainer" />
    );
  });
});

jest.mock('../containers/createTravel/CreateTravel', () => {
  return jest.fn((props) => {
    return (
      <div className="createTravel" />
    );
  });
});


describe('EditTravelPage', () => {
  it('should render.', () => {
    const component = shallow(<EditTravelPage />);
    expect(component.find('.CreateTravel').length).toBe(1);
  });
});
