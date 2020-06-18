import React from 'react';
import ReactDOM from 'react-dom';
import PoliciesPage from './PoliciesPage';
import { BrowserRouter } from 'react-router-dom';

describe('PoliciesPage Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <PoliciesPage />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
