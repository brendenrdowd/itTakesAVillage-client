import React, { Component } from 'react';
import EditUserForm from '../../components/EditUserForm/EditUserForm';

export default class EditUserPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };
  // Directs user to dashboard page after they successfully update their profile
  handleUpdateSuccess = (user) => {
    const { history } = this.props;
    history.push('/dashboard');
  };

  render() {
    return (
      <section className='RegistrationPage'>
        <h2>Sign up</h2>
        <EditUserForm onUpdateSuccess={this.handleUpdateSuccess} />
      </section>
    );
  }
}
