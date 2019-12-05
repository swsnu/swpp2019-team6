import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import OneTravelOverview from './OneTravelOverview';

describe('OneTravelOverview', () => {
  let oneTravelOverview;

  beforeEach(() => {
    oneTravelOverview = (
      <MemoryRouter initialEntries={['/travel/1/settings']}>
        <OneTravelOverview />
      </MemoryRouter>

    );
  });

  xit('should render.', () => {
    const component = mount(oneTravelOverview);
    expect(component.find('.oneTravelOverview').length).toBe(1);
  });
});
