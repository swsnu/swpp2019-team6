import React from 'react';
import { shallow, mount } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import UserTravelOverviewList from './UserTravelOverviewList';
import { getMockStore } from '../../test-utils/mocks';
import * as travelActionCreators from '../../store/actions/travel';
import { history } from '../../store/store';


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

const stubTravelState = {
  userTravels: [{
    title: 'test',
    id: 1,
  }],
};

const mockStore = getMockStore({}, {}, stubTravelState);

describe('UserTravelOverviewList', () => {
  let userTravelOverviewList;
  let spyGetUserTravels;
  let spyDeleteTravel;


  beforeEach(() => {
    userTravelOverviewList = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <UserTravelOverviewList
            is_mypage
          />
        </ConnectedRouter>
      </Provider>
    );

    spyGetUserTravels = jest.spyOn(travelActionCreators, 'getRecentTravels')
      .mockImplementation(() => { return (dispatch) => {}; });

    spyDeleteTravel = jest.spyOn(travelActionCreators, 'deleteTravel')
      .mockImplementation(() => { return (dispatch) => {}; });
  });


  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render. - mypage & has travels', () => {
    const component = mount(userTravelOverviewList);
    expect(component.find('.userTravelOverview').length).toBe(1);
  });

  it('should render. - not mypage', () => {
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <UserTravelOverviewList />
        </ConnectedRouter>
      </Provider>,
    );
    expect(component.find('#createTravelButton').length).toBe(0);
  });

  it('should render. - mypage & no travels', () => {
    const component = mount(
      <Provider store={getMockStore({}, {}, {})}>
        <ConnectedRouter history={history}>
          <UserTravelOverviewList
            is_mypage
          />
        </ConnectedRouter>
      </Provider>,
    );
    expect(component.find(Typography).find('#makeYourFirstPlan').at(0).text()).toBe('Make your first plan for a travel!');
  });
});
