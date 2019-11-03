import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/common/Header';
import * as actionCreators from '../../store/actions/index';

// function: onLogoutClicked, onMyPageClicked, onSearchInputChanged, onSearchButtonClicked

/*
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `JWT ${localStorage.getItem('token')}`,
  },
};
*/
class HeaderContainer extends Component {
  state = {
    currentUser: JSON.parse(localStorage.getItem('user')),
    searchText: '',
  };

  componentDidMount() {
    axios.get('/api/user/search/test/')
      .catch((res) => {
        if (res.response.status === 401) {
          alert('please login first');
        }
      });
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
    if (this.state.currentUser) {
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
    return (
      <Redirect to="/login" />
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

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderContainer);
