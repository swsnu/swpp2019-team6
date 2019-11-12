import React from 'react';
import { shallow } from 'enzyme';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';

import TravelTransportationBlockEdit from './TravelTransportationBlockEdit';
import TimePickerWrapper from '../common/TimePicker';
import '../../setupTests';

describe('<TravelTransportationBlockEdit />', () => {
  it('should render without errors', () => {
    const component = shallow(<TravelTransportationBlockEdit />);
    const wrapperCard = component.find(Card);
    expect(wrapperCard.length).toBe(1);
  });

  it('should change time', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const component = shallow(<TravelTransportationBlockEdit />);
    const wrapperTimePicker = component.find(TimePickerWrapper);
    expect(wrapperTimePicker.length).toBe(2);
    wrapperTimePicker.at(0).simulate('change', { target: { value: '2000-01-01T00:00:00' } });
    wrapperTimePicker.at(1).simulate('change', { target: { value: '2000-01-01T00:00:00' } });
    expect(setState).toHaveBeenCalledTimes(2);
  });
});
