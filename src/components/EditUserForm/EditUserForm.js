import React, { Component } from 'react'
import { Input, Button, Required } from '../Utils/Utils';
import { postcodeValidator } from 'postcode-validator';
import ValidationError from '../IndividualRegForm/ValidationError';
import UserApiService from '../../services/user-api-service';

export class EditUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      // password: "",
      location: "",
      error: ""
    }
  }

  componentDidMount() {
    UserApiService.getUserById(localStorage.getItem("user_id"))
      .then(user => {
        const { username, location } = user
        this.setState({ username, location })
      })
  }

  updatePassword(password) {
    this.setState({ password })
  }
  updateUsername(username) {
    this.setState({ username })
  }
  updateLocation(location) {
    this.setState({ location })
  }

  validateUsername() {
    const username = this.state.username;
    if (username.length === 0) {
      return 'Please enter username';
    }
  }
  // Checks if zip code is a valid US 5 digit zip code
  validateZipcode() {
    const location = this.state.location;
    if (location.length === 0) {
      return 'Enter a zip code';
    } else if (!postcodeValidator(location, 'US')) {
      return 'Enter a valid zip code';
    }
  }

  validatePassword() {
    const password = this.state.password.trim();
    const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\S]/;
    if (password.length === 0) {
      return 'Password is required';
    } else if (password.length < 8 || password.length > 72) {
      return 'Password must be between 8 and 72 characters long';
    } else if (!password.match(REGEX_UPPER_LOWER_NUMBER_SPECIAL)) {
      return 'Password must contain at least one number and one uppercase letter';
    }
  }
  // Checks if the repeated password matches first password
  validateRepeatPassword() {
    const repeatPassword = this.state.repeatPassword.trim();
    const password = this.state.password.trim();

    if (repeatPassword !== password) {
      return 'Passwords do not match';
    }
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const {
      username,
      location,
      // password,
      // repeatPassword,
    } = ev.target;

    this.setState({ error: null });

    UserApiService.updateUser({
      username: username.value,
      location: location.value,
      // password: password.value,
      // repeatPassword: repeatPassword.value,
    })
      .then((user) => {
        username.value = '';
        location.value = '';
        // password.value = '';
        // repeatPassword.value = '';
        this.props.onUpdateSuccess(user);
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const usernameError = this.validateUsername();
    const locationError = this.validateZipcode();
    // const passwordError = this.validatePassword();
    // const repeatPasswordError = this.validateRepeatPassword();
    return (
      // need to update class name, but keeping styles for now
      <form className='IndividualRegForm' onSubmit={this.handleSubmit}>
        <div className='username'>
          <label htmlFor='IndividualRegForm__username'>
            Username: <Required />
          </label>
          <Input
            name='username'
            value={this.state.username}
            type='text'
            id='IndividualRegForm__username'
            onChange={(e) => this.updateUsername(e.target.value)}
          ></Input>
          {this.state.username.touched && (
            <ValidationError message={usernameError}></ValidationError>
          )}
        </div>
        <div className='location'>
          <label htmlFor='IndividualRegForm__location'>
            Zip code: <Required />
          </label>
          <Input
            name='location'
            value={this.state.location}
            type='text'
            id='IndividualRegForm__location'
            onChange={(e) => this.updateLocation(e.target.value)}
          ></Input>
          {this.state.location.touched && (
            <ValidationError message={locationError}></ValidationError>
          )}
        </div>
        {/* <div className='password'>
          <label htmlFor='IndividualRegForm__password'>
            Password: <Required />
          </label>
          <Input
            name='password'
            value={this.state.password}
            type='password'
            id='IndividualRegForm__password'
            onChange={(e) => this.updatePassword(e.target.value)}
          ></Input>
          {this.state.password.touched && (
            <ValidationError message={passwordError}></ValidationError>
          )}
        </div>
        <div className='re-enter-password'>
          <label htmlFor='IndividualRegForm__password'>
            Repeat password: <Required />
          </label>
          <Input
            name='repeatPassword'
            type='password'
            id='IndividualRegForm__password'
            onChange={(e) => this.updateRepeatPassword(e.target.value)}
          ></Input>
          {this.state.repeatPassword.touched && (
            <ValidationError message={repeatPasswordError}></ValidationError>
          )}
        </div> */}
        <Button
          type='submit'
          disabled={
            this.validateUsername() ||
            this.validateZipcode()
          }
        >
          Update
        </Button>
      </form>
    )
  }
}

export default EditUserForm
