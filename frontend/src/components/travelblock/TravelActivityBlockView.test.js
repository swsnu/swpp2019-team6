import React from 'react';
import { shallow, mount } from 'enzyme';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TravelActivityBlockView from './TravelActivityBlockView';
import '../../setupTests';

describe('<TravelActivityBlockView />', () => {
  let item;

  beforeEach(() => {
    item = {
      title: 'TEST',
      description: 'DESCRIPTION',
      start_location: 'START',
      end_location: 'END',
      time: '00-00',
      block_type: 'ACM',
    };
  });

  it('should render without errors', () => {
    const component = shallow(<TravelActivityBlockView item={item} />);
    const wrapperCard = component.find(Card);
    expect(wrapperCard.length).toBe(1);
  });

  it('should print time', () => {
    const component = shallow(<TravelActivityBlockView item={item} />);
    const wrapperTypography = component.find(Typography);
    expect(wrapperTypography.at(1).text()).toBe(item.time);
  });

  it('should print title', () => {
    const component = shallow(<TravelActivityBlockView item={item} />);
    const wrapperTypography = component.find(Typography);
    expect(wrapperTypography.at(2).text()).toBe(item.title);
  });

  it('should print description', () => {
    const component = shallow(<TravelActivityBlockView item={item} />);
    const wrapperTypography = component.find(Typography);
    expect(wrapperTypography.at(3).text()).toBe(item.description);
  });

  it('should print start_location', () => {
    const component = shallow(<TravelActivityBlockView item={item} />);
    const wrapperTypography = component.find(Typography);
    expect(wrapperTypography.at(4).text()).toBe(item.start_location);
  });

  it('should print end_location', () => {
    const component = shallow(<TravelActivityBlockView item={item} />);
    const wrapperTypography = component.find(Typography);
    expect(wrapperTypography.at(5).text()).toBe(item.end_location);
  });

  it('should print CUS block_type', () => {
    item.block_type = 'CUS';
    const component = shallow(<TravelActivityBlockView item={item} />);
    const wrapperTypography = component.find(Typography);
    expect(wrapperTypography.at(0).text()).toBe('CUSTOM');
  });

  it('should print ACT block_type', () => {
    item.block_type = 'ACT';
    const component = shallow(<TravelActivityBlockView item={item} />);
    const wrapperTypography = component.find(Typography);
    expect(wrapperTypography.at(0).text()).toBe('ACTIVITY');
  });

  it('should print ACM block_type', () => {
    item.block_type = 'ACM';
    const component = shallow(<TravelActivityBlockView item={item} />);
    const wrapperTypography = component.find(Typography);
    expect(wrapperTypography.at(0).text()).toBe('ACCOMODATION');
  });

  it('should print TRN block_type', () => {
    item.block_type = 'TRN';
    const component = shallow(<TravelActivityBlockView item={item} />);
    const wrapperTypography = component.find(Typography);
    expect(wrapperTypography.at(0).text()).toBe('TRANSPORTATION');
  });

  it('should print RST block_type', () => {
    item.block_type = 'RST';
    const component = shallow(<TravelActivityBlockView item={item} />);
    const wrapperTypography = component.find(Typography);
    expect(wrapperTypography.at(0).text()).toBe('RESTAURANT');
  });

  it('should print DEFAULT block_type', () => {
    item.block_type = 'UNDEFINED';
    const component = shallow(<TravelActivityBlockView item={item} />);
    const wrapperTypography = component.find(Typography);
    expect(wrapperTypography.at(0).text()).toBe('UNDEFINED');
  });
});
