import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import TravelOverviewList from '../../components/travel-overview/TravelOverviewList';

import * as actionCreators from '../../store/actions/index';

class CollaboratorTravelOverviewList extends Component {
  componentDidMount() {
    this.props.onGetCollaboratorTravels(this.props.id);
  }

  render() {
    return (
      <div>
        {this.props.collaboratorTravels && this.props.collaboratorTravels.length ? (
          <div className="collaboratorTravelOverview">
            <Typography align="left" color="primary" variant="h5" style={{ marginTop: 24, marginBottom: 8 }}>
              On Collaboration
            </Typography>
            <TravelOverviewList
              travelList={this.props.collaboratorTravels}
              is_mypage={this.props.is_mypage}
              for_collaborator
            />
            <Divider style={{ margin: 8 }} />
          </div>
        ) : (
          <span />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCollaboratorTravels: (user_id) => dispatch(actionCreators.getCollaboratorTravels(user_id)),
  };
};

const mapStateToProps = (state) => {
  return {
    collaboratorTravels: state.travel.collaboratorTravels,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorTravelOverviewList);
