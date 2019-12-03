import React from 'react';
import { shallow } from 'enzyme';
import Card from '@material-ui/core/Card';

import TravelRemoveBlock from './TravelRemoveBlock';
import '../../setupTests';

describe('<TravelRemoveBlock />', () => {
  it('should render without errors', () => {
    const component = shallow(<TravelRemoveBlock />);
    const wrapperCard = component.find(Card);
    expect(wrapperCard.length).toBe(1);
  });
});
