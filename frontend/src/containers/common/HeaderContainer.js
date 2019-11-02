import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/common/Header';
import * as actionCreators from '../../store/actions/index';

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
    this.props.onLogout();
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
