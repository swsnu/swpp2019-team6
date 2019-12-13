import React from 'react';
import { shallow, mount } from 'enzyme';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';

import TravelOverviewList from './TravelOverviewList';

jest.mock('./TravelOverviewBlock', () => {
  return jest.fn((props) => {
    return (
      <div className="travelOverviewBlock" />
    );
  });
});

const tempTravelList = [
  {
    id: 1,
    title: 'Ultricies lacus sed turpis tincidunt',
    author: 'iluvswpp',
    likes: [2, 3, 4],
    is_public: true,
    allow_comments: true,
    fork_parent: true,
    collaborators: [2, 3, 4],
    head: {
      summary: 'Pharetra magna ac placerat vestibulum lectus. Pretium viverra suspendisse potenti nullam ac..',
      start_date: '2019.03.04',
      end_date: '2019.03.08',
      photo: null,
    },
  },
  {
    id: 2,
    title: 'Ultricies lacus sed turpis tincidunt',
    author: 'iluvswpp',
    likes: [],
    is_public: false,
    allow_comments: false,
    fork_parent: null,
    collaborators: [],
    head: {
      summary: 'Pharetra magna ac placerat vestibulum lectus. Pretium viverra suspendisse potenti nullam ac..',
      start_date: '2019.03.04',
      end_date: '2019.03.08',
      photo: null,
    },
  },
];

const emptyTravelList = [];

const mockStore = getMockStore({}, {}, {});

describe('TravelOverviewList', () => {
  let travelOverviewList;

  // beforeEach(() => {
  //   travelOverviewList = (
  //     <TravelOverviewList
  //       travelList={tempTravelList}
  //     />
  //   );
  // });

  it('should render. - is_mypage: false', () => {
    travelOverviewList = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <TravelOverviewList
            travelList={tempTravelList}
            is_mypage={false}
          />
        </ConnectedRouter>
      </Provider>

    );
    const component = mount(travelOverviewList);
    expect(component.find('button').length).toBe(0);
  });

  it('should render. - is_mypage: true', () => {
    travelOverviewList = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <TravelOverviewList
            travelList={tempTravelList}
            is_mypage
          />
        </ConnectedRouter>
      </Provider>


    );
    const component = mount(travelOverviewList);
    expect(component.find('button').length).toBe(0);
  });


  it('should render empty content.', () => {
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <TravelOverviewList
            travelList={emptyTravelList}
          />
        </ConnectedRouter>
      </Provider>
      ,
    );
    expect(component.find('.MuiGrid-item').length).toBe(0);
  });

  it('should render nothing.', () => {
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <TravelOverviewList />
        </ConnectedRouter>
      </Provider>
      ,
    );
    expect(component.find('.MuiGrid-container').length).toBe(0);
  });
});
