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
    title: 'Ultricies lacus sed turpis tincidunt',
    summary: 'Pharetra magna ac placerat vestibulum lectus. Pretium viverra suspendisse potenti nullam ac..',
    start_date: '2019.03.04',
    end_date: '2019.03.08',
    photo: null,
  },
},
{
  id: 2,
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
    title: 'Ultricies lacus sed turpis tincidunt',
    summary: 'Pharetra magna ac placerat vestibulum lectus. Pretium viverra suspendisse potenti nullam ac..',
    start_date: '2019.03.04',
    end_date: '2019.03.08',
    photo: null,
  },
},
{
  id: 3,
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
    title: 'lacus sed turpis tincidunt',
    summary: 'ac placerat vestibulum lectus. Pretium viverra suspendisse potenti nullam ac..',
    start_date: '2019.03.04',
    end_date: '2019.03.08',
    photo: null,
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
