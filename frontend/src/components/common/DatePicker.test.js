import React from 'react';
import { shallow } from 'enzyme';
import {
  DatePicker,
} from '@material-ui/pickers';
import DatePickerWrapper from './DatePicker';
import '../../setupTests';

describe('<DatePickerWrapper />', () => {
  it('should render without errors', () => {
    const component = shallow(<DatePickerWrapper />);
    const wrapperPaper = component.find(DatePicker);
    expect(wrapperPaper.length).toBe(1);
  });
  it('should change DateTime', () => {
    const handleDate = jest.fn();
    const wrapper = shallow(<DatePickerWrapper
      label="TEST"
      onChange={handleDate}
      value="20200101"
    />);
    wrapper.simulate('change', '19600101');
    expect(handleDate).toBeCalledWith('19600101');
  });
});
