import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import CommentsLikeContainer from './CommentsLikeContainer';
import { getMockStore } from '../../test-utils/mocks';
import * as travelActionCreators from '../../store/actions/travel';


const stubTravelState = {
  oneRawTravel: {
    title: 'test',
    id: 1,
    likes: [3, 4, 5],
  },
  comments: [{
    author: {
      nickname: 'testt',
    },
    register_time: '2017-02-01T12:25:00Z',
    content: 'testtext',
  }],
};

const mockStore = getMockStore({}, {}, stubTravelState);

describe('CommentsLikeContainer', () => {
  let commentsLikeContainer;
  let spyLikeTravel;
  let spyGetComments;
  let spyPostComment;

  beforeEach(() => {
    commentsLikeContainer = (
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/travel/1']}>
          <CommentsLikeContainer />
        </MemoryRouter>
      </Provider>
    );

    spyLikeTravel = jest.spyOn(travelActionCreators, 'likeTravel')
      .mockImplementation(() => { return (dispatch) => {}; });

    spyGetComments = jest.spyOn(travelActionCreators, 'getComments')
      .mockImplementation(() => { return (dispatch) => {}; });

    spyPostComment = jest.spyOn(travelActionCreators, 'postComment')
      .mockImplementation(() => { return (dispatch) => {}; });


    localStorage.setItem('user', JSON.stringify({
      id: 1,
      email: 'test@test.com',
      nickname: 'test',
      status_message: 'test message',
    }));

    afterEach(() => {
      jest.clearAllMocks();
    });
  });

  it('should render.', () => {
    const component = mount(commentsLikeContainer);
    expect(component.find('.commentsLike').length).toBe(1);
  });

  it('should render empty contents', () => {
    const component = mount(
      <Provider store={getMockStore({}, {}, {})}>
        <MemoryRouter initialEntries={['/travel/1']}>
          <CommentsLikeContainer />
        </MemoryRouter>
      </Provider>,
    );
    expect(component.find('.commentsLike').length).toBe(0);
  });

  it('should render - no likes, no comments', () => {
    const tempTravelStore = {
      oneRawTravel: {
        title: 'test',
        id: 1,
        likes: null,
      },
      comments: null,
    };
    const component = mount(
      <Provider store={getMockStore({}, {}, tempTravelStore)}>
        <MemoryRouter initialEntries={['/travel/1']}>
          <CommentsLikeContainer />
        </MemoryRouter>
      </Provider>,
    );
    expect(component.find('#likeButton').length).toBe(0);
    expect(component.find('Comment').length).toBe(0);
  });

  it('should render - no comments', () => {
    const tempTravelStore = {
      oneRawTravel: {
        title: 'test',
        id: 1,
        likes: [2, 3, 4],
      },
      comments: null,
    };
    const component = mount(
      <Provider store={getMockStore({}, {}, tempTravelStore)}>
        <MemoryRouter initialEntries={['/travel/1']}>
          <CommentsLikeContainer />
        </MemoryRouter>
      </Provider>,
    );
    expect(component.find('#likeButton').length).toBe(0);
    expect(component.find('Comment').length).toBe(0);
  });

  it('should handle actions.', () => {
    const component = mount(commentsLikeContainer);
    expect(component.find('.commentsLike').length).toBe(1);

    const likeButton = component.find('#likeButton').at(0);
    likeButton.simulate('click');
    expect(spyLikeTravel).toBeCalled();

    const commentField = component.find('#CommentField').find('input');
    commentField.simulate('change', { target: { value: 'test2' } });
    const confirmButton = component.find('#ConfirmButton').at(0);
    confirmButton.simulate('click');
    expect(spyPostComment).toBeCalled();
  });
});
