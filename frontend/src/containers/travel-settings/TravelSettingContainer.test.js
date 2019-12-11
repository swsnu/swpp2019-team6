import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import axios from 'axios';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as travelActionCreators from '../../store/actions/travel';

import TravelSettingContainer from './TravelSettingContainer';


const stubTravelState = {
  oneRawTravel: {
    id: 1,
    collaborators: [2, 3],
    is_public: true,
    allow_comments: true,
  },
};

const mockStore = getMockStore({}, {}, stubTravelState);

describe('TravelSettingContainer', () => {
  let travelSettingContainer;
  let spyGetOneRawTravel;
  let spyAxiosPut;

  beforeEach(() => {
    travelSettingContainer = (
      <Provider store={mockStore}>
        <TravelSettingContainer travelId={1} />
      </Provider>
    );
    spyGetOneRawTravel = jest.spyOn(travelActionCreators, 'getOneRawTravel')
      .mockImplementation(() => { return (dispatch) => {}; });

    spyAxiosPut = jest.spyOn(axios, 'put')
      .mockImplementation((url, data, headers) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: {
              id: 2,
            },
          };
          resolve(result);
        });
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render.', () => {
    const component = mount(travelSettingContainer);
    expect(component.find('.travelSettingContainer').length).toBe(1);
  });

  it('should handle clicks(checkbox value change).', () => {
    const component = mount(travelSettingContainer);
    const radioPublic = component.find('#RadioPublic').find('input');
    radioPublic.simulate('change', { target: { checked: true } });
    const radioPrivate = component.find('#RadioPrivate').find('input');
    radioPrivate.simulate('change', { target: { checked: true } });
    const radioAllow = component.find('#RadioAllow').find('input');
    radioAllow.simulate('change', { target: { checked: true } });
    const radioDisallow = component.find('#RadioDisallow').find('input');
    radioDisallow.simulate('change', { target: { checked: true } });
    const applyButton = component.find('#ApplyButton').at(0);
    applyButton.simulate('click');
  });
});
