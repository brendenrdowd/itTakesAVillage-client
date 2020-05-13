import React, { Component } from 'react';
import { Input, Button, Required } from '../Utils/Utils';
import validator from 'validator';
import isValidZipcode from 'is-valid-zipcode';
import userApiService from '../../services/user-api-service';
import './IndividualRegForm.css';

// const initialState = {
//   full_name: '',
//   user_name: '',
//   email: '',
//   zip_code: '',
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
  //   static defaultProps = {
  //     onRegistrationSuccess: () => {},
  //   };

  //   state = initialState;

  //   handleValue = (event) => {
  //     const isCheckbox = event.target.type === 'checkbox';
  //     this.setState({
  //       [event.target.name]: isCheckbox
  //         ? event.target.checked
  //         : event.target.value,
  //     });
  //   };

  //   validation = () => {
  //     let nameError = '';
  //     let userNameError = '';
  //     let emailError = '';
  //     let zipCodeError = '';
  //     let passwordError = '';
  //     let repeatPasswordError = '';
  //     const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[A-Z])(?=.*[0-9])[\S]/;

  //     if (this.state.full_name.length < 5) {
  //       nameError = 'full name must have at least 6 characters';
  //     }

  //     if (!this.state.full_name) {
  //       nameError = 'Name field is empty';
  //     }
  //     if (!this.state.user_name) {
  //       userNameError = 'Username field is empty';
  //     }
  //     if (!this.state.email) {
  //       emailError = 'Email field is empty';
  //     }
  //     if (!validator.isEmail(this.state.email)) {
  //       emailError = 'invalid email';
  //     }
  //     // if (!this.state.email.includes('@')) {
  //     //   emailError = 'Invalid email';
  //     // }
  //     if (!this.state.zip_code) {
  //       zipCodeError = 'Zip code field is empty';
  //     }
  //     if (!isValidZipcode(this.state.zip_code)) {
  //       zipCodeError = 'invalid zip code';
  //     }
  //     if (!Number(this.state.zip_code)) {
  //       zipCodeError = 'must be numbers';
  //     }
  //     if (this.state.zip_code.length !== 5) {
  //       zipCodeError = 'must be 5 characters long';
  //     }
  //     if (!this.state.password) {
  //       passwordError = 'Password field is empty';
  //     }
  //     if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(this.state.password)) {
  //       passwordError =
  //         'Password must contain at least 1 upper case letter, and a number';
  //     }
  //     if (!this.state.repeatPassword) {
  //       repeatPasswordError = 'Password field is empty';
  //     }
  //     if (this.state.repeatPassword.length !== this.state.password.length) {
  //       repeatPasswordError = 'Passwords must match';
  //     }
  //     if (
  //       nameError ||
  //       userNameError ||
  //       emailError ||
  //       zipCodeError ||
  //       passwordError ||
  //       repeatPasswordError
  //     ) {
  //       this.setState({
  //         nameError,
  //         userNameError,
  //         emailError,
  //         zipCodeError,
  //         passwordError,
  //         repeatPasswordError,
  //       });
  //       return false;
  //     }
  //     return true;
  //   };

  //   handleSubmit = (event) => {
  //     event.preventDefault();
  //     const isInputValid = this.validation();

  //     if (isInputValid) {
  //       console.log(this.state);
  //       event.target.reset();
  //       this.setState(initialState);
  //     }
  //   };

  state = { error: null }; // error and logic will come from back end

  handleSubmit = (ev) => {
    ev.preventDefault();
    const {
      full_name,
      user_name,
      email,
      zip_code,
      password,
      repeatPassword,
    } = ev.target;

    this.setState({ error: null });

    userApiService
      .postUser({
        full_name: full_name.value,
        user_name: user_name.value,
        email: email.value,
        zip_code: zip_code.value,
        password: password.value,
        repeatPassword: repeatPassword.value,
      })
      .then((user) => {
        full_name.value = '';
        user_name.value = '';
        email.value = '';
        zip_code.value = '';
        password.value = '';
        repeatPassword.value = '';
        this.props.onRegistrationSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };
  render() {
    return (
      //Name, username, email, zipcode, password, and re-enter password Inputs
      <form className='IndividualRegForm' onSubmit={this.handleSubmit}>
        {/* <div role='alert'>{error && <p className='red'>{error}</p>}</div> */}
        <div className='full_name'>
          <label htmlFor='IndividualRegForm__full_name'>
            Full name <Required />
          </label>
          <Input
            name='full_name'
            placeholder='joe doe'
            type='text'
            // required
            id='IndividualRegForm__full_name'
            onChange={this.handleValue}
          ></Input>
        </div>
        <section className='registrationError'>{this.state.nameError}</section>
        <div className='user_name'>
          <label htmlFor='IndividualRegForm__user_name'>
            Username <Required />
          </label>
          <Input
            name='user_name'
            placeholder='joedoe'
            type='text'
            id='IndividualRegForm__user_name'
            onChange={this.handleValue}
          ></Input>
          <section className='registrationError'>
            {this.state.userNameError}
          </section>
        </div>
        <div className='email'>
          <label htmlFor='IndividualRegForm__email'>
            Email <Required />
          </label>
          <Input
            name='email'
            type='text'
            id='IndividualRegForm__email'
            onChange={this.handleValue}
          ></Input>
          <section className='registrationError'>
            {this.state.emailError}
          </section>
        </div>
        <div className='zip_code'>
          <label htmlFor='IndividualRegForm__zip_code'>
            Zip code <Required />
          </label>
          <Input
            name='zip_code'
            placeholder='88888'
            type='text'
            id='IndividualRegForm__zip_code'
            onChange={this.handleValue}
          ></Input>
          <section className='registrationError'>
            {this.state.zipCodeError}
          </section>
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
            onChange={this.handleValue}
          ></Input>
        </div>
        <section className='registrationError'>
          {this.state.passwordError}
        </section>
        <div className='re-enter-password'>
          <label htmlFor='IndividualRegForm__password'>
            Repeat password <Required />
          </label>
          <Input
            name='repeatPassword'
            placeholder='Password123'
            type='password'
            id='IndividualRegForm__password'
            onChange={this.handleValue}
          ></Input>
          <section className='registrationError'>
            {this.state.repeatPasswordError}
          </section>
        </div>
        <Button type='submit'>Sign up</Button>
      </form>
    );
  }
}
