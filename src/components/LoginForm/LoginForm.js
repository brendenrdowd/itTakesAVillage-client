import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/ApiContext';
import TokenService from '../../services/token-service';
import { Input, Button } from '../Utils/Utils';
import './LoginForm.css';

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {},
  };
  static contextType = UserContext;

  state = { error: null };

  handleSubmitJwtAuth = (ev) => {
    ev.preventDefault();
    this.setState({ error: null });
    const { username, password } = ev.target;

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then((res) => {
        console.log(this.context.userId);
        username.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken);
        this.context.setUserId(res.userId);
        this.props.onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className='LoginForm' onSubmit={this.handleSubmitJwtAuth}>
        <div role='alert'>
          {error && <p className='login-error'>{error}</p>}
        </div>
        <div className='username'>
          <label htmlFor='LoginForm__username'>Username</label>{' '}
          <Input
            type='text'
            required
            name='username'
            id='LoginForm__username'
          ></Input>
        </div>

        <div className='password'>
          <label htmlFor='LoginForm__password'>Password</label>{' '}
          <Input
            required
            name='password'
            type='password'
            id='LoginForm__password'
          ></Input>
        </div>
        <Button type='submit'>Login</Button>
      </form>
    );
  }
}

export default LoginForm;
