import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as travelActionCreators from '../../store/actions/travel';

import TravelDetail from './TravelDetail';
import TravelActivityBlockView from '../../components/travelblock/TravelActivityBlockView';
import TravelDayBlockView from '../../components/travelblock/TravelDayBlockView';
import '../../setupTests';

const stubInitialTravel = {
  items: [
    {
      id: 0,
      title: 'travelblock1 title',
      description: '',
      datetime: null,
      block_type: 'DAY',
      modified: true,
      parent_block: null,
    },
    {
      id: 1,
      title: 'travelblock1 title',
      description: '',
      time: null,
      start_location: 'travelblock1 start',
      end_location: 'travelblock1 end',
      block_type: 'ACM',
      modified: true,
      parent_block: null,
    },
  ],
};

const mockStore = getMockStore({}, {}, stubInitialTravel);


describe('<TravelDetail />', () => {
  let travelDetail;
  let spyGetTravel;

  beforeEach(() => {
    travelDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={TravelDetail} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetTravel = jest.spyOn(travelActionCreators, 'getTravel')
      .mockImplementation(() => { return (dispatch) => {}; });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render TravelDetail', () => {
    const component = mount(travelDetail);
    const headBlock = component.find(TravelActivityBlockView);
    const dayBlock = component.find(TravelDayBlockView);
    expect(headBlock.length).toBe(1);
    expect(dayBlock.length).toBe(1);
    expect(spyGetTravel).toHaveBeenCalledTimes(1);
  });

  it('should render TravelDetail when items is null', () => {
    travelDetail = (
      <Provider store={getMockStore({}, {}, {})}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={TravelDetail} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(travelDetail);
    const headBlock = component.find(TravelActivityBlockView);
    const dayBlock = component.find(TravelDayBlockView);
    expect(headBlock.length).toBe(0);
    expect(dayBlock.length).toBe(0);
  });
});
