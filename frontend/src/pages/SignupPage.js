import React, { Component } from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import SignupForm from '../containers/auth/SignupForm';

class SignupPage extends Component {
  render() {
    return (
      <div>
        <AuthTemplate>
          <SignupForm />
        </AuthTemplate>
      </div>
    );
  }
}

export default SignupPage;
