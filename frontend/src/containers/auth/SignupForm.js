import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import { Link } from 'react-router-dom';

// import AuthForm from '../../components/auth/AuthForm';
// import {AuthFormBlock, StyledInput , Footer, ButtonWithMarginTop, ErrorMessage } from '../../components/auth/AuthForm';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../../components/common/Button';

import axios from 'axios'

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

/**
 * 스타일링된 input
 */
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

/**
 * 폼 하단에 로그인 혹은 회원가입 링크를 보여줌
 */
const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;


/**
 * 에러를 보여줍니다
 */
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

class SignupForm extends Component {
  state = {
    email: '',
    password: '',
    password_confirm: '',
    nickname: '',
    password_checked: false,
    // email_checked: null,
    // nickname_checked: false,
  };

  componentDidMount() {

  }

  // shouldComponentUpdate(nextProps,nextState){
  //   console.log(this.state.email_checked)
  //   return true;
  // }
  onChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  alertCheck = (checked) => {
    let alertMessage = checked ? 'Available' : 'Duplicate. Try another'
    alert(alertMessage)
  }

  clickCheckEmail = () => {
    if (!this.state.email) {
      alert('Please enter your email')
      return
    }

    let email_checked = null;
    axios.get('/api/user/check/email/' + this.state.email)
      .then(res => {
        email_checked = !res.data.check
        this.alertCheck(email_checked)
      })

  }
  clickCheckNickname = () => {
    if (!this.state.nickname) {
      alert('Please enter your nickname')
      return
    }

    let nickname_checked = null;
    axios.get('/api/user/check/nickname/' + this.state.nickname)
      .then(res => {
        nickname_checked = !res.data.check
        this.alertCheck(nickname_checked)
      })
  }


  clickCheckPassword = () => {
    if(!this.state.password || !this.state.password_confirm){
      alert('Enter your password')
      return
    }
    const password_checked = !!this.state.password && this.state.password_confirm === this.state.password
    this.setState({ password_checked: password_checked })
    const alertMesaage = password_checked ? 'Vaild Password' : 'Must match password'
    alert(alertMesaage)
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.props.onSignup(
      this.state.email,
      this.state.password,
      this.state.nickname,
    );
  };

  render() {
    const error = null
    return (
      <AuthFormBlock>
        <h3>Sign Up</h3>
        <StyledInput
          autoComplete="email"
          name="email"
          placeholder="email"
          onChange={this.onChange}
          value={this.state.email}
        />
        <Button onClick={this.clickCheckEmail}>
          Check Email Duplicate
        </Button>
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="Password"
          type="password"
          onChange={this.onChange}
          value={this.state.password}
        />
        <StyledInput
          autoComplete="new-password"
          name="password_confirm"
          placeholder="Confirm Password"
          type="password"
          onChange={this.onChange}
          value={this.state.password_confirm}
        />
        <Button onClick={this.clickCheckPassword}>
          Check Password Confirmation
        </Button>
        <StyledInput
          autoComplete="nickname"
          name="nickname"
          placeholder="Nickname"
          onChange={this.onChange}
          value={this.state.nickname}
        />
        <Button onClick={this.clickCheckNickname}>
          Check Nickname Duplicate
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonWithMarginTop cyan fullWidth style={{ marginTop: '1rem' }} onClick={this.onSubmit}>
          Sign Up
          </ButtonWithMarginTop>
        <Footer>
          <Link to="/login">Log In</Link>
        </Footer>

      </AuthFormBlock>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//     email_checked : state.userReducer.email_checked,
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    onSignup: (email, password, nickname) => {
      dispatch(
        actionCreators.signup({
          email: email,
          password: password,
          nickname: nickname,
        }),
      );
    },
    // onCheckEmail: (email) => {
    //   dispatch(
    //     actionCreators.checkEmail({
    //       email: email,
    //     })
    //   )
    // },
  };
};


export default connect(
  // mapStateToProps,
  null,
  mapDispatchToProps,
)(SignupForm);
