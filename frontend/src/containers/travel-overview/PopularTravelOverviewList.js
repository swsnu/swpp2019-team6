import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import TravelOverviewList from '../../components/travel-overview/TravelOverviewList';

import * as actionCreators from '../../store/actions/index';

class PopularTravelOverviewList extends Component {
  componentDidMount() {
    this.props.onGetPopularTravels();
  }

  render() {
    return (
      <div className="popularTravelOverview">
        <Typography variant="h4" align="left" color="primary" style={{ marginTop: 8, padding: 16 }}>
            Popular
        </Typography>
        <TravelOverviewList travelList={this.props.popularTravels} is_mypage={false} />
        <Divider style={{ margin: 8 }} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetPopularTravels: () => dispatch(actionCreators.getPopularTravels()),

  };
};

const mapStateToProps = (state) => {
  return {
    popularTravels: state.travel.popularTravels,

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PopularTravelOverviewList);
