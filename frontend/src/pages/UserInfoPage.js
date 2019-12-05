import React, { Component } from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import UserInfoSectionContainer from '../containers/user-info/UserInfoSectionContainer';
import UserTravelOverviewList from '../containers/travel-overview/UserTravelOverviewList';

class UserInfoPage extends Component {
  render() {
    return (
      <div className="userInfoPage">
        <HeaderContainer />
        <UserInfoSectionContainer id={this.props.match.params.id} />
        <UserTravelOverviewList id={this.props.match.params.id} />
      </div>
    );
  }
}

export default UserInfoPage;
