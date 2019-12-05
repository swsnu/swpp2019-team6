import React from 'react';
import axios from 'axios';
import { shallow, mount } from 'enzyme';
import Autocomplete from '@material-ui/lab/Autocomplete';
import GoogleMapSearch from './GoogleMapSearch';
import '../../setupTests';

const stubData = [
  {
    search_index: 0,
    query: 'TEST',
    description: 'TEST',
    place_id: 'TEST',
  },
  {
    search_index: 1,
    query: 'TEST',
    description: 'TEST',
    place_id: 'TEST',
    structured_formatting: {
      main_text: 'TEST TEST',
      main_text_matched_substrings: [
        {
          length: 4,
          offset: 0,
        },
      ],
      secondary_text: 'TEST',
    },
  },
];


describe('<GoogleMapSearch />', () => {
  it('should render without errors', () => {
    const component = shallow(<GoogleMapSearch />);
    const wrapperPaper = component.find(Autocomplete);
    expect(wrapperPaper.length).toBe(1);
  });
  it('should request search', async () => {
    const searchHandler = jest.fn();
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubData,
          };
          resolve(result);
        });
      });
    const component = mount(<GoogleMapSearch searchHandler={searchHandler} value="" />);
    component.setProps({ value: 'TEST' });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
