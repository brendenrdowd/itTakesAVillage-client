import React from 'react';
import ReactDOM from 'react-dom';
import StoryPage from './StoryPage';
import { BrowserRouter } from 'react-router-dom';

describe('StoryPage Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <StoryPage />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
