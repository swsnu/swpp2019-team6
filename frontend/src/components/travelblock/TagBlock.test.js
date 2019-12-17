import React from 'react';
import axios from 'axios';
import { shallow, mount } from 'enzyme';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import TagBlock from './TagBlock';
import '../../setupTests';


describe('<TagBlock />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const component = shallow(<TagBlock />);
    const wrapperPaper = component.find(Autocomplete);
    expect(wrapperPaper.length).toBe(1);
  });

  it('should request get tag', async () => {
    const setTags = jest.fn();
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: ['TEST'],
          };
          resolve(result);
        });
      });
    const component = mount(<TagBlock setTags={setTags} value="" />);

    const wrapperTextField = component.find(TextField);
    wrapperTextField.at(0).simulate('change', { target: { value: 'TEST' } });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
