import React from 'react';
import ReactDOM from 'react-dom';
import CreateStoryForm from './CreateStoryForm';
import { BrowserRouter } from 'react-router-dom';

describe('CreateStoryForm Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <CreateStoryForm />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
