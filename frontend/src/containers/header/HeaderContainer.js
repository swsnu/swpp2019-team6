import React, { Component } from 'react';

import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actionCreators from '../../store/actions/index';
import Header from '../../components/common/Header';

class HeaderContainer extends Component {
  state = {
  };

  componentDidMount() {}

  onLogout = () => {
    this.props.onLogout();
  };

  render() {
    return (
      <Header
        user={localStorage.getItem('user')}
        onLogout={this.onLogout}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(actionCreators.logout());
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(HeaderContainer);
