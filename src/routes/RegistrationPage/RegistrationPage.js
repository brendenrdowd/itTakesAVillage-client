import React, { Component } from 'react';
import IndividualRegForm from '../../components/IndividualRegForm/IndividualRegForm';
// import OrganizationRegForm from '../../components/OrganizationRegForm/OrganizationRegForm';

export default class RegistrationPage extends Component {
  render() {
    return (
      <section>
        <h2>Sign up</h2>
        <IndividualRegForm />
      </section>
    );
  }
}
