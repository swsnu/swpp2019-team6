import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchPage from './SearchPage';

describe('SearchPage', () => {
  it('should render.', () => {
    const component = shallow(<SearchPage location={{ search: '?tag=test' }} />);
    expect(component.find('.searchPage').length).toBe(1);
  });
});
