import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LoginPage.css';

export class LoginPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  // Takes user to dashboard upon successful login
  handleLoginSuccess = () => {
    const { history } = this.props;
    history.push('/dashboard');
  };

  // The following credentials are a QuickStart login for presentation purposes
  render() {
    return (
      <section className='LoginPage'>
        <>
          <header>
            <h2>
              Please use the following login credentials to experience{' '}
              <font color='green'>It Takes A Village</font>:
            </h2>
            <h1>
              <p>Username: Tester</p>
              <p>Password: Password123</p>
            </h1>
          </header>
        </>
        ,<h2>Login</h2>
        <LoginForm onLoginSuccess={this.handleLoginSuccess} />
      </section>
    );
  }
}

export default LoginPage;
