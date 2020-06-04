import React, { Component } from 'react';
import { Input, Button, Required } from '../Utils/Utils';
import validator from 'validator';
import { postcodeValidator } from 'postcode-validator';
import UserApiService from '../../services/user-api-service';
import './IndividualRegForm.css';
import ValidationError from './ValidationError';
import userContext from '../../contexts/ApiContext';

export default class IndividualRegForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        touched: false,
      },
      username: {
        value: '',
        touched: false,
      },
      email: {
        value: '',
        touched: false,
      },
      location: {
        value: '',
        touched: false,
      },
      password: {
        value: '',
        touched: false,
      },
      repeatPassword: {
        value: '',
        touched: false,
      },
      error: null,
      usernameError: null,
    };
  }

  static defaultProps = {
    onRegistrationSuccess: () => {},
  };

  static contextType = userContext;

  componentDidMount() {
    this.context.clearError();
    UserApiService.getAllUsers()
      .then(this.context.setUsers)
      .catch(this.context.setError);
  }

  updateName(name) {
    this.setState({
      name: {
        value: name,
        touched: true,
      },
    });
  }
  updateUsername(username) {
    this.setState({
      username: {
        value: username,
        touched: true,
      },
    });
    this.validateUsername(username);
  }
  updateEmail(email) {
    this.setState({
      email: {
        value: email,
        touched: true,
      },
    });
  }
  updateZipcode(location) {
    this.setState({
      location: {
        value: location,
        touched: true,
      },
    });
  }
  updatePassword(password) {
    this.setState({
      password: {
        value: password,
        touched: true,
      },
    });
  }

  updateRepeatPassword(repeatPassword) {
    this.setState({
      repeatPassword: {
        value: repeatPassword,
        touched: true,
      },
    });
  }

  validateName() {
    const name = this.state.name.value;
    if (name.length === 0) {
      return 'Please enter name';
    } else if (name.match(/[0-9]/)) {
      return 'Name should not contain any numbers';
    }
  }
  validateUsername() {
    const username = this.state.username.value;
    // const { users } = this.context;
    // const sortUsersByUsername = users.map((user) => user.username);
    // const userTaken = sortUsersByUsername.includes(username);

    UserApiService.checkUsername(username).then((exists) => {
      if (exists) {
        this.setState({ usernameError: 'Username already taken' });
      } else {
        this.setState({ usernameError: null });
      }
    });

    // console.log(sortUsersByUsername);

    // console.log(users, sortUsersByUsername);
    // if (username.length === 0) {
    //   return 'Please enter username';
    // } else if (userTaken) {
    //   return 'Username already taken';
    // }
  }

  validateEmail() {
    const email = this.state.email.value;
    if (email.length === 0) {
      return 'Enter an email address';
    } else if (!validator.isEmail(email)) {
      return 'Enter a valid email address';
    }
  }
  validateZipcode() {
    const location = this.state.location.value;

    if (location.length === 0) {
      return 'Enter a zip code';
    } else if (!postcodeValidator(location, 'US')) {
      return 'Enter a valie zip code';
    }
  }

  validatePassword() {
    const password = this.state.password.value.trim();
    const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\S]/;
    if (password.length === 0) {
      return 'Password is required';
    } else if (password.length < 8 || password.length > 72) {
      return 'Password must be between 8 and 72 characters long';
    } else if (!password.match(REGEX_UPPER_LOWER_NUMBER_SPECIAL)) {
      return 'Password must contain at least one number and one uppercase letter';
    }
  }

  validateRepeatPassword() {
    const repeatPassword = this.state.repeatPassword.value.trim();
    const password = this.state.password.value.trim();

    if (repeatPassword !== password) {
      return 'Passwords do not match';
    }
  }

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
  };
  render() {
    const { error, usernameError } = this.state;
    const nameError = this.validateName();
    // const usernameError = this.validateUsername();
    const emailError = this.validateEmail();
    const locationError = this.validateZipcode();
    const passwordError = this.validatePassword();
    const repeatPasswordError = this.validateRepeatPassword();
    return (
      <form className='IndividualRegForm' onSubmit={this.handleSubmit}>
        <div role='alert'>{error && <p className='red'>{error}</p>}</div>
        <div className='name'>
          <label htmlFor='IndividualRegForm__name'>
            Full name: <Required />
          </label>
          <Input
            name='name'
            placeholder='joe doe'
            type='text'
            id='IndividualRegForm__name'
            onChange={(e) => this.updateName(e.target.value)}
          ></Input>
          {this.state.name.touched && (
            <ValidationError message={nameError}></ValidationError>
          )}
        </div>
        <div className='username'>
          <label htmlFor='IndividualRegForm__username'>
            Username: <Required />
          </label>
          <Input
            name='username'
            placeholder='joedoe'
            type='text'
            id='IndividualRegForm__username'
            onChange={(e) => this.updateUsername(e.target.value)}
          ></Input>
          {this.state.username.touched && (
            <ValidationError message={usernameError}></ValidationError>
          )}
        </div>
        <div className='email'>
          <label htmlFor='IndividualRegForm__email'>
            Email: <Required />
          </label>
          <Input
            name='email'
            type='text'
            id='IndividualRegForm__email'
            onChange={(e) => this.updateEmail(e.target.value)}
          ></Input>
          {this.state.email.touched && (
            <ValidationError message={error}></ValidationError>
          )}
        </div>
        <div className='location'>
          <label htmlFor='IndividualRegForm__location'>
            Zip code: <Required />
          </label>
          <Input
            name='location'
            placeholder='88888'
            type='text'
            id='IndividualRegForm__location'
            onChange={(e) => this.updateZipcode(e.target.value)}
          ></Input>
          {this.state.location.touched && (
            <ValidationError message={locationError}></ValidationError>
          )}
        </div>
        <div className='password'>
          <label htmlFor='IndividualRegForm__password'>
            Password: <Required />
          </label>
          <Input
            name='password'
            placeholder='Password123'
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
            placeholder='Password123'
            type='password'
            id='IndividualRegForm__password'
            onChange={(e) => this.updateRepeatPassword(e.target.value)}
          ></Input>
          {this.state.repeatPassword.touched && (
            <ValidationError message={repeatPasswordError}></ValidationError>
          )}
        </div>
        <Button
          type='submit'
          disabled={
            this.validateName() ||
            this.validateUsername() ||
            this.validateEmail() ||
            this.validateZipcode() ||
            this.validatePassword() ||
            this.validateRepeatPassword()
          }
        >
          Sign up
        </Button>
      </form>
    );
  }
}
