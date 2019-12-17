import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import RecommendedTravelOverviewList from './RecommendedTravelOverviewList';
import { getMockStore } from '../../test-utils/mocks';
import * as travelActionCreators from '../../store/actions/travel';


const stubTravelState = {
  recommendedTravels: [{
    title: 'test',
    id: 1,
  }],
};

const mockStore = getMockStore({}, {}, stubTravelState);

jest.mock('../../components/travel-overview/TravelOverviewList', () => {
  return jest.fn((props) => {
    return (
      <div className="travelOverviewList">
        {props.travelList ? (
          <div>
            {props.travelList.map((travelOverviewItem, i) => (
              <div key={i} className="travelOverviewItem">
                {travelOverviewItem.title}
              </div>
            ))}
          </div>
        ) : (
          'No results were found'
        )}
      </div>
    );
  });
});


describe('RecommendedTravelOverviewList', () => {
  let recommendedTravelOverviewList;
  let spyGetRecommendedTravels;


  beforeEach(() => {
    recommendedTravelOverviewList = (
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/travel/1']}>
          <RecommendedTravelOverviewList />
        </MemoryRouter>
      </Provider>
    );

    spyGetRecommendedTravels = jest.spyOn(travelActionCreators, 'getRecommendedTravels')
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
    const component = mount(recommendedTravelOverviewList);
    expect(component.find('.travelOverviewList').length).toBe(1);
  });

  it('should render empty contents.', () => {
    const component = mount(
      <Provider store={getMockStore({}, {}, {})}>
        <MemoryRouter initialEntries={['/travel/1']}>
          <RecommendedTravelOverviewList />
        </MemoryRouter>
      </Provider>,
    );
    expect(component.find('.travelOverviewList').length).toBe(1);
  });
});
