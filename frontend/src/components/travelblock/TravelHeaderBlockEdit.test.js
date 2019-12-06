import React from 'react';
import { shallow } from 'enzyme';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

import TravelHeaderBlockEdit from './TravelHeaderBlockEdit';
import DatePickerWrapper from '../common/DatePicker';

import '../../setupTests';

describe('<TravelHeaderBlockEdit />', () => {
  let header;
  let setHeader;
  let handlePeriodChange;

  beforeEach(() => {
    header = {
      startDate: new Date(),
      endDate: new Date(),
      title: 'TEST',
    };
    setHeader = jest.fn();
    handlePeriodChange = jest.fn();
  });

  it('should render without errors', () => {
    const component = shallow(<TravelHeaderBlockEdit
      header={header}
      setHeader={setHeader}
      handlePeriodChange={handlePeriodChange}
    />);
    const wrapperCard = component.find(Card);
    expect(wrapperCard.length).toBe(1);
    const wrapperPaper = component.find(FormControl);
    expect(wrapperPaper.length).toBe(1);
  });

  it('should change date', () => {
    const component = shallow(<TravelHeaderBlockEdit
      header={header}
      setHeader={setHeader}
      handlePeriodChange={handlePeriodChange}
    />);
    const wrapperDatePicker = component.find(DatePickerWrapper);
    expect(wrapperDatePicker.length).toBe(2);
    wrapperDatePicker.at(0).simulate('change', { target: { value: '2000-01-01T00:00:00' } });
    wrapperDatePicker.at(1).simulate('change', { target: { value: '2000-01-01T00:00:00' } });
    expect(handlePeriodChange).toHaveBeenCalledTimes(2);
    expect(setHeader).toHaveBeenCalledTimes(2);
  });

  it('should change title', () => {
    const component = shallow(<TravelHeaderBlockEdit
      header={header}
      setHeader={setHeader}
      handlePeriodChange={handlePeriodChange}
    />);
    const InputWrapper = component.find(Input);
    expect(InputWrapper.length).toBe(1);
    InputWrapper.simulate('change', { target: { value: 'TITLE' } });
    expect(setHeader).toHaveBeenCalledTimes(1);
  });
});
