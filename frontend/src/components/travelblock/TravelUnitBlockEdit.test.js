import React from 'react';
import { shallow } from 'enzyme';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import TravelUnitBlockEdit from './TravelUnitBlockEdit';
import '../../setupTests';

describe('<TravelUnitBlockEdit />', () => {
  it('should render without errors', () => {
    const component = shallow(<TravelUnitBlockEdit />);
    const wrapperCard = component.find(Card);
    expect(wrapperCard.length).toBe(1);
    const wrapperPaper = component.find(Paper);
    expect(wrapperPaper.length).toBe(2);
  });
  it('should request search', () => {
    const searchHandler = jest.fn();
    const component = shallow(<TravelUnitBlockEdit searchHandler={searchHandler} />);
    const button = component.find('#search');
    expect(button.length).toBe(2);
    button.at(0).simulate('click');
    button.at(1).simulate('click');
    expect(searchHandler).toHaveBeenCalledTimes(2);
  });
});
