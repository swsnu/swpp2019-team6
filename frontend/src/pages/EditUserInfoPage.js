import React, { Component } from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';

class EditUserInfoPage extends Component {
  render() {
    return (
      <div className="editUserInfoPage">
        <HeaderContainer />
        EditUserInfoPage:
        {this.props.match.params.nickname}
      </div>
    );
  }
}

export default EditUserInfoPage;
