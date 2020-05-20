import React, { Component } from 'react';
import { Input, Button, Required } from '../Utils/Utils';
import validator from 'validator';
import isValidZipcode from 'is-valid-zipcode';
import UserApiService from '../../services/user-api-service';
import './IndividualRegForm.css';
import userContext from '../../contexts/ApiContext';

const initialState = {
  name: '',
  username: '',
  email: '',
  location: '',
  password: '',
  repeatPassword: '',
  nameError: '',
  userNameError: '',
  emailError: '',
  zipCodeError: '',
  passwordError: '',
  repeatPasswordError: '',
};
export default class IndividualRegForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { },
  };

  validation = (target) => {
    let nameError = '';
    let userNameError = '';
    let emailError = '';
    let zipCodeError = '';
    let passwordError = '';
    let repeatPasswordError = '';

    if (!target.name.value) {
      nameError = 'Name field is empty';
    }
    if (!target.username.value) {
      userNameError = 'Username field is empty';
    }
    if (!target.email.value) {
      emailError = 'Email field is empty';
    }
    if (!validator.isEmail(target.email.value)) {
      emailError = 'invalid email';
    }
    if (!target.email.value.includes('@')) {
      emailError = 'Invalid email';
    }
    if (!target.location.value) {
      zipCodeError = 'Zip code field is empty';
    }
    if (!isValidZipcode(target.location.value)) {
      zipCodeError = 'invalid zip code';
    }
    if (!Number(target.location.value)) {
      zipCodeError = 'must be numbers';
    }
    if (target.location.value.length !== 5) {
      zipCodeError = 'must be 5 characters long';
    }
    if (!target.password.value) {
      passwordError = 'Password field is empty';
    }
    if (!target.repeatPassword.value.length) {
      repeatPasswordError = 'Password field is empty';
    }
    if (target.repeatPassword.value.length !== target.password.value.length) {
      repeatPasswordError = 'Passwords must match';
    }
    this.setState({
      nameError,
      userNameError,
      emailError,
      zipCodeError,
      passwordError,
      repeatPasswordError,
    });
    if (
      nameError ||
      userNameError ||
      emailError ||
      zipCodeError ||
      passwordError ||
      repeatPasswordError
    ) {
      return false;
    }
    return true;
  };
  state = { error: null }; // error and logic will come from back end

  handleSubmit = (ev) => {
    ev.preventDefault();
    const {
      name,
      username,
      email,
      location,
      password,
      repeatPassword,
    } = ev.target;

    if (this.validation(ev.target)) {
      return;
    }
    this.setState({ error: null });

    UserApiService.postUser({
      name: name.value,
      username: username.value,
      email: email.value,
      location: location.value,
      password: password.value,
      repeatPassword: repeatPassword.value,
    })

      .then((user) => {
        name.value = '';
        username.value = '';
        email.value = '';
        location.value = '';
        password.value = '';
        repeatPassword.value = '';
        this.props.onRegistrationSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  }

  render() {
    const { error } = this.state;
    return (
      //Name, username, email, zipcode, password, and re-enter password Inputs
      <form className='IndividualRegForm' onSubmit={this.handleSubmit}>
        <div role='alert'>{error && <p className='red'>{error}</p>}</div>
        <div className='name'>
          <label htmlFor='IndividualRegForm__name'>
            Full name <Required />
          </label>
          <Input
            name='name'
            placeholder='joe doe'
            type='text'
            // required
            id='IndividualRegForm__name'
          ></Input>
          {this.state.nameError}
        </div>

        <div className='username'>
          <label htmlFor='IndividualRegForm__username'>
            Username <Required />
          </label>
          <Input
            name='username'
            placeholder='joedoe'
            type='text'
            id='IndividualRegForm__username'
          ></Input>
          {this.state.userNameError}
        </div>
        <div className='email'>
          <label htmlFor='IndividualRegForm__email'>
            Email <Required />
          </label>
          <Input name='email' type='text' id='IndividualRegForm__email'></Input>
          {this.state.emailError}
        </div>
        <div className='location'>
          <label htmlFor='IndividualRegForm__location'>
            Zip code <Required />
          </label>
          <Input
            name='location'
            placeholder='88888'
            type='text'
            id='IndividualRegForm__location'
          ></Input>
          {this.state.zipCodeError}
        </div>
        <div className='password'>
          <label htmlFor='IndividualRegForm__password'>
            Password <Required />
          </label>
          <Input
            name='password'
            placeholder='Password123'
            type='password'
            id='IndividualRegForm__password'
          ></Input>
          {this.state.passwordError}
        </div>

        <div className='re-enter-password'>
          <label htmlFor='IndividualRegForm__password'>
            Repeat password <Required />
          </label>
          <Input
            name='repeatPassword'
            placeholder='Password123'
            type='password'
            id='IndividualRegForm__password'
          ></Input>
          {this.state.repeatPasswordError}
        </div>
        <Button type='submit'>Sign up</Button>
      </form>
    );
  }
}
