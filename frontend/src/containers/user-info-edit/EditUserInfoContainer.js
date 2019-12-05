import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import * as actionCreators from '../../store/actions/index';

import EditUserInfo from '../../components/user-info-edit/EditUserInfo';
/*
const tempUser = {
  id: 1,
  nickname: 'iluvswpp',
  email: 'iluvswpp@snu.ac.kr',
  register_date: '2019.10.10',
  status_message: 'Pharetra diam sit amet nisl suscipit adipiscing bibendum est.
   Imperdiet dui accumsan sit amet nulla facilisi morbi. Sagittis orci a 
   scelerisque purus semper eget.',
  num_plans: 4,
  num_likes: 45,
  num_forked: 3,
  user_photo: '/images/13.jpeg',
};
*/


// somehow have to get current user info
// from this.params.id
class EditUserInfoContainer extends Component {
  state = {
    passwordExpanded: false,
    nicknameExpanded: false,
    messageExpanded: false,
    currentPasswordField: '',
    newPasswordField: '',
    confirmNewPasswordField: '',
    newNicknameField: '',
    newMessageField: '',
  }

  async componentDidMount() {
    await this.props.getUser(this.props.match.params.id);
    this.setState({ newNicknameField: this.props.user.nickname });
    this.setState({ newMessageField: this.props.user.status_message });
  }

  onOpenClicked = (which) => {
    this.setState({ [which]: true });
  }

  onCloseClicked = (which) => {
    this.setState({ [which]: false });
    if (which === 'passwordExpanded') {
      this.setState({ currentPasswordField: '' });
      this.setState({ newPasswordField: '' });
      this.setState({ confirmNewPasswordField: '' });
    } else if (which === 'nicknameExpanded') {
      this.setState({ newNicknameField: this.props.user.nickname });
    } else if (which === 'messageExpanded') {
      this.setState({ newMessageField: this.props.user.status_message });
    }
  }

  onInputChanged = (e, which) => {
    this.setState({ [which]: e.target.value });
  }

  onPasswordConfirmed = () => {
    // send currentPasswordField, newPasswordField, confirmNewPasswordField to backend
    // apply changed user info
    this.setState({ passwordExpanded: false });
  }

  onNicknameConfirmed = () => {
    // send newNicknameField to backend
    // apply changed user info
    this.setState({ nicknameExpanded: false });
  }

  onMessageConfirmed = () => {
    // send newMessageField to backend
    // apply changed user info
    this.setState({ messageExpanded: false });
  }

  render() {
    return (
      <div>
        {this.props.user ? (
          <div className="editUserInfo">
            <EditUserInfo
              email={this.props.user.email}
              nickname={this.props.user.nickname}
              message={this.props.user.status_message}
              passwordExpanded={this.state.passwordExpanded}
              nicknameExpanded={this.state.nicknameExpanded}
              messageExpanded={this.state.messageExpanded}
              onOpenClicked={this.onOpenClicked}
              onCloseClicked={this.onCloseClicked}
              currentPasswordField={this.state.currentPasswordField}
              newPasswordField={this.state.newPasswordField}
              confirmNewPasswordField={this.state.confirmNewPasswordField}
              newNicknameField={this.state.newNicknameField}
              newMessageField={this.state.newMessageField}
              onInputChanged={this.onInputChanged}
              onPasswordConfirmed={this.onPasswordConfirmed}
              onNicknameConfirmed={this.onNicknameConfirmed}
              onMessageConfirmed={this.onMessageConfirmed}
            />
          </div>
        ) : (
          <Typography variant="h4" style={{ marginTop: 8, padding: 16 }}>
            No user found
          </Typography>
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


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditUserInfoContainer));
