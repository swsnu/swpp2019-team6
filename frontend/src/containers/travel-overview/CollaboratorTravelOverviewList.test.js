import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import axios from 'axios';
import { getMockStore } from '../../test-utils/mocks';
import * as travelActionCreators from '../../store/actions/travel';

import CollaboratorTravelOverviewList from './CollaboratorTravelOverviewList';


const stubTravelState = {
  collaboratorTravels: [{
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


describe('CollaboratorTravelOverviewList', () => {
  let collaboratorTravelOverviewList;
  let spyGetCollaboratorTravels;

  beforeEach(() => {
    collaboratorTravelOverviewList = (
      <Provider store={mockStore}>
        <CollaboratorTravelOverviewList />
      </Provider>

    );

    spyGetCollaboratorTravels = jest.spyOn(travelActionCreators, 'getCollaboratorTravels')
      .mockImplementation(() => { return (dispatch) => {}; });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render.', () => {
    const component = mount(collaboratorTravelOverviewList);
    expect(component.find('.travelOverviewList').length).toBe(1);
  });

  it('should render empty contents.', () => {
    const component = mount(
      <Provider store={getMockStore({}, {}, {})}>
        <CollaboratorTravelOverviewList />
      </Provider>,
    );
    expect(component.find('.travelOverviewList').length).toBe(0);
  });
});
