import React, { Component, isValidElement } from 'react';
import { Input, Button, Required, Section } from '../Utils/Utils';
// import isEmail from 'validator/lib/isEmail';
import './IndividualRegForm.css';

const initalState = {
  full_name: '',
  user_name: '',
  email: '',
  zip_code: '',
  password: '',
  re_enter_password: '',
  nameError: '',
  userNameError: '',
  emailError: '',
  zipCodeError: '',
  passwordError: '',
  reEnterPasswordError: '',
};
export default class IndividualRegForm extends Component {
  //   static defaultProps = {
  //     onRegistrationSuccess: () => {},
  //   };

  state = initalState;

  handleValue = (event) => {
    const isCheckbox = event.target.type === 'checkbox';
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  validation = () => {
    let nameError = '';
    let userNameError = '';
    let emailError = '';
    let zipCodeError = '';
    let passwordError = '';
    let reEnterPasswordError = '';

    if (this.state.full_name.length < 5) {
      nameError = 'full name must have at least 6 characters';
    }

    if (!this.state.full_name) {
      nameError = 'Name field is empty';
    }
    if (!this.state.user_name) {
      userNameError = 'Username field is empty';
    }
    if (!this.state.email) {
      emailError = 'Email field is empty';
    }
    if (nameError || userNameError) {
      this.setState({ nameError, userNameError });
      return false;
    }
    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isInputValid = this.validation();

    if (isInputValid) {
      console.log(this.state);
      this.setState(initalState);
    }
    event.target.reset();
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
        </div>
        <section className='registrationError'>
          {this.state.userNameError}
        </section>
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
        <div className='re-enter-password'>
          <label htmlFor='IndividualRegForm__password'>
            Re-enter password <Required />
          </label>
          <Input
            name='re_enter_password'
            placeholder='Password123'
            type='password'
            id='IndividualRegForm__password'
            onChange={this.handleValue}
          ></Input>
        </div>
        <Button type='submit'>Sign up</Button>
      </form>
    );
  }
}
