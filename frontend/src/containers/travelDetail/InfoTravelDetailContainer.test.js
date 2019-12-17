import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import InfoTravelDetailContainer from './InfoTravelDetailContainer';
import { getMockStore } from '../../test-utils/mocks';
import * as travelActionCreators from '../../store/actions/travel';


const stubTravelState = {
  oneRawTravel: {
    head: {
      title: 'test',
      image: 'hello',
      tags: ['test', 'tt'],
    },
    id: 1,
    likes: [3, 4, 5],
    author: {
      id: 1,
      nickname: 1,
      profile_photo: 'temp',
    },
  },
};

const lessTravelState = {
  oneRawTravel: {
    head: {
      title: 'test',
      image: null,
      tags: null,
    },
    id: 1,
    likes: [3, 4, 5],
    author: {
      id: 1,
      nickname: 1,
      profile_photo: null,
    },
  },
};
const thisTravel = {
  head: {
    title: 'test',
    image: null,
    tags: null,
  },
  id: 1,
  likes: [3, 4, 5],
  author: {
    id: 1,
    nickname: 1,
    profile_photo: null,
  },
};
const lessMockStore = getMockStore({}, {}, lessTravelState);

const mockStore = getMockStore({}, {}, stubTravelState);

describe('InfoTravelDetailContainer', () => {
  let infoTravelDetailContainer;
  let spyGetOneRawTravel;
  let spyForkTravel;

  beforeEach(() => {
    infoTravelDetailContainer = (
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/travel/1']}>
          <InfoTravelDetailContainer />
        </MemoryRouter>
      </Provider>
    );
    spyGetOneRawTravel = jest.spyOn(travelActionCreators, 'getOneRawTravel')
      .mockImplementation(() => { return (dispatch) => {}; });

    spyForkTravel = jest.spyOn(travelActionCreators, 'forkTravel')
      .mockImplementation(() => { return (dispatch) => {}; });

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
    const component = mount(infoTravelDetailContainer);
    expect(component.find('.infoTravelDetail').length).toBe(1);
  });

  it('should render empty contents', () => {
    const component = mount(
      <Provider store={getMockStore({}, {}, {})}>
        <MemoryRouter initialEntries={['/travel/1']}>
          <InfoTravelDetailContainer />
        </MemoryRouter>
      </Provider>,
    );
    expect(component.find('.infoTravelDetail').length).toBe(0);
  });

  it('should render - no tags, no image', () => {
    const component = mount(
      <Provider store={lessMockStore}>
        <MemoryRouter initialEntries={['/travel/1']}>
          <InfoTravelDetailContainer thisTravel={thisTravel} />
        </MemoryRouter>
      </Provider>,
    );
    expect(component.find('#NoImage').length).toBe(1);
    expect(component.find('#NoTags').length).toBe(3);
  });

  it('should handle actions', () => {
    const component = mount(infoTravelDetailContainer);

    const forkButton = component.find('#ForkButton').at(0);
    forkButton.simulate('click');
    expect(spyForkTravel).toBeCalled();

    const authorButton = component.find('#AuthorButton').find('button');
    authorButton.simulate('click');
  });
});
