import React, { Component } from 'react';
import queryString from 'query-string';
import HeaderContainer from '../containers/common/HeaderContainer';
import SearchTravelOverviewList from '../containers/travel-overview/SearchTravelOverviewList';

class MainPage extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <HeaderContainer />
        <SearchTravelOverviewList tag={queryString.parse(this.props.location.search).tag} />
      </div>
    );
  }
}

export default MainPage;
