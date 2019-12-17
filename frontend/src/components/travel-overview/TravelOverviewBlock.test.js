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
    photo: 'test',
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
    photo: 'test',
    tags: ['test'],
    is_head: true,
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
    is_head: false,
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
const mockOnClickMerge = jest.fn();

const mockStore = getMockStore({}, {}, {});
history.push = jest.fn();

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render - is_mypage: false.', () => {
    travelOverviewBlock = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <TravelOverviewBlock
            travelOverviewItem={temptravelOverviewItem}
            onDeleteClicked={mockOnDeleteClicked}
            onQuitClicked={mockOnQuitClicked}
            onClickMerge={mockOnClickMerge}
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
            onClickMerge={mockOnClickMerge}
          />
        </ConnectedRouter>
      </Provider>

    );
    const component = mount(travelOverviewBlock);
    expect(component.find('button').length).toBe(4);
  });


  it('should render - is_mypage: true. / for_collaborator: true', () => {
    travelOverviewBlock = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <TravelOverviewBlock
            travelOverviewItem={temptravelOverviewItem}
            is_mypage
            for_collaborator
            onDeleteClicked={mockOnDeleteClicked}
            onQuitClicked={mockOnQuitClicked}
            onClickMerge={mockOnClickMerge}
          />
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(travelOverviewBlock);
    expect(component.find('button').length).toBe(3);
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
            onClickMerge={mockOnClickMerge}
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
            onClickMerge={mockOnClickMerge}
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

  it('should render - is_mypage: true. / for_collaborator: false / is_head: false handle actions', () => {
    travelOverviewBlock = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <TravelOverviewBlock
            travelOverviewItem={temptravelOverviewItem2}
            is_mypage
            onDeleteClicked={mockOnDeleteClicked}
            onQuitClicked={mockOnQuitClicked}
            onClickMerge={mockOnClickMerge}
          />
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(travelOverviewBlock);
    expect(component.find('button').length).toBe(5);
    // "#CardActionAreaButton"
    // "#AuthorEditButton"
    // "#AuthorSettingsButton"
    // "#AuthorDeleteButton"
    // "#AuthorMergeButton"

    const button1 = component.find('#AuthorEditButton').find('button');
    button1.simulate('click');
    expect(history.push).toHaveBeenCalled();
    const button2 = component.find('#AuthorSettingsButton').find('button');
    button2.simulate('click');
    expect(history.push).toHaveBeenCalledTimes(2);
    const button3 = component.find('#AuthorDeleteButton').find('button');
    button3.simulate('click');
    const cancelButton = component.find('#DeleteCancelButton').find('button');
    cancelButton.simulate('click');
    button3.simulate('click');
    const confirmButton = component.find('#DeleteConfirmButton').find('button');
    confirmButton.simulate('click');
    expect(mockOnDeleteClicked).toHaveBeenCalled();
    const button4 = component.find('#AuthorMergeButton').find('button');
    button4.simulate('click');
    expect(mockOnClickMerge).toHaveBeenCalled();
  });

  it('should render - is_mypage: true. / for_collaborator: false / not head handle actions', () => {
    travelOverviewBlock = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <TravelOverviewBlock
            travelOverviewItem={temptravelOverviewItem}
            is_mypage
            onDeleteClicked={mockOnDeleteClicked}
            onQuitClicked={mockOnQuitClicked}
            onClickMerge={mockOnClickMerge}
          />
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(travelOverviewBlock);
    expect(component.find('button').length).toBe(4);


    // "#AuthorEditButton2"
    // "#AuthorSettingsButton2"
    // "#AuthorDeleteButton2"
    const button1 = component.find('#AuthorEditButton2').find('button');
    button1.simulate('click');
    expect(history.push).toHaveBeenCalled();
    const button2 = component.find('#AuthorSettingsButton2').find('button');
    button2.simulate('click');
    expect(history.push).toHaveBeenCalledTimes(2);
    const button3 = component.find('#AuthorDeleteButton2').find('button');
    button3.simulate('click');
    const cancelButton = component.find('#AuthorDeleteButton2').find('button');
    cancelButton.simulate('click');
  });

  it('should render - is_mypage: true. / for_collaborator: true / is_head: true handle actions', () => {
    travelOverviewBlock = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <TravelOverviewBlock
            travelOverviewItem={temptravelOverviewItem}
            is_mypage
            for_collaborator
            onDeleteClicked={mockOnDeleteClicked}
            onQuitClicked={mockOnQuitClicked}
            onClickMerge={mockOnClickMerge}
          />
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(travelOverviewBlock);
    expect(component.find('button').length).toBe(3);
    // "#CollaboratorEditButton"
    // "#CollaboratorQuitButton"

    const button1 = component.find('#CollaboratorEditButton').find('button');
    button1.simulate('click');
    expect(history.push).toHaveBeenCalled();
    const button2 = component.find('#CollaboratorQuitButton').find('button');
    button2.simulate('click');
  });

  it('should render - is_mypage: true. / for_collaborator: true / is_head: false handle actions', () => {
    travelOverviewBlock = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <TravelOverviewBlock
            travelOverviewItem={temptravelOverviewItem2}
            is_mypage
            for_collaborator
            onDeleteClicked={mockOnDeleteClicked}
            onQuitClicked={mockOnQuitClicked}
            onClickMerge={mockOnClickMerge}
          />
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(travelOverviewBlock);
    expect(component.find('button').length).toBe(4);
    // "#CollaboratorEditButton2"
    // "#CollaboratorQuitButton2"
    // "#CollaboratorMergeButton2"

    const button1 = component.find('#CollaboratorEditButton2').find('button');
    button1.simulate('click');
    expect(history.push).toHaveBeenCalled();
    const button2 = component.find('#CollaboratorQuitButton2').find('button');
    button2.simulate('click');
    const button3 = component.find('#CollaboratorMergeButton2').find('button');
    button3.simulate('click');
    expect(mockOnClickMerge).toHaveBeenCalled();
  });

  it('should render card click', () => {
    travelOverviewBlock = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <TravelOverviewBlock
            travelOverviewItem={temptravelOverviewItem}
            is_mypage
            for_collaborator
            onDeleteClicked={mockOnDeleteClicked}
            onQuitClicked={mockOnQuitClicked}
            onClickMerge={mockOnClickMerge}
          />
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(travelOverviewBlock);
    expect(component.find('button').length).toBe(3);
  });
});
