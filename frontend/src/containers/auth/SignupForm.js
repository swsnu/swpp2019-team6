import React, { Component } from 'react';

import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import AuthForm from '../../components/auth/AuthForm';


class SignupForm extends Component {

    state = {
       username: '',
       password: '',
       password_confirm: '',
       nickname: ''
    }

    componentDidMount(){

    }

    onChange = (e) => {
        const {value, name} = e.target;
        this.setState({[name]: value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSignup(this.state.username, this.state.password, this.state.nickname);
    }

    loginButtonHandler = () => {

    } 

    render() {
        return (
            <AuthForm
            type="signup"
            form={this.state}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onSignup: (username, password, nickname) => {
            dispatch(
              actionCreators.signUp({ username: username, password: password, nickname: nickname })
            );
          },
    }
}

export default SignupForm;