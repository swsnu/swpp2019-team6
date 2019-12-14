import React, { Component } from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import TravelDetail from '../containers/travelDetail/TravelDetail';
import InfoTravelDetailContainer from '../containers/travelDetail/InfoTravelDetailContainer';
import RecommendedTravelOverviewList from '../containers/travel-overview/RecommendedTravelOverviewList';
import CommentsLikeContainer from '../containers/travelDetail/CommentsLikeContainer';

class TravelDetailPage extends Component {
  render() {
    return (
      <div className="TravelDetail">
        <HeaderContainer />
        <InfoTravelDetailContainer />
        <TravelDetail />
        <RecommendedTravelOverviewList />
        <CommentsLikeContainer />
      </div>
    );
  }
}

export default TravelDetailPage;
