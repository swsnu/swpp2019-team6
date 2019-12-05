import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import UserInfoSection from '../../components/user-info/UserInfoSection';
import * as actionCreators from '../../store/actions/index';

/*
const tempUser = {
  id: 1,
  nickname: 'iluvswpp',
  register_date: '2019.10.10',
  status_message: 'Pharetra diam sit amet nisl suscipit adipiscing bibendum est. Imperdiet dui accumsan sit amet nulla facilisi morbi. Sagittis orci a scelerisque purus semper eget.',
  num_plans: 4,
  num_likes: 45,
  num_forked: 3,
  user_photo: '/images/13.jpeg',
};
*/

const is_mypage = true;

class UserInfoSectionContainer extends Component {
  /*
  state = {
    currentUser: tempUser,
  };
  */

  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  onEditButtonClicked = () => {
    this.props.history.push(`/user/${this.props.user.id}/edit`);
  }

  render() {
    // this.props.user
    return (
      <div>
        {this.props.user ? (
          <div className="userInfo">
            <UserInfoSection
              user={this.props.user}
              is_mypage={is_mypage}
              onEditButtonClicked={this.onEditButtonClicked}
            />
          </div>
        ) : (
          <div>
            <Typography variant="h4" style={{ marginTop: 8, padding: 16 }}>
              No user found
            </Typography>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => dispatch(actionCreators.getUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserInfoSectionContainer));
