import React, { Component } from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import EditUserInfoContainer from '../containers/user-info-edit/EditUserInfoContainer';

class EditUserInfoPage extends Component {
  render() {
    return (
      <div className="editUserInfoPage">
        <HeaderContainer />
        <EditUserInfoContainer nickname={this.props.match.params.nickname} />
      </div>
    );
  }
}

export default EditUserInfoPage;
