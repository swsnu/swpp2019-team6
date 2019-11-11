import React from 'react';
import { shallow } from 'enzyme';
import Paper from '@material-ui/core/Paper';
import GoogleMapSearch from './GoogleMapSearch';
import '../../setupTests';

describe('<GoogleMapSearch />', () => {
  it('should render without errors', () => {
    const component = shallow(<GoogleMapSearch />);
    const wrapperPaper = component.find(Paper);
    expect(wrapperPaper.length).toBe(1);
  });
  it('should request search', () => {
    const searchHandler = jest.fn();
    const component = shallow(<GoogleMapSearch searchHandler={searchHandler} />);
    const button = component.find('#search');
    expect(button.length).toBe(1);
    button.simulate('click');
    expect(searchHandler).toHaveBeenCalledTimes(1);
  });
});
