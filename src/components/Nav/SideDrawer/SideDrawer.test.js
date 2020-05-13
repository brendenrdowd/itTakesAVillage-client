import React from 'react';
import ReactDOM from 'react-dom';
import SideDrawer from './SideDrawer';
import DrawerToggleButton from './DrawerToggleButton';
import { BrowserRouter } from 'react-router-dom';

describe('SideDrawer Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter> <SideDrawer /> </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})
describe('Drawer Toggle Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter> <DrawerToggleButton /> </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})