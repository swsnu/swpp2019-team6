import React, { Component } from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import TravelDetail from '../containers/travelDetail/TravelDetail';

class TravelDetailPage extends Component {
  render() {
    return (
      <div className="TravelDetail">
        <HeaderContainer />
        <TravelDetail />
      </div>
    );
  }
}

export default TravelDetailPage;
