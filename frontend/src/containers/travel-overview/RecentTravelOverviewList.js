import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import TravelOverviewList from '../../components/travel-overview/TravelOverviewList';

import * as actionCreators from '../../store/actions/index';

class RecentTravelOverviewList extends Component {
  componentDidMount() {
    this.props.onGetRecentTravels();
  }

  render() {
    return (
      <div className="recentTravelOverview">
        <Typography variant="h4" align="left" color="primary" style={{ marginTop: 8, padding: 16 }}>
            Recent
        </Typography>
        <TravelOverviewList travelList={this.props.recentTravels} is_mypage={false} />
        <Divider style={{ margin: 8 }} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetRecentTravels: () => dispatch(actionCreators.getRecentTravels()),

  };
};

const mapStateToProps = (state) => {
  return {
    recentTravels: state.travel.recentTravels,

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RecentTravelOverviewList);
