import React from 'react';
import { shallow } from 'enzyme';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import TravelHeaderBlockEdit from './TravelHeaderBlockEdit';

import '../../setupTests';

describe('<TravelHeaderBlockEdit />', () => {
  it('should render without errors', () => {
    const component = shallow(<TravelHeaderBlockEdit />);
    const wrapperCard = component.find(Card);
    expect(wrapperCard.length).toBe(1);
    const wrapperPaper = component.find(FormControl);
    expect(wrapperPaper.length).toBe(1);
  });
});
