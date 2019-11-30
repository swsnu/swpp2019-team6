import React from 'react';
import { shallow, mount } from 'enzyme';
import TravelSettingsPage from './TravelSettingsPage';

describe('UserInfoPage', () => {
  it('should render.', () => {
    const component = shallow(<TravelSettingsPage match={{ params: { id: '1' } }} />);
    expect(component.find('.TravelSettingsPage').length).toBe(1);
  });
});
