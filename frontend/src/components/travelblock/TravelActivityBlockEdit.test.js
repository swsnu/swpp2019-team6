import React from 'react';
import { shallow } from 'enzyme';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardHeader from '@material-ui/core/CardHeader';
import TravelActivityBlockEdit from './TravelActivityBlockEdit';

import '../../setupTests';

describe('<TravelActivityBlockEdit />', () => {
  it('should render without errors', () => {
    const component = shallow(<TravelActivityBlockEdit />);
    const wrapperCard = component.find(Card);
    expect(wrapperCard.length).toBe(1);
  });
});
