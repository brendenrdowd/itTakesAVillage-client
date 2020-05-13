import React, { Component } from 'react';
// import LoginForm from '../../components/LoginForm/LoginForm';

<<<<<<< HEAD
export class LoginPage extends Component {
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
=======
export default class LoginPage extends Component {
  render() {
    return <section></section>;
>>>>>>> a78c223c8833932e6ef710d9213bf175db4fe15e
  }
}
