import React from 'react';
import ReactDOM from 'react-dom';
import Toolbar from './Toolbar';
import { BrowserRouter } from 'react-router-dom';

describe('Toolbar Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter> <Toolbar /> </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})