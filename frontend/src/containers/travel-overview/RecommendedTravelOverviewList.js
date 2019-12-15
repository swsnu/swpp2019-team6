import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TravelOverviewList from '../../components/travel-overview/TravelOverviewList';

import * as actionCreators from '../../store/actions/index';

const tempTravelList = [{
  id: 1,
  author: {
    id: 1,
    email: 'test@test.io',
    nickname: 'swppabc',
    status_message: 'status',
    profile_photo: '/media/user/1/profile.png',
  },
  likes: [2, 3, 4, 5, 6, 7, 8, 9, 10],
  is_public: true,
  allow_comments: true,
  fork_parent: true,
  collaborators: [2, 3, 4],
  head: {
    title: 'My wonderful trip to Jeju Island',
    summary: 'My summer vacation in Jeju Island! COOOOOL',
    start_date: '2019.07.04',
    end_date: '2019.07.08',
    photo: '/images/hawaii3.jpg',
  },
},
{
  id: 2,
  author: {
    id: 1,
    email: 'test@test.io',
    nickname: 'bob',
    status_message: 'status',
    profile_photo: '/media/user/1/profile.png',
  },
  likes: [1, 3, 5, 7, 8, 9, 0, 12, 43, 35, 25, 56, 7, 12, 42, 643, 46],
  is_public: false,
  allow_comments: false,
  fork_parent: null,
  collaborators: [],
  head: {
    title: 'Three days in New Zealand',
    summary: 'Beautiful nature: waterfall, volcano, forest',
    start_date: '2019.03.25',
    end_date: '2019.03.29',
    photo: '/images/hawaii1.jpg',
  },
},
{
  id: 3,
  author: {
    id: 1,
    email: 'test@test.io',
    nickname: 'candy124',
    status_message: 'status',
    profile_photo: '/media/user/1/profile.png',
  },
  likes: [1, 2, 3, 4, 5],
  is_public: false,
  allow_comments: false,
  fork_parent: null,
  collaborators: [],
  head: {
    title: 'HAWAIAN MOOD',
    summary: 'Anyone wants to play the ukulele, near one of the best coasts of the Pacific Ocean?',
    start_date: '2019.05.01',
    end_date: '2019.05.05',
    photo: '/images/hawaii2.jpg',
  },
}];

class RecommendedTravelOverviewList extends Component {
  state = {
    currentUser: JSON.parse(localStorage.getItem('user')),
  }

  componentDidMount() {
    this.props.onGetRecommendedTravels(this.state.currentUser.id, this.props.match.params.id);
  }

  render() {
    return (
      <div className="recommendedTravelOverview">
        <Typography variant="h5" gutterBottom align="left" color="textPrimary" style={{ marginTop: 8, padding: 16 }}>
            Recommended Plans
        </Typography>
        <TravelOverviewList travelList={this.props.recommendedTravels} is_mypage={false} />
        {/* <TravelOverviewList travelList={tempTravelList} is_mypage={false} /> */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetRecommendedTravels: (user_id, travel_id) => dispatch(
      actionCreators.getRecommendedTravels(user_id, travel_id),
    ),
    // onGetRecommendedTravels: (user_id, travel_id) => {
    //   console.log(user_id, travel_id);
    // },
  };
};

const mapStateToProps = (state) => {
  return {
    recommendedTravels: state.travel.recommendedTravels,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(
  RecommendedTravelOverviewList,
));
