import React from 'react';
import { shallow } from 'enzyme';
import {
  TimePicker,
} from '@material-ui/pickers';
import TimePickerWrapper from './TimePicker';
import '../../setupTests';

describe('<TimePickerWrapper />', () => {
  it('should render without errors', () => {
    const component = shallow(<TimePickerWrapper />);
    const wrapperPaper = component.find(TimePicker);
    expect(wrapperPaper.length).toBe(1);
  });
  it('should change DateTime', () => {
    const handleTime = jest.fn();
    const wrapper = shallow(<TimePickerWrapper
      label="TEST"
      onChange={handleTime}
      value="20200101"
    />);
    wrapper.simulate('change', '2020-01-01T09:00:00');
    expect(handleTime).toBeCalledWith('2020-01-01T09:00:00');
  });
});
