import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import PopularTravelOverviewList from './PopularTravelOverviewList';
import { getMockStore } from '../../test-utils/mocks';
import * as travelActionCreators from '../../store/actions/travel';

const stubTravelState = {
  popularTravels: [{
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


describe('PopularTravelOverviewList', () => {
  let popularTravelOverviewList;
  let spyGetPopularTravels;

  beforeEach(() => {
    popularTravelOverviewList = (
      <Provider store={mockStore}>
        <PopularTravelOverviewList />
      </Provider>
    );

    spyGetPopularTravels = jest.spyOn(travelActionCreators, 'getPopularTravels')
      .mockImplementation(() => { return (dispatch) => {}; });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render.', () => {
    const component = mount(popularTravelOverviewList);
    expect(component.find('.travelOverviewList').length).toBe(1);
  });

  it('should render empty contents.', () => {
    const component = mount(
      <Provider store={getMockStore({}, {}, {})}>
        <PopularTravelOverviewList />
      </Provider>,
    );
    expect(component.find('.travelOverviewList').length).toBe(1);
  });
});
