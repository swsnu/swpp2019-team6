import React from 'react';
import { shallow } from 'enzyme';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginPage from './LoginPage';


describe('<LoginForm />', () => {
  it('should render LoginForm without errors', () => {
    const component = shallow(<LoginPage />);
    const wrapper = component.find(AuthTemplate);
    expect(wrapper.length).toBe(1);
  });
});
