import axios from 'axios';
import * as actionCreators from './travel';
import store from '../store';

const stubTravel = {
  id: 2,
  head: {
    id: 1,
    days: [
      {
        id: 1,
        blocks: [
          {
            id: 2,
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
        title: 'travelDay1 title',
        day: '2019-11-01',
        modified: true,
        parent_day: null,
      },
      {
        id: 2,
        blocks: [
          {
            id: 2,
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
        title: 'travelDay2 title',
        day: '2019-11-02',
        modified: true,
        parent_day: null,
      },
      {
        id: 3,
        blocks: [],
        title: 'travelDay3 title',
        day: '2019-11-03',
        modified: true,
        parent_day: null,
      },
    ],
    author: {
      id: 1,
      email: 'test@test.io',
      nickname: 'test',
      status_message: '',
    },
    title: 'travelCommit1 title',
    summary: '',
    description: '',
    start_date: '2019-11-01',
    end_date: '2019-11-03',
    travel: 1,
  },
  author: {
    id: 1,
    email: 'test@test.io',
    nickname: 'test',
    status_message: '',
  },
  collaboraters: [
    {
      id: 2,
      email: 'test2@test.io',
      nickname: 'test2',
      status_message: '',
    },
  ],
  is_public: true,
  allow_comments: true,
  fork_parent: null,
  likes: [
    3,
    2,
  ],
};

const stubRequestTravel = {
  header: {
    title: 'TEST',
    startDate: new Date(),
    endDate: new Date(),
  },
  items: [
    {
      id: 'day-0',
      info: {
        title: 'TEST',
        datetime: new Date(),
      },
    },
    {
      id: 'restaurant-2',
      info: {
        title: 'TEST',
        time: new Date(),
        point: 'TEST',
      },
    },
    {
      id: 'activity-4',
      info: {
        title: 'TEST',
        time: new Date(),
        point: 'a',
      },
    },
    {
      id: 'transportation-3',
      info: {
        title: 'TEST',
        time: new Date(),
        point: 'TEST',
      },
    },
    {
      id: 'hotel-5',
      info: {
        title: 'TEST',
        time: new Date(),
        point: 'TEST',
      },
    },
  ],
};

const stubWrongRequestTravel = {
  header: {
    title: 'TEST',
    startDate: new Date(),
    endDate: new Date(),
  },
  items: [
    {
      id: 'day-0',
      info: {
        title: 'TEST',
        datetime: new Date(),
      },
    },
    {
      id: 'restaurant-2',
      info: {
        title: 'TEST',
        time: new Date(),
        point: '',
      },
    },
  ],
};



describe('Travel Action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  xit('create travel catch error when response error', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, user_info, headers) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 400,
          };
          reject(result);
        });
      });

    store.dispatch(actionCreators.createTravel(stubWrongRequestTravel)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('create travel should post travel info correctly', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, travel, headers) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: travel,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.createTravel(stubRequestTravel)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should get travel info', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubTravel,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getTravel(0)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('get travel info when 400 error', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 400,
          };
          reject(result);
        });
      });

    store.dispatch(actionCreators.getTravel(999)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should get popular travel info', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubTravel,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getPopularTravels()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should get recent travel info', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubTravel,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getRecentTravels()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should get user travel info', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url, userid) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubTravel,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getUserTravels(1)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should get search travel info', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url, userid) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubTravel,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getSearchTravel('hawaii')).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should get one raw travel info', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url, userid) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubTravel,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getOneRawTravel(1)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should get collaborator travel info', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url, userid) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubTravel,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getCollaboratorTravels(1)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should get recommend travel info', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url, userid, travel_id) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubTravel,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getRecommendedTravels(1,1)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should quit collaborator from travel info', (done) => {
    const spy = jest.spyOn(axios, 'put')
      .mockImplementation((url, userid, travel_idheaders) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubTravel,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.quitCollaborator(1,1)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('like travel should work well', (done) => {
    const spy = jest.spyOn(axios, 'put')
      .mockImplementation((url, userid, travel_id, headers) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubTravel,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.likeTravel(1,1)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should get comment of travel', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url, travel_id) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: 'comment',
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getComments(1)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should post comment of travel', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, travel_id, comment, headers) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: 'comment',
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.postComment(1,'comment')).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('fork travel should work well', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, travelid, headers) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubTravel,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.forkTravel(1,1)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

});
