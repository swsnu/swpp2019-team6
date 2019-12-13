import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import axios from 'axios';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as travelActionCreators from '../../store/actions/travel';


import CollaboratorSettingContainer from './CollaboratorSettingContainer';

const stubTravelState = {
  oneRawTravel: {
    id: 1,
    collaborators: [2, 3],
  },
};

const mockStore = getMockStore({}, {}, stubTravelState);

describe('CollaboratorSettingContainer', () => {
  let collaboratorSettingContainer;
  let spyGetOneRawTravel;
  let spyAxiosGet;
  let spyAxiosPut;

  beforeEach(() => {
    collaboratorSettingContainer = (
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/travel/1/settings']} history={history}>
          <CollaboratorSettingContainer travelId={1} />
        </MemoryRouter>
      </Provider>
    );
    spyGetOneRawTravel = jest.spyOn(travelActionCreators, 'getOneRawTravel')
      .mockImplementation(() => { return (dispatch) => {}; });

    spyAxiosGet = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: {
              id: 2,
              nickname: 'test',
            },
          };
          resolve(result);
        });
      });

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
    const { location } = window;
    delete window.location;
    window.location = { reload: jest.fn() };

    localStorage.setItem('user', JSON.stringify({
      id: 1,
      email: 'test@test.com',
      nickname: 'test',
      status_message: 'test message',
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render.', () => {
    const component = mount(collaboratorSettingContainer);
    expect(component.find('.collaboratorSettingContainer').length).toBe(1);
  });

  it('should handle clicks.', () => {
    const component = mount(collaboratorSettingContainer);
    const addButton = component.find('#addButton');
    addButton.at(0).simulate('click');
    const nicknameField = component.find('#nickname').find('input');
    nicknameField.simulate('change', { target: { value: 'test1' } });
    const cancelButton = component.find('#cancelButton');
    cancelButton.at(0).simulate('click');
    addButton.at(0).simulate('click');
    nicknameField.simulate('change', { target: { value: 'test1' } });
    const confirmButton = component.find('#confirmButton');
    confirmButton.at(0).simulate('click');
    expect(spyAxiosPut).toHaveBeenCalledTimes(1);
  });

  it('should not allow adding himself or herself as a collaborator', () => {
    const component = mount(collaboratorSettingContainer);
    const addButton = component.find('#addButton');
    addButton.at(0).simulate('click');
    const nicknameField = component.find('#nickname').find('input');
    nicknameField.simulate('change', { target: { value: 'test' } });
    const confirmButton = component.find('#confirmButton');
    confirmButton.at(0).simulate('click');
    expect(spyAxiosPut).toHaveBeenCalledTimes(0);
  });

  it('should reject request when the server is down', () => {
    spyAxiosPut = jest.spyOn(axios, 'put')
      .mockImplementation((url, data, headers) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 404,
            data: {
              id: 2,
            },
          };
          reject(result);
        });
      });
    const component = mount(collaboratorSettingContainer);
    const addButton = component.find('#addButton');
    addButton.at(0).simulate('click');
    const nicknameField = component.find('#nickname').find('input');
    nicknameField.simulate('change', { target: { value: 'test1' } });
    const confirmButton = component.find('#confirmButton');
    confirmButton.at(0).simulate('click');
    expect(spyAxiosPut).toHaveBeenCalledTimes(1);
  });
});
