import React from 'react';
import { shallow } from 'enzyme';
import SignupPage from './SignupPage';


describe('<SignupPage />', () => {
  it('should render SignupPage without errors', () => {
    const component = shallow(<SignupPage />);
    const wrapper = component.find('.SignupPage');
    expect(wrapper.length).toBe(1);
  });
});
