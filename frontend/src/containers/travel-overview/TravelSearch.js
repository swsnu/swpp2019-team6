import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import TravelOverviewList from '../../components/travel-overview/TravelOverviewList';

import * as actionCreators from '../../store/actions/index';


class TravelSearch extends Component {
  componentDidMount() {
    this.props.getSearchTravel(this.props.match.params.query);
  }

  render() {
    return (
      <div className="travelSearch">
        <Typography variant="h4" gutterBottom align="left" color="textPrimary" style={{ marginTop: 8, padding: 16 }}>
            Search
        </Typography>
        <TravelOverviewList travelList={this.props.searchTravels} is_mypage={false} />
        <Divider style={{ margin: 8 }} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSearchTravel: (query) => dispatch(actionCreators.getSearchTravel(query)),
  };
};

const mapStateToProps = (state) => {
  return {
    searchTravels: state.travel.searchTravels,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TravelSearch));
