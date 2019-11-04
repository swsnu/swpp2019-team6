import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

const tempUser = {
  email: 'swpp@snu.ac.kr',
  nickname: 'iluvswpp',
  profile: null,
};

const searchText = '';
const mockOnLogoutClicked = jest.fn();
const mockOnMyPageClicked = jest.fn();
const mockOnSearchInputChanged = jest.fn();
const mockOnSearchButtonClicked = jest.fn();


describe('Header', () => {
  let header;

  beforeEach(() => {
    header = (
      <Header
        user={tempUser}
        searchText={searchText}
        onLogoutClicked={mockOnLogoutClicked}
        onMyPageClicked={mockOnMyPageClicked}
        onSearchInputChanged={mockOnSearchInputChanged}
        onSearchButtonClicked={mockOnSearchButtonClicked}
      />
    );
  });

  it('should render.', () => {
    const component = shallow(header);
    expect(component.find('.Header').length).toBe(1);
  });

  it('should handle click for dropdown menu', () => {
    const component = shallow(header);
    const wrapperDropdownButton = component.find('#dropdownButton');
    wrapperDropdownButton.simulate('click');
    const wrapperAnywhere = component.find('#searchButton');
    wrapperAnywhere.simulate('click');
  });
});
