import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
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
    // for validation
    password_checked: null,
    nickname_checked: null,
    password_helperText: '',
    nickname_helperText: '',
    profilePhoto: null,
    profilePhotoChanged: false,
    imagePreviewUrl: null,
  }

  async componentDidMount() {
    await this.props.getUser(this.props.match.params.id);

    axios.get(`/api/user/${this.props.match.params.id}/profile_photo/`)
      .then(
        (res) => {
          alert('get profile photo success');

          const imgUrl = res.data.profile_photo;
          console.log(imgUrl);
          this.setState({
            imagePreviewUrl: imgUrl,
          });
        },
      )
      .catch(
        (err) => {
          alert('get profile photo fail');
          console.log(err);
        },
      );


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
    if (which.includes('Password')) {
      this.setState({ password_checked: null });
      this.setState((prevState) => {
        const password_checked = (prevState.confirmNewPasswordField
          && (prevState.newPasswordField === prevState.confirmNewPasswordField));
        // can insert validation check for password here. modifying let password_checked
        return {
          password_helperText: (password_checked ? 'Valid password' : 'Must match password'),
          password_checked: password_checked,
        };
      });
    } else if (which.includes('Nickname')) {
      this.setState({ nickname_checked: null });
      this.setState({ nickname_helperText: '' });
    }
  }

  clickCheckNickname = () => {
    if (!this.state.newNicknameField) {
      this.setState({ nickname_checked: false });
      this.setState({ nickname_helperText: 'Enter your nickname' });
      return;
    }

    let nickname_checked = null;
    axios.get(`/api/user/check/nickname/${this.state.newNicknameField}/`)
      .then((res) => {
        nickname_checked = !res.data.check;
        this.setState({ nickname_checked: nickname_checked });
        this.setState({ nickname_helperText: (nickname_checked ? 'Available Nickname' : 'Nickname already in use. Try another') });
      });
  }

  onPasswordConfirmed = () => {
    // send currentPasswordField and newPasswordField to backend
    // apply changed user info
    axios.put(`/api/user/${this.props.user.id}/`,
      {
        current_password: this.state.currentPasswordField,
        new_password: this.state.newPasswordField,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(
        (res) => {
          console.log(res);
          this.setState({
            currentPasswordField: '',
            newPasswordField: '',
            confirmNewPasswordField: '',
            password_checked: null,
            password_helperText: '',
            passwordExpanded: false,
          });
        },
      )
      .catch(
        (res) => {
          alert('Wrong current password');
          this.setState({
            currentPasswordField: '',
          });
        },
      );
  }

  onNicknameConfirmed = () => {
    // send newNicknameField to backend
    // apply changed user info
    axios.put(`/api/user/${this.props.user.id}/`,
      { nickname: this.state.newNicknameField },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(
        async (res) => {
          await this.props.getUser(this.props.match.params.id);
          this.setState({ newNicknameField: this.props.user.nickname });
          this.setState({ nickname_checked: null });
          this.setState({ nickname_helperText: '' });
        },
      )
      .catch(
        (res) => {
          alert('cannot change nickname');
        },
      );
    this.setState({ nicknameExpanded: false });
  }

  onMessageConfirmed = () => {
    // send newMessageField to backend
    // apply changed user info
    axios.put(`/api/user/${this.props.user.id}/`,
      { status_message: this.state.newMessageField },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(
        async (res) => {
          await this.props.getUser(this.props.match.params.id);
          this.setState({ newMessageField: this.props.user.status_message });
        },
      )
      .catch(
        (res) => {
          alert('cannot change status message');
        },
      );
    this.setState({ messageExpanded: false });
  }

  onChangeProfilePhoto = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        profilePhoto: file,
        profilePhotoChanged: true,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  onClickProfilePhotoConfirm = () => {
    const form_data = new FormData();
    form_data.append('profile_photo', this.state.profilePhoto, this.state.profilePhoto.name);
    axios.put(`/api/user/${this.props.user.id}/profile_photo/`, form_data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }).then((res) => {
      alert('success');
      console.log(res.data);
    })
      .catch((err) => {
        alert('fail');
        console.log(err);
      });
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
              password_checked={this.state.password_checked}
              password_helperText={this.state.password_helperText}
              nickname_checked={this.state.nickname_checked}
              nickname_helperText={this.state.nickname_helperText}
              clickCheckNickname={this.clickCheckNickname}
              profilePhoto={this.state.profilePhoto}
              onChangeProfilePhoto={this.onChangeProfilePhoto}
              imagePreviewUrl={this.state.imagePreviewUrl}
              profilePhotoChanged={this.state.profilePhotoChanged}
              onClickProfilePhotoConfirm={this.onClickProfilePhotoConfirm}
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
