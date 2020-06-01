import React, { Component } from 'react';
import IndividualRegForm from '../../components/IndividualRegForm/IndividualRegForm';
import './RegistrationPage.css';

export default class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => { },
    },
  };
  // Directs user to login page is they successfully sign up
  handleRegistrationSuccess = (user) => {
    const { history } = this.props;
    history.push('/login');
  };

  render() {
    return (
      <section className='RegistrationPage'>
        <h2>Sign up</h2>
        {/* we'll add the conditional buttons here for organization v individual */}
        <IndividualRegForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
}
