import React, { Component } from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginForm from '../containers/auth/LoginForm';

class LoginPage extends Component {
    render() {
        return (
            <div>
                <AuthTemplate>
                    <LoginForm/>
                </AuthTemplate>
            </div>
        );
    }
}

export default LoginPage;