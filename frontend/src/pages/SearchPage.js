import React, { Component } from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SearchTravelOverviewList from '../containers/travel-overview/SearchTravelOverviewList';

class MainPage extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <SearchTravelOverviewList />
      </div>
    );
  }
}

export default MainPage;
