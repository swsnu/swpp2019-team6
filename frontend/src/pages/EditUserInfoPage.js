import React, { Component } from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import EditUserInfoContainer from '../containers/user-info-edit/EditUserInfoContainer';

class EditUserInfoPage extends Component {
  render() {
    return (
      <div className="editUserInfoPage">
        <HeaderContainer />
        <EditUserInfoContainer id={this.props.match.params.id} />
      </div>
    );
  }
}

export default EditUserInfoPage;
