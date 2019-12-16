import React from 'react';
import { shallow, mount } from 'enzyme';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import TravelSearch from './TravelSearch';
import { history } from '../../store/store';
import { getMockStore } from '../../test-utils/mocks';
import * as travelActionCreators from '../../store/actions/travel';


const stubTravelState = {
  searchTravels: [{
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


describe('TravelSearch', () => {
  let searchTravelList;
  let spyGetSearchTravels;


  beforeEach(() => {
    searchTravelList = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={TravelSearch} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyGetSearchTravels = jest.spyOn(travelActionCreators, 'getSearchTravel')
      .mockImplementation(() => { return (dispatch) => {}; });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render.', () => {
    const component = mount(searchTravelList);
    expect(component.find('.travelOverviewList').length).toBe(1);
    expect(spyGetSearchTravels).toHaveBeenCalledTimes(1);
  });

  it('should render empty contents.', () => {
    const component = mount(
      <Provider store={getMockStore({}, {}, {})}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={TravelSearch} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    expect(component.find('.travelOverviewList').length).toBe(1);
  });
});
