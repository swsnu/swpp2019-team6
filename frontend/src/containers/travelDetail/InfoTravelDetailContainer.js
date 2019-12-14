import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../store/actions/index';
import InfoTravelDetail from '../../components/travelDetail/InfoTravelDetail';

class InfoTravelDetailContainer extends Component {
  componentDidMount() {
    this.props.getOneRawTravel(this.props.match.params.id);
  }

  onForkButtonClicked = (user_id, travel_id) => {
    console.log(`user ${user_id} wants to fork travel ${travel_id}.`);
  }

  render() {
    return (
      <div>
        {this.props.thisTravel ? (
          <div className="infoTravelDetail">
            <InfoTravelDetail
              travel={this.props.thisTravel}
              onForkButtonClicked={this.onForkButtonClicked}
            />
          </div>
        ) : (
          <span />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    thisTravel: state.travel.oneRawTravel,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    getOneRawTravel: (id) => dispatch(actionCreators.getOneRawTravel(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InfoTravelDetailContainer));
