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

  // it(`should call 'clickTitle'`, () => {
  //     const spyHistoryPush = jest.spyOn(history, 'push')
  //       .mockImplementation(path => {});
  //     const component = mount(articleList);
  //     const title = component.find('.spyArticleLine .article-title button').at(0);
  //     expect(title.length).toBe(1);
  //     expect(title.text()).toBe('TEST_TITLE1');
  //     title.simulate('click');
  //     expect(spyHistoryPush).toHaveBeenCalledWith('/articles/0');
  // });

  // it(`should call 'clickCreate'`, () => {
  //     const spyHistoryPush = jest.spyOn(history, 'push')
  //       .mockImplementation(path => {});
  //     const component = mount(articleList);
  //     const wrapper = component.find('#create-article-button');
  //     wrapper.simulate('click');
  //     expect(spyHistoryPush).toHaveBeenCalledWith('/articles/create');
  // });

  // it(`should call 'logout'`, () => {
  //     const component = mount(articleList);
  //     const wrapper = component.find('#logout-button');
  //     wrapper.simulate('click');
  //     expect(spyLogout).toHaveBeenCalledTimes(1);
  // });

  // it('should not render aurhor name', () => {
  //     const stubInitialArticleListTest1 = {
  //         articles: [{
  //             "id": 0,
  //             "author_id": 999,
  //             "title": "TEST_TITLE",
  //             "content": "TEST_CONTENT"
  //         }]
  //     };
  //     const mockInitialStore = getMockStore(stubInitialStateLogin, stubInitialArticleListTest1, {});
  //     const component = mount(
  //         <Provider store={mockInitialStore}>
  //             <ConnectedRouter history={history}>
  //                 <Switch>
  //                     <Route path='/' exact component={ArticleList} />
  //                 </Switch>
  //             </ConnectedRouter>
  //         </Provider>
  //     );
  //     const author_name = component.find('.spyArticleLine .article-author-name').at(0);
  //     expect(author_name.length).toBe(1);
  //     expect(author_name.text()).toBe('');
  // });

  // it('should redirect to login when not logged_in', () => {
  //     const stubInitialStateLoginTest1 = {
  //         logged_in: false,
  //         user: {},
  //         users: [{
  //             "id": 1,
  //             "email": "TEST_EMAIL",
  //             "password": "TEST_PASSWORD",
  //             "name": "TEST_NAME",
  //             "logged_in": false
  //         }],
  //         userID: -1
  //     };
  //     const mockInitialStore = getMockStore(stubInitialStateLoginTest1, stubInitialArticleList, {});
  //     const component = mount(
  //         <Provider store={mockInitialStore}>
  //             <ConnectedRouter history={history}>
  //                 <Switch>
  //                     <Route path='/login' exact render={() => <div className="TEST">TEST</div>} />
  //                     <Route path='/' exact component={ArticleList} />
  //                 </Switch>
  //             </ConnectedRouter>
  //         </Provider>
  //     );
      
  //     const redirect = component.find('.TEST')
  //     expect(redirect.length).toBe(1);
  // });
});
