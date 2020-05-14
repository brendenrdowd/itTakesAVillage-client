import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

export default class LoginPage extends Component {
  static defaultProps = {
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { history } = this.props
    history.push("/dashboard")
  }

  render() {
    return (
      <section className='LoginPage'>
        <h2>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />

      </section>
    )
  }
}
