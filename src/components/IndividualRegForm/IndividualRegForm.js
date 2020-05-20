import React, { Component } from 'react';
import { Input, Button, Required } from '../Utils/Utils';
import validator from 'validator';
import isValidZipcode from 'is-valid-zipcode';
import UserApiService from '../../services/user-api-service';
import './IndividualRegForm.css';
import userContext from '../../contexts/ApiContext';

// const initialState = {
//   name: '',
//   username: '',
//   email: '',
//   location: '',
//   password: '',
//   repeatPassword: '',
//   nameError: '',
//   userNameError: '',
//   emailError: '',
//   zipCodeError: '',
//   passwordError: '',
//   repeatPasswordError: '',
// };
export default class IndividualRegForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
  };

  // validation = () => {
  //   let nameError = '';
  //   let userNameError = '';
  //   let emailError = '';
  //   let zipCodeError = '';
  //   let passwordError = '';
  //   let repeatPasswordError = '';

  //   if (!this.state.name) {
  //     nameError = 'Name field is empty';
  //   }
  //   if (!this.state.username) {
  //     userNameError = 'Username field is empty';
  //   }
  //   if (!this.state.email) {
  //     emailError = 'Email field is empty';
  //   }
  //   if (!validator.isEmail(this.state.email)) {
  //     emailError = 'invalid email';
  //   }
  //   // if (!this.state.email.includes('@')) {
  //   //   emailError = 'Invalid email';
  //   // }
  //   if (!this.state.location) {
  //     zipCodeError = 'Zip code field is empty';
  //   }
  //   if (!isValidZipcode(this.state.location)) {
  //     zipCodeError = 'invalid zip code';
  //   }
  //   if (!Number(this.state.location)) {
  //     zipCodeError = 'must be numbers';
  //   }
  //   if (this.state.location.length !== 5) {
  //     zipCodeError = 'must be 5 characters long';
  //   }
  //   if (!this.state.password) {
  //     passwordError = 'Password field is empty';
  //   }
  //   if (!this.state.repeatPassword) {
  //     repeatPasswordError = 'Password field is empty';
  //   }
  //   if (this.state.repeatPassword.length !== this.state.password.length) {
  //     repeatPasswordError = 'Passwords must match';
  //   }
  //   if (
  //     nameError ||
  //     userNameError ||
  //     emailError ||
  //     zipCodeError ||
  //     passwordError ||
  //     repeatPasswordError
  //   ) {
  //     this.setState({
  //       nameError,
  //       userNameError,
  //       emailError,
  //       zipCodeError,
  //       passwordError,
  //       repeatPasswordError,
  //     });
  //     return false;
  //   }
  //   return true;
  // };
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
  };
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
        </div>
        <div className='email'>
          <label htmlFor='IndividualRegForm__email'>
            Email <Required />
          </label>
          <Input name='email' type='text' id='IndividualRegForm__email'></Input>
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
        </div>
        <Button type='submit'>Sign up</Button>
      </form>
    );
  }
}
