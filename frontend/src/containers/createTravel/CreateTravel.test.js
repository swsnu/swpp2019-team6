import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as travelActionCreators from '../../store/actions/travel';
import * as actionTypes from '../../store/actions/actionTypes';

import CreateTravel from './CreateTravel';
import TravelHeaderBlockEdit from '../../components/travelblock/TravelHeaderBlockEdit';
import TravelTransportationBlockEdit from '../../components/travelblock/TravelTransportationBlockEdit';
import TravelCustomBlockEdit from '../../components/travelblock/TravelCustomBlockEdit';
import TravelActivityBlockEdit from '../../components/travelblock/TravelActivityBlockEdit';
import TravelDayBlock from '../../components/travelblock/TravelDayBlock';
import DatePickerWrapper from '../../components/common/DatePicker';
import '../../setupTests';

jest.mock('react-beautiful-dnd', () => ({
  Droppable: ({ children }) => children({
    draggableProps: {
      style: {},
    },
    innerRef: jest.fn(),
  }, {}),
  Draggable: ({ children }) => children({
    draggableProps: {
      style: {},
    },
    dragHandleProps: {},
    innerRef: jest.fn(),
  }, {
    isDragging: true,
  }),
  DragDropContext: ({ children }) => children,
}));

const stubInitialTravel = {
  travel: {},
  id: 0,
};

const mockStore = getMockStore({}, {}, stubInitialTravel);


describe('<CreateTravel />', () => {
  let createTravel;
  let spyCreateTravel;

  beforeEach(() => {
    createTravel = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={CreateTravel} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyCreateTravel = jest.spyOn(travelActionCreators, 'createTravel')
      .mockImplementation(() => { return (dispatch) => {}; });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render CreateTravel', () => {
    const component = mount(createTravel);
    const headBlock = component.find(TravelHeaderBlockEdit);
    const dayBlock = component.find(TravelDayBlock);
    expect(headBlock.length).toBe(1);
    expect(dayBlock.length).toBe(1);
  });

  it('should clicck createButton and call travel actions', () => {
    const component = mount(createTravel);
    const createButton = component.find('#create-travel-button');
    expect(createButton.length).toBe(5);
    createButton.at(0).simulate('click');
    expect(spyCreateTravel).toHaveBeenCalledTimes(1);
  });

  it('should render restaurant without errors', () => {
    const items = [
      {
        id: 'day-0',
        info: {
          datetime: new Date('2020-01-01T09:00:00'),
          description: '',
          expand: true,
        },
      },
      {
        id: 'restaurant-1',
        info: {
          startTime: new Date('2030-01-01T09:00:00'),
          endTime: new Date('2030-01-01T09:00:00'),
          description: '',
          expand: false,
          title: '',
        },
      },
    ];
    const initialTravel = {
      travel: {
        items: items,
      },
      id: 0,
    };
    const _mockStore = getMockStore({}, {}, initialTravel);
    createTravel = (
      <Provider store={_mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={CreateTravel} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(createTravel);
    const wrapperTravelCustomBlockEdit = component.find(TravelActivityBlockEdit);
    expect(wrapperTravelCustomBlockEdit.length).toBe(1);
    const wrapperTravelDayBlock = component.find(TravelDayBlock);
    expect(wrapperTravelDayBlock.length).toBe(1);
  });

  it('should render transportation without errors', () => {
    const items = [
      {
        id: 'day-0',
        info: {
          datetime: new Date('2020-01-01T09:00:00'),
          description: '',
          expand: true,
        },
      },
      {
        id: 'transportation-1',
        info: {
          startTime: new Date('2030-01-01T09:00:00'),
          endTime: new Date('2030-01-01T09:00:00'),
          description: '',
          expand: false,
          title: '',
        },
      },
    ];
    const initialTravel = {
      travel: {
        items: items,
      },
      id: 0,
    };
    const _mockStore = getMockStore({}, {}, initialTravel);
    createTravel = (
      <Provider store={_mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={CreateTravel} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(createTravel);
    const wrapperTravelCustomBlockEdit = component.find(TravelTransportationBlockEdit);
    expect(wrapperTravelCustomBlockEdit.length).toBe(1);
    const wrapperTravelDayBlock = component.find(TravelDayBlock);
    expect(wrapperTravelDayBlock.length).toBe(1);
  });

  it('should render Accomodation without errors', () => {
    const items = [
      {
        id: 'day-0',
        info: {
          datetime: new Date('2020-01-01T09:00:00'),
          description: '',
          expand: true,
        },
      },
      {
        id: 'hotel-1',
        info: {
          startTime: new Date('2030-01-01T09:00:00'),
          endTime: new Date('2030-01-01T09:00:00'),
          description: '',
          expand: false,
          title: '',
        },
      },
    ];
    const initialTravel = {
      travel: {
        items: items,
      },
      id: 0,
    };
    const _mockStore = getMockStore({}, {}, initialTravel);
    createTravel = (
      <Provider store={_mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={CreateTravel} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(createTravel);
    const wrapperTravelCustomBlockEdit = component.find(TravelActivityBlockEdit);
    expect(wrapperTravelCustomBlockEdit.length).toBe(1);
    const wrapperTravelDayBlock = component.find(TravelDayBlock);
    expect(wrapperTravelDayBlock.length).toBe(1);
  });

  it('should render Activity without errors', () => {
    const items = [
      {
        id: 'day-0',
        info: {
          datetime: new Date('2020-01-01T09:00:00'),
          description: '',
          expand: true,
        },
      },
      {
        id: 'activity-1',
        info: {
          startTime: new Date('2030-01-01T09:00:00'),
          endTime: new Date('2030-01-01T09:00:00'),
          description: '',
          expand: false,
          title: '',
        },
      },
    ];
    const initialTravel = {
      travel: {
        items: items,
      },
      id: 0,
    };
    const _mockStore = getMockStore({}, {}, initialTravel);
    createTravel = (
      <Provider store={_mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={CreateTravel} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(createTravel);
    const wrapperTravelCustomBlockEdit = component.find(TravelActivityBlockEdit);
    expect(wrapperTravelCustomBlockEdit.length).toBe(1);
    const wrapperTravelDayBlock = component.find(TravelDayBlock);
    expect(wrapperTravelDayBlock.length).toBe(1);
  });

  it('should render custom without errors', () => {
    const items = [
      {
        id: 'day-0',
        info: {
          datetime: new Date('2020-01-01T09:00:00'),
          description: '',
          expand: true,
        },
      },
      {
        id: 'custom-1',
        info: {
          startTime: new Date('2030-01-01T09:00:00'),
          endTime: new Date('2030-01-01T09:00:00'),
          description: '',
          expand: false,
          title: '',
        },
      },
    ];
    const initialTravel = {
      travel: {
        items: items,
      },
      id: 0,
    };
    const _mockStore = getMockStore({}, {}, initialTravel);
    createTravel = (
      <Provider store={_mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={CreateTravel} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(createTravel);
    const wrapperTravelCustomBlockEdit = component.find(TravelCustomBlockEdit);
    expect(wrapperTravelCustomBlockEdit.length).toBe(1);
    const wrapperTravelDayBlock = component.find(TravelDayBlock);
    expect(wrapperTravelDayBlock.length).toBe(1);
  });
});
