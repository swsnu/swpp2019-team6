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
    const wrapperPaper = component.find(Paper);
    expect(wrapperPaper.length).toBe(1);
  });
  it('should request search', () => {
    const searchHandler = jest.fn();
    const component = shallow(<TravelActivityBlockEdit searchHandler={searchHandler} />);
    const button = component.find('#search');
    expect(button.length).toBe(1);
    button.simulate('click');
    expect(searchHandler).toHaveBeenCalledTimes(1);
  });
  it('should render title', () => {
    const title = 'Activity';
    const component = shallow(<TravelActivityBlockEdit title={title} />);
    const header = component.find(CardHeader);
    expect(header.props().subheader).toBe(title);
  });
});
