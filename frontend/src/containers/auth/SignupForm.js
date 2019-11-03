import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';


import * as actionCreators from '../../store/actions/index';

import Button from '../../components/common/Button';
import { FormControl, Footer } from '../../components/auth/SignupForm';

class SignupForm extends Component {
    state = {
      email: '',
      password: '',
      password_confirm: '',
      nickname: '',
      password_checked: null,
      email_checked: null,
      nickname_checked: null,
      email_helperText: '',
      password_helperText: '',
      nickname_helperText: '',
    };

    // alertMessage = (message) => {
    //     return this.state.alertOn ? alert(message) : null
    // }
    onChange = (e) => {
      const { value, name } = e.target;
      this.setState({ [name]: value });
      this.setState({ [`${name}_checked`]: null });
    };
    // alertCheck = (checked) => {
    //     let alertMessage = checked ? 'Available' : 'Already in use. Try another'
    //     this.alertMessage(alertMessage)
    // }


    clickCheckEmail = () => {
      if (!this.state.email) {
        // this.alertMessage('Please enter your email')
        this.setState({ email_checked: false });
        this.setState({ email_helperText: 'Enter your email' });
        return;
      }

      let email_checked = null;
      axios.get(`/api/user/check/email/${this.state.email}`)
        .then((res) => {
          email_checked = !res.data.check;
          this.setState({ email_checked: email_checked });
          this.setState({ email_helperText: (email_checked ? 'Available Email' : 'Email already in use. Try another') });

          // this.alertCheck(email_checked)
        });
    }

    clickCheckNickname = () => {
      if (!this.state.nickname) {
        // this.alertMessage('Please enter your nickname')
        this.setState({ nickname_checked: false });
        this.setState({ nickname_helperText: 'Enter your nickname' });
        return;
      }

      let nickname_checked = null;
      axios.get(`/api/user/check/nickname/${this.state.nickname}`)
        .then((res) => {
          nickname_checked = !res.data.check;
          this.setState({ nickname_checked: nickname_checked });
          this.setState({ nickname_helperText: (nickname_checked ? 'Available Nickname' : 'Nickname already in use. Try another') });
          // this.alertCheck(nickname_checked)
        });
    }


    clickCheckPassword = () => {
      if (!this.state.password || !this.state.password_confirm) {
        // this.alertMessage('Please enter your password')
        this.setState({ password_checked: false });
        this.setState({ password_helperText: 'Enter your password' });
        return;
      }

      // eslint-disable-next-line max-len, react/no-access-state-in-setstate
      const password_checked = (!!this.state.password && this.state.password_confirm === this.state.password);
      this.setState({ password_checked: password_checked });
      this.setState({ password_helperText: (password_checked ? 'Vaild Password' : 'Must match password') });
      // this.alertMessage(alertMesaage)
    }

    clickSubmit = () => {
      if (this.state.email_checked && this.state.password_checked && this.state.password_checked) {
        const newUserInfo = {
          email: this.state.email,
          password: this.state.password,
          nickname: this.state.nickname,
        };
        this.props.onSignup(newUserInfo);
        // this.props.history.push('/login')
      } else {
        this.clickCheckEmail();
        this.clickCheckPassword();
        this.clickCheckNickname();
      }
    }

    render() {
      return (
        <div className="SignupForm">
          <div>
            <FormControl
              id="email"
              validated={this.state.email_checked}
              label="Email"
              name="email"
              value={this.state.email}
              helperText={this.state.email_helperText}
              onChange={this.onChange}
            />
            <Button id="checkEmail" onClick={this.clickCheckEmail}>Check Email</Button>
            <FormControl
              id="password"
              validated={this.state.password_checked}
              label="Password"
              name="password"
              type="password"
              value={this.state.password}
              helperText={this.state.password_helperText}
              onChange={this.onChange}
            />
            <FormControl
              id="password_confirm"
              validated={this.state.password_checked}
              label="Password Confirmation"
              name="password_confirm"
              type="password"
              value={this.state.password_confirm}
              onChange={this.onChange}
              helperText={this.state.password_helperText}
            />
            <Button id="checkPassword" onClick={this.clickCheckPassword}>Check Password Confirmation</Button>
            <FormControl
              id="nickname"
              validated={this.state.nickname_checked}
              label="Nickname"
              name="nickname"
              value={this.state.nickname}
              helperText={this.state.nickname_helperText}
              onChange={this.onChange}
            />
            <Button id="checkNickname" onClick={this.clickCheckNickname}>Check Nickname</Button>
          </div>
          <div>
            <br />
            <Button
              id="submit"
              onClick={this.clickSubmit}
            >Sign in
            </Button>
            <br />

          </div>
          <Footer>
            <Link to="/login">Log In</Link>
          </Footer>
        </div>
      );
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSignup: (userInfo) => {
      dispatch(
        actionCreators.signup(userInfo),
      );
    },
  };
};


export default connect(
  null,
  mapDispatchToProps,
)(SignupForm);
