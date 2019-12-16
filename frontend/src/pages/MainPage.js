import React, { Component } from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import RecentTravelOverviewList from '../containers/travel-overview/RecentTravelOverviewList';
import PopularTravelOverviewList from '../containers/travel-overview/PopularTravelOverviewList';

class MainPage extends Component {
  render() {
    return (
      <div className="mainPage">
        <HeaderContainer />
        <div
          style={{
            marginLeft: 24,
            marginRight: 24,
          }}
        >
          <PopularTravelOverviewList />
          <RecentTravelOverviewList />
        </div>
      </div>
    );
  }
}

export default MainPage;
