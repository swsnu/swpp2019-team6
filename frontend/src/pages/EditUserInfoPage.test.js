import React from 'react';
import { shallow, mount } from 'enzyme';
import EditUserInfoPage from './EditUserInfoPage';

describe('EditUserInfoPage', () => {
  it('should render.', () => {
    const component = shallow(<EditUserInfoPage match={{ params: { nickname: 'iluvswpp' } }} />);
    expect(component.find('.editUserInfoPage').length).toBe(1);
  });
});
