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
      <div className="editTravel" />
    );
  });
});


describe('EditTravelPage', () => {
  it('should render.', () => {
    const component = shallow(<EditTravelPage />);
    expect(component.find('.editTravel').length).toBe(1);
  });
});
