import React from 'react';
import { shallow } from 'enzyme';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import TravelTransportationBlockEdit from './TravelTransportationBlockEdit';
import '../../setupTests';

describe('<TravelTransportationBlockEdit />', () => {
  it('should render without errors', () => {
    const component = shallow(<TravelTransportationBlockEdit />);
    const wrapperCard = component.find(Card);
    expect(wrapperCard.length).toBe(1);
  });
});
