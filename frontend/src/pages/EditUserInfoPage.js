import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderContainer from '../containers/common/HeaderContainer';
import EditUserInfoContainer from '../containers/user-info-edit/EditUserInfoContainer';

class EditUserInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: JSON.parse(localStorage.getItem('user')),
      is_mypage: false,
    };
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      is_mypage: (prevState.currentUser.id === parseInt(nextProps.match.params.id, 10)),
    };
  }

  render() {
    return (
      <>
        {this.state.currentUser && this.state.is_mypage ? (
          <div className="editUserInfoPage">
            <HeaderContainer />
            <EditUserInfoContainer id={this.props.match.params.id} />
          </div>
        ) : (
          <Redirect to="/error" />
        )}
      </>
    );
  }
}

export default EditUserInfoPage;
