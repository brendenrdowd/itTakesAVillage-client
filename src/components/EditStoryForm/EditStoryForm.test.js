import React from 'react';
import ReactDOM from 'react-dom';
import EditStoryForm from './EditStoryForm';
import { BrowserRouter } from 'react-router-dom';

describe('EditStoryForm Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <EditStoryForm />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
