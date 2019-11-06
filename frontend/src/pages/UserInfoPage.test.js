import React from 'react';
import { shallow, mount } from 'enzyme';
import UserInfoPage from './UserInfoPage';

describe('UserInfoPage', () => {
  it('should render.', () => {
    const component = shallow(<UserInfoPage match={{ params: { nickname: 'iluvswpp' } }} />);
    expect(component.find('.userInfoPage').length).toBe(1);
  });
});
