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

history.push = jest.fn();
const mockStore = getMockStore({}, {}, stubTravelState);


jest.mock('../../components/travel-overview/TravelOverviewList', () => {
  return jest.fn((props) => {
    return (
      <div className="travelOverviewList">
        <button type="button" id="deleteButton" label="deleteButton" onClick={props.onDeleteClicked} />
        <button type="button" id="mergeButton" label="mergeButton" onClick={props.onClickMerge} />
      </div>
    );
  });
});

describe('UserTravelOverviewList', () => {
  let userTravelOverviewList;
  let spyGetUserTravels;
  let spyDeleteTravel;
  let spyMergeTravelCommit;


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

    spyMergeTravelCommit = jest.spyOn(travelActionCreators, 'mergeTravelCommit')
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

  it('should handle clicks', () => {
    const component = mount(userTravelOverviewList);
    const createButton = component.find('#createTravelButton').find('button');
    createButton.simulate('click');
    expect(history.push).toHaveBeenCalled();
    const deleteButton = component.find('#deleteButton').find('button');
    deleteButton.simulate('click');
    expect(spyDeleteTravel).toHaveBeenCalled();
    const mergeButton = component.find('#mergeButton').find('button');
    mergeButton.simulate('click');
    expect(spyMergeTravelCommit).toHaveBeenCalled();
  });
});
