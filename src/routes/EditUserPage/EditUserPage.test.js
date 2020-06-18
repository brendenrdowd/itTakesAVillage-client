import React from 'react';
import ReactDOM from 'react-dom';
import EditUserPage from './EditUserPage';
import { BrowserRouter } from 'react-router-dom';

describe('EditUserPage Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <EditUserPage />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
