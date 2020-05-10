import React, { Component } from 'react'
import ApiContext from '../../../contexts/ApiContext'
import './DrawerToggleButton.css'

export class DrawerToggleButton extends Component {
  static contextType = ApiContext;
  render() {
    return (
      <button className="toggle-button" onClick={this.context.toggleSideDrawer}>
        <div className="toggle-button__line"></div>
        <div className="toggle-button__line"></div>
        <div className="toggle-button__line"></div>
      </button>
    )
  }
}

export default DrawerToggleButton