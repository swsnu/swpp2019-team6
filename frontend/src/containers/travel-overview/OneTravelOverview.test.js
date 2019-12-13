import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import OneTravelOverview from './OneTravelOverview';
import { getMockStore } from '../../test-utils/mocks';
import * as travelActionCreators from '../../store/actions/travel';

const stubTravelState = {
  oneRawTravel: {
    title: 'test',
    id: 1,
  },
};

const mockStore = getMockStore({}, {}, stubTravelState);

jest.mock('../../components/travel-overview/TravelOverviewBlock', () => {
  return jest.fn((props) => {
    return (
      <div className="travelOverviewBlock" />
    );
  });
});

describe('OneTravelOverview', () => {
  let oneTravelOverview;
  let spyGetOneRawTravel;

  beforeEach(() => {
    oneTravelOverview = (
      <Provider store={mockStore}>
        <OneTravelOverview />
      </Provider>
    );
    spyGetOneRawTravel = jest.spyOn(travelActionCreators, 'getOneRawTravel')
      .mockImplementation(() => { return (dispatch) => {}; });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render.', () => {
    const component = mount(oneTravelOverview);
    expect(component.find('.oneTravelOverview').length).toBe(1);
  });

  it('should render empty contents.', () => {
    const component = mount(
      <Provider store={getMockStore({}, {}, {})}>
        <OneTravelOverview />
      </Provider>,
    );
    expect(component.find('.oneTravelOverview').length).toBe(0);
  });
});
