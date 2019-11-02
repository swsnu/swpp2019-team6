import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import Header from '../../components/common/Header';

const tempUser = {
  email: 'swpp@snu.ac.kr',
  nickname: 'iluvswpp',
  profile: null,
};

// function: onLogoutClicked, onMyPageClicked, onSearchInputChanged, onSearchButtonClicked


class HeaderContainer extends Component {
  state = {
    currentUser: tempUser,
    searchText: '',
  };

  componentDidMount() {
  }

  onLogoutClicked = (e) => {
  }

  onMyPageClicked = (e) => {
  }

  onSearchInputChanged = (e) => {
    this.setState({ searchText: e.target.value });
  }

  onSearchButtonClicked = (e) => {
  }


  render() {
    return (
      <Header
        user={this.state.currentUser}
        searchText={this.state.searchText}
        onLogoutClicked={this.onLogoutClicked}
        onMyPageClicked={this.onMyPageClicked}
        onSearchInputChanged={this.onSearchInputChanged}
        onSearchButtonClicked={this.onSearchButtonClicked}
      />
    );
  }
}

export default HeaderContainer;
