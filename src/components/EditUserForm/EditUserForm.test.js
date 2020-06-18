import React from 'react';
import ReactDOM from 'react-dom';
import EditUserForm from './EditUserForm';
import { BrowserRouter } from 'react-router-dom';

describe('EditUserForm Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <EditUserForm />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
