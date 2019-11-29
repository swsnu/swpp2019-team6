import React from 'react';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import TravelBlockExpandButton from './TravelBlockExpandButton';

describe('<TravelBlockExpandButton />', () => {
  it('should render without errors', () => {
    const component = shallow(<TravelBlockExpandButton />);
    const wrapperPaper = component.find(IconButton);
    expect(wrapperPaper.length).toBe(1);
  });
});
