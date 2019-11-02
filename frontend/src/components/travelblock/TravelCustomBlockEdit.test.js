import React from 'react';
import { shallow } from 'enzyme';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import TravelCustomBlockEdit from './TravelCustomBlockEdit';

import '../../setupTests';

describe('<TravelCustomBlockEdit />', () => {
  it('should render without errors', () => {
    const component = shallow(<TravelCustomBlockEdit />);
    const wrapperCard = component.find(Card);
    expect(wrapperCard.length).toBe(1);
    const wrapperPaper = component.find(FormControl);
    expect(wrapperPaper.length).toBe(1);
  });
});