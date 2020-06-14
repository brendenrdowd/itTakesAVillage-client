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

  handleSubmit = (ev) => {
    ev.preventDefault();
    const {
      username,
      location,
    } = ev.target;

    this.setState({ error: null });

    UserApiService.updateUser({
      username: username.value,
      location: location.value,
    })
      .then((user) => {
        username.value = '';
        location.value = '';
        this.props.onUpdateSuccess(user);
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const usernameError = this.validateUsername();
    const locationError = this.validateZipcode();
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
