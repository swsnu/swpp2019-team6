import React from 'react';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import TravelBlockCloseButton from './TravelBlockCloseButton';

describe('<TravelBlockCloseButton />', () => {
  it('should render without errors', () => {
    const component = shallow(<TravelBlockCloseButton />);
    const wrapperPaper = component.find(IconButton);
    expect(wrapperPaper.length).toBe(1);
  });
  it('should click response', () => {
    const removeHandler = jest.fn();
    const wrapper = shallow(<TravelBlockCloseButton
      removeHandler={removeHandler}
    />);
    wrapper.simulate('click');
    expect(removeHandler).toBeCalledTimes(1);
  });
});
