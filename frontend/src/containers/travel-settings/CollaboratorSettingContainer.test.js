import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import CollaboratorSettingContainer from './CollaboratorSettingContainer';

describe('CollaboratorSettingContainer', () => {
  let collaboratorSettingContainer;

  beforeEach(() => {
    collaboratorSettingContainer = (
      <MemoryRouter initialEntries={['/travel/1/settings']}>
        <CollaboratorSettingContainer />
      </MemoryRouter>
    );
  });

  it('should render.', () => {
    const component = mount(collaboratorSettingContainer);
    expect(component.find('.collaboratorSettingContainer').length).toBe(1);
  });
});
