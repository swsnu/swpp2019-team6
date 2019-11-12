import React from 'react';
import { shallow } from 'enzyme';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

import TravelCustomBlockEdit from './TravelCustomBlockEdit';
import TimePickerWrapper from '../common/TimePicker';

import '../../setupTests';

describe('<TravelCustomBlockEdit />', () => {
  it('should render without errors', () => {
    const component = shallow(<TravelCustomBlockEdit />);
    const wrapperCard = component.find(Card);
    expect(wrapperCard.length).toBe(1);
    const wrapperPaper = component.find(FormControl);
    expect(wrapperPaper.length).toBe(1);
  });

  it('should change time', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const component = shallow(<TravelCustomBlockEdit />);
    const wrapperTimePicker = component.find(TimePickerWrapper);
    expect(wrapperTimePicker.length).toBe(2);
    wrapperTimePicker.at(0).simulate('change', { target: { value: '2000-01-01T00:00:00' } });
    wrapperTimePicker.at(1).simulate('change', { target: { value: '2000-01-01T00:00:00' } });
    expect(setState).toHaveBeenCalledTimes(2);
  });

  it('should change title', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const component = shallow(<TravelCustomBlockEdit />);
    const InputWrapper = component.find(Input);
    expect(InputWrapper.length).toBe(1);
    InputWrapper.simulate('change', { target: { value: 'TITLE' } });
    expect(setState).toHaveBeenCalledTimes(1);
  });
});
