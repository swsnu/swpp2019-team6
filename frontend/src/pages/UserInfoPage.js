import React, { Component } from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import UserInfoSectionContainer from '../containers/user-info/UserInfoSectionContainer';
import UserTravelOverviewList from '../containers/travel-overview/UserTravelOverviewList';

class UserInfoPage extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <UserInfoSectionContainer nickname={this.props.match.params.nickname} />
        <UserTravelOverviewList nickname={this.props.match.params.nickname} />
      </div>
    );
  }
}

export default UserInfoPage;
