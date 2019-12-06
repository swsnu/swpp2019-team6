import React from 'react';
import { shallow, mount } from 'enzyme';
import UserInfoSection from './UserInfoSection';

const tempUser = {
  id: 1,
  nickname: 'iluvswpp',
  register_date: '2019.10.10',
  status_message: 'Pharetra diam sit amet nisl suscipit adipiscing bibendum est. Imperdiet dui accumsan sit amet nulla facilisi morbi. Sagittis orci a scelerisque purus semper eget.',
  num_plans: 4,
  num_likes: 45,
  num_forked: 3,
  user_photo: '/images/13.jpeg',
};


describe('UserInfoSection', () => {
  let userInfoSection;

  it('should render - ismypage: false', () => {
    userInfoSection = (
      <UserInfoSection
        user={tempUser}
        is_mypage={false}
      />
    );
    const component = mount(userInfoSection);
    expect(component.find('button').length).toBe(0);
  });

  it('should render - ismypage: true', () => {
    userInfoSection = (
      <UserInfoSection
        user={tempUser}
        is_mypage
      />
    );
    const component = mount(userInfoSection);
    expect(component.find('button').length).toBe(1);
  });
});
