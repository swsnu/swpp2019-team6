import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/common/Header';
import * as actionCreators from '../../store/actions/index';
// function: onLogoutClicked, onMyPageClicked, onSearchInputChanged, onSearchButtonClicked


class HeaderContainer extends Component {
  state = {
    currentUser: JSON.parse(localStorage.getItem('user')),
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
    console.log(this.state.currentUser);
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
