import React, { Component } from 'react';
import { connect } from 'react-redux';


import TravelOverviewBlock from '../../components/travel-overview/TravelOverviewBlock';

class OneTravelOverview extends Component {
  // have to retrieve travel by using this.props.travelId

  render() {
    return (
      <div>
        {this.props.thisTravel && ('id' in this.props.thisTravel) ? (
          <div className="oneTravelOverview">
            <TravelOverviewBlock
              travelOverviewItem={this.props.thisTravel}
              is_mypage={false}
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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getOneRawTravel: (travel_id) => dispatch(actionCreators.getOneRawTravel(travel_id)),
//   };
// };

export default connect(mapStateToProps, null)(OneTravelOverview);
