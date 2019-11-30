import React from 'react';
import { shallow, mount } from 'enzyme';
import OneTravelOverview from './OneTravelOverview';

describe('OneTravelOverview', () => {
  let oneTravelOverview;

  beforeEach(() => {
    oneTravelOverview = (
      <OneTravelOverview />
    );
  });

  it('should render.', () => {
    const component = mount(oneTravelOverview);
    expect(component.find('.oneTravelOverview').length).toBe(1);
  });
});
