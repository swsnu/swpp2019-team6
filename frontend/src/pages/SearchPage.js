import React, { Component } from 'react';
import queryString from 'query-string';
import HeaderContainer from '../containers/common/HeaderContainer';
import TravelSearch from '../containers/travel-overview/TravelSearch';

class SearchPage extends Component {
  render() {
    return (
      <div className="searchPage">
        <HeaderContainer />
        <TravelSearch />
      </div>
    );
  }
}

export default SearchPage;
