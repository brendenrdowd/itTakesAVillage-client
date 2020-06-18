import React from 'react';
import ReactDOM from 'react-dom';
import CreateCommentForm from './CreateCommentForm';
import { BrowserRouter } from 'react-router-dom';

describe('CreateCommentForm Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <CreateCommentForm />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
