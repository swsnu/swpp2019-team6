import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

import AuthForm from "../../components/auth/AuthForm";

class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };

  componentDidMount() {}

  onChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onLogin(this.state.username, this.state.password);
  };
  
  render() {
    return (
      <AuthForm
        type="login"
        form={this.state}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        error={null}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (username, password) => {
      dispatch(
        actionCreators.login({ username: username, password: password })
      );
    },

  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
