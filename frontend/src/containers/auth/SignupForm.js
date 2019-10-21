import React, { Component } from 'react';

import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import AuthForm from '../../components/auth/AuthForm';


class SignupForm extends Component {

    state = {
       email: '',
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
        this.props.onSignup(this.state.email, this.state.password, this.state.nickname);
    }

    render() {
        return (
            <AuthForm
            type="signup"
            form={this.state}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            error={null}
            />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onSignup: (email, password, nickname) => {
            dispatch(
              actionCreators.signUp({ email: email, password: password, nickname: nickname })
            );
          },
    }
}

export default connect(null, mapDispatchToProps)(SignupForm);