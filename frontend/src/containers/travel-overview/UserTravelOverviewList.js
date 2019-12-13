import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { push } from 'connected-react-router';
import TravelOverviewList from '../../components/travel-overview/TravelOverviewList';
import CreateTravelButton from '../../components/user-info/CreateTravelButton';

import * as actionCreators from '../../store/actions/index';

// somehow determine whether this page is of current user or not.
// get user's travel list by using this.props.id

class UserTravelOverviewList extends Component {
  componentDidMount() {
    this.props.onGetUserTravels(this.props.id);
  }

  handleClickCreate = (e) => {
    this.props.history.push('/travel/create/');
  }

  onDeleteClicked = (travel_id) => {
    console.log('onDeleteClicked!');
    console.log(travel_id);
  }

  render() {
    return (
      <div>
        <div style={{ marginBottom: 24 }} />
        <div>
          {this.props.is_mypage ? (
            <Grid container alignItems="center" direction="column" justify="space-around">
              <CreateTravelButton handleClickCreate={this.handleClickCreate} />
            </Grid>
          ) : (
            <span />
          )}
        </div>
        {this.props.userTravels && this.props.userTravels.length ? (
          <div className="userTravelOverview">
            <Typography align="left" color="primary" variant="h5" style={{ marginTop: 8, marginBottom: 8 }}>
              My Travel Plans
            </Typography>
            <TravelOverviewList
              travelList={this.props.userTravels}
              is_mypage={this.props.is_mypage}
              onDeleteClicked={this.onDeleteClicked}
            />
            <Divider style={{ margin: 8 }} />
          </div>
        ) : (
          <Typography align="center" color="textSecondary" variant="h5" style={{ marginTop: 24 }}>
            Make your first plan for a travel!
          </Typography>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUserTravels: (user_id) => dispatch(actionCreators.getUserTravels(user_id)),

  };
};

const mapStateToProps = (state) => {
  return {
    userTravels: state.travel.userTravels,
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserTravelOverviewList));
