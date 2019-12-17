import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TravelOverviewList from '../../components/travel-overview/TravelOverviewList';

import * as actionCreators from '../../store/actions/index';

class RecommendedTravelOverviewList extends Component {
  state = {
    currentUser: JSON.parse(localStorage.getItem('user')),
  }

  componentDidMount() {
    this.props.onGetRecommendedTravels(this.state.currentUser.id, this.props.match.params.id);
  }

  render() {
    return (
      <div
        className="recommendedTravelOverview"
        style={{
          margin: 32,
        }}
      >
        <Typography variant="h5" gutterBottom align="left" color="textPrimary" style={{ marginTop: 8, padding: 16 }}>
            Recommended Plans
        </Typography>
        <TravelOverviewList
          travelList={this.props.recommendedTravels}
          is_mypage={false}
          forRecommend
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetRecommendedTravels: (user_id, travel_id) => dispatch(
      actionCreators.getRecommendedTravels(user_id, travel_id),
    ),
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
