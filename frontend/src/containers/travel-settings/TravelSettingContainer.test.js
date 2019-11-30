import React from 'react';
import { shallow, mount } from 'enzyme';
import TravelSettingContainer from './TravelSettingContainer';

describe('TravelSettingContainer', () => {
  let travelSettingContainer;

  beforeEach(() => {
    travelSettingContainer = (
      <TravelSettingContainer />
    );
  });

  it('should render.', () => {
    const component = mount(travelSettingContainer);
    expect(component.find('.travelSettingContainer').length).toBe(1);
  });
});
