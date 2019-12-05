import React from 'react';
import { shallow } from 'enzyme';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

import TravelHeaderBlockEdit from './TravelHeaderBlockEdit';
import DatePickerWrapper from '../common/DatePicker';

import '../../setupTests';

describe('<TravelHeaderBlockEdit />', () => {
  it('should render without errors', () => {
    const component = shallow(<TravelHeaderBlockEdit />);
    const wrapperCard = component.find(Card);
    expect(wrapperCard.length).toBe(1);
    const wrapperPaper = component.find(FormControl);
    expect(wrapperPaper.length).toBe(1);
  });

  // it('should change date', () => {
  //   const handlePeriodChange = jest.fn();
  //   const setStartDate = jest.fn();
  //   const setEndDate = jest.fn();
  //   const component = shallow(<TravelHeaderBlockEdit
  //     handlePeriodChange={handlePeriodChange}
  //     setStartDate={setStartDate}
  //     setEndDate={setEndDate}
  //   />);
  //   const wrapperDatePicker = component.find(DatePickerWrapper);
  //   expect(wrapperDatePicker.length).toBe(2);
  //   wrapperDatePicker.at(0).simulate('change', { target: { value: '2000-01-01T00:00:00' } });
  //   wrapperDatePicker.at(1).simulate('change', { target: { value: '2000-01-01T00:00:00' } });
  //   expect(handlePeriodChange).toHaveBeenCalledTimes(2);
  //   expect(setStartDate).toHaveBeenCalledTimes(1);
  //   expect(setEndDate).toHaveBeenCalledTimes(1);
  // });

  // it('should change title', () => {
  //   const setTravelTitle = jest.fn();
  //   const component = shallow(<TravelHeaderBlockEdit setTravelTitle={setTravelTitle} />);
  //   const InputWrapper = component.find(Input);
  //   expect(InputWrapper.length).toBe(1);
  //   InputWrapper.simulate('change', { target: { value: 'TITLE' } });
  //   expect(setTravelTitle).toHaveBeenCalledTimes(1);
  // });
});
