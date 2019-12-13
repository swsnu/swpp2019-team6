import React, { Component } from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import TravelDetail from '../containers/travelDetail/TravelDetail';
import InfoTravelDetailContainer from '../containers/travelDetail/InfoTravelDetailContainer';

class TravelDetailPage extends Component {
  render() {
    return (
      <div className="TravelDetail">
        <HeaderContainer />
        <InfoTravelDetailContainer />
        <TravelDetail />
      </div>
    );
  }
}

export default TravelDetailPage;
