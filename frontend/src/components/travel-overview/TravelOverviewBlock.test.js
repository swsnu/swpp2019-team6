import React from 'react';
import { shallow, mount } from 'enzyme';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import TravelOverviewBlock from './TravelOverviewBlock';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';

const temptravelOverviewItem = {
  id: 1,
  title: 'Ultricies lacus sed turpis tincidunt',
  author: {
    id: 1,
    email: 'test@test.io',
    nickname: 'test',
    status_message: 'status',
    profile_photo: '/media/user/1/profile.png',
  },
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
};

const temptravelOverviewItem2 = {
  id: 2,
  title: 'Ultricies lacus sed turpis tincidunt',
  author: {
    id: 1,
    email: 'test@test.io',
    nickname: 'test',
    status_message: 'status',
    profile_photo: '/media/user/1/profile.png',
  },
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
};

const emptytravelOverviewItem = {
  title: null,
  author: null,
  likes: [],
  is_public: null,
  allow_comments: null,
  is_forked: null,
  collaborators: [],
  head: {
    summary: null,
    start_date: null,
    end_date: null,
    photo: null,
  },
};

const mockOnDeleteClicked = jest.fn();
const mockOnQuitClicked = jest.fn();

const mockStore = getMockStore({}, {}, {});

describe('TravelOverviewBlock', () => {
  let travelOverviewBlock;

  // beforeEach(() => {
  //   travelOverviewBlock = (
  //     <TravelOverviewBlock
  //       travelOverviewItem={temptravelOverviewItem}
  //       is_mypage={false}
  //     />
  //   );
  // });

  it('should render - is_mypage: false.', () => {
    travelOverviewBlock = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <TravelOverviewBlock
            travelOverviewItem={temptravelOverviewItem}
          />
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(travelOverviewBlock);
    expect(component.find('button').length).toBe(1);
  });

  it('should render - is_mypage: true / for_collaborator: false', () => {
    travelOverviewBlock = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <TravelOverviewBlock
            travelOverviewItem={temptravelOverviewItem}
            is_mypage
            onDeleteClicked={mockOnDeleteClicked}
            onQuitClicked={mockOnQuitClicked}
          />
        </ConnectedRouter>
      </Provider>

    );
    const component = mount(travelOverviewBlock);
    expect(component.find('button').length).toBe(5);
  });


  it('should render - is_mypage: true. / for_collaborator: true', () => {
    travelOverviewBlock = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <TravelOverviewBlock
            travelOverviewItem={temptravelOverviewItem2}
            is_mypage
            for_collaborator
            onDeleteClicked={mockOnDeleteClicked}
            onQuitClicked={mockOnQuitClicked}
          />
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(travelOverviewBlock);
    expect(component.find('button').length).toBe(4);
  });

  it('should render empty content.', () => {
    travelOverviewBlock = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <TravelOverviewBlock
            travelOverviewItem={emptytravelOverviewItem}
            onDeleteClicked={mockOnDeleteClicked}
            onQuitClicked={mockOnQuitClicked}
          />
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(travelOverviewBlock);
    expect(component.find('.MuiCardMedia-root').length).toBe(0);
  });

  it('should render nothing.', () => {
    travelOverviewBlock = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <TravelOverviewBlock />
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(travelOverviewBlock);
    expect(component.find('.MuiCardMedia-root').length).toBe(0);
  });
});
