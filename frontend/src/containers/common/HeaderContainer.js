import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import Header from '../../components/common/Header';

const tempUser = {
  email: 'swpp@snu.ac.kr',
  nickname: 'iluvswpp',
  profile: null,
};

class HeaderContainer extends Component {
  state = {
    currentUser: tempUser,
  };

  render() {
    return <Header user={this.state.currentUser} />;
  }
}

export default HeaderContainer;
