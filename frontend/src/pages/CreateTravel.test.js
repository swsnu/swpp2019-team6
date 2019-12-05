import React from 'react';
import { shallow } from 'enzyme';
import CreateTravelPage from './CreateTravel';


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


describe('CreateTravel', () => {
  it('should render.', () => {
    const component = shallow(<CreateTravelPage />);
    expect(component.find('.CreateTravel').length).toBe(1);
  });
});
