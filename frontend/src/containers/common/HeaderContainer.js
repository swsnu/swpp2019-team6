import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/common/Header';
import * as actionCreators from '../../store/actions/index';

const tempUser = {
  email: 'swpp@snu.ac.kr',
  nickname: 'iluvswpp',
  profile: '/images/13.jpeg',
};

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
    axios.post('/api/user/auth/verify/', { token: localStorage.getItem('token') })
      .catch((res) => {
        if (res.response.status === 400) {
          // eslint-disable-next-line no-alert
          alert('please login first');
        }
      });
  }

  onLogoutClicked = (e) => {
    this.props.onLogout();
  }

  onMyPageClicked = (e) => {
    this.props.history.push(`/user/${this.state.currentUser.nickname}`);
  }

  onSearchInputChanged = (e) => {
    this.setState({ searchText: e.target.value });
  }

  onSearchButtonClicked = (e) => {
    this.props.history.push(`/search?tag=${this.state.searchText}`);
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer));
