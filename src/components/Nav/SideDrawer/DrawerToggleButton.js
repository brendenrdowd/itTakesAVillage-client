import React, { Component } from 'react';
import userContext from '../../../contexts/ApiContext';
import './DrawerToggleButton.css';

export class DrawerToggleButton extends Component {
  static contextType = userContext;
  render() {
    return (
      <button
        aria-label='hamburger-menu'
        className='toggle-button'
        onClick={this.context.toggleSideDrawer}
      >
        <div className='toggle-button__line'></div>
        <div className='toggle-button__line'></div>
        <div className='toggle-button__line'></div>
      </button>
    );
  }
}

export default DrawerToggleButton;
