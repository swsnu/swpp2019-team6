import React from 'react';
import { shallow, mount } from 'enzyme';
import AuthForm from './AuthForm';


const type = 'signup';
const form = {
  email: '',
  password: '',
};
const mockOnChange = jest.fn();
const mockOnSubmit = jest.fn();
const error = null;

describe('AuthForm', () => {
  let authForm;

  beforeEach(() => {
    authForm = (
      <AuthForm
        type={type}
        form={form}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        error={null}
      />
    );
  });

  it('should render.', () => {
    const component = shallow(authForm);
    expect(component.find('h3').length).toBe(1);
  });
});
