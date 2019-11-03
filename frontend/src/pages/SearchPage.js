import React, { Component } from 'react';
import queryString from 'query-string';
import HeaderContainer from '../containers/common/HeaderContainer';
import SearchTravelOverviewList from '../containers/travel-overview/SearchTravelOverviewList';

class SearchPage extends Component {
  render() {
    return (
      <div className="searchPage">
        <HeaderContainer />
        <SearchTravelOverviewList tag={queryString.parse(this.props.location.search).tag} />
      </div>
    );
  }
}

export default SearchPage;
