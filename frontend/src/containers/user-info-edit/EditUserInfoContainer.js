import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import EditUserInfo from '../../components/user-info-edit/EditUserInfo';

const tempUser = {
  nickname: 'iluvswpp',
  email: 'iluvswpp@snu.ac.kr',
  register_date: '2019.10.10',
  status_message: 'Pharetra diam sit amet nisl suscipit adipiscing bibendum est. Imperdiet dui accumsan sit amet nulla facilisi morbi. Sagittis orci a scelerisque purus semper eget.',
  num_plans: 4,
  num_likes: 45,
  num_forked: 3,
  user_photo: '/images/13.jpeg',
};

// somehow have to get current user info
// from this.params.nickname
class EditUserInfoContainer extends Component {
  state = {
    currentUser: tempUser,
    passwordExpanded: false,
    nicknameExpanded: false,
    messageExpanded: false,
    currentPasswordField: '',
    newPasswordField: '',
    confirmNewPasswordField: '',
    newNicknameField: tempUser.nickname,
    newMessageField: tempUser.status_message,
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
      this.setState({ newNicknameField: tempUser.nickname });
    } else if (which === 'messageExpanded') {
      this.setState({ newMessageField: tempUser.status_message });
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
        {this.state.currentUser ? (
          <div className="editUserInfo">
            <EditUserInfo
              email={this.state.currentUser.email}
              nickname={this.state.currentUser.nickname}
              message={this.state.currentUser.status_message}
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

export default EditUserInfoContainer;
