import React from 'react';
import { shallow, mount } from 'enzyme';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TravelDayBlockView from './TravelDayBlockView';
import '../../setupTests';

describe('<TravelDayBlockView />', () => {
  let item;

  beforeEach(() => {
    item = {
      title: 'TEST',
      day: '1900-01-01',
    };
  });

  it('should render without errors', () => {
    const component = shallow(<TravelDayBlockView item={item} />);
    const wrapperCard = component.find(Card);
    expect(wrapperCard.length).toBe(1);
  });

  it('should print datetime', () => {
    const component = shallow(<TravelDayBlockView item={item} />);
    const wrapperTypography = component.find(Typography);
    expect(wrapperTypography.at(0).text()).toBe(item.day);
  });

  it('should print title', () => {
    const component = shallow(<TravelDayBlockView item={item} />);
    const wrapperTypography = component.find(Typography);
    expect(wrapperTypography.at(1).text()).toBe(item.title);
  });
});
