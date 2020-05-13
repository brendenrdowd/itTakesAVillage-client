import React from 'react'
import { Link } from 'react-router-dom'
import NavLinks from '../NavLinks/NavLinks'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'
import './Toolbar.css'

const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
      <div className="toolbar__logo"><Link to="/">It Takes a Village</Link></div>
      <div className="spacer"></div>
      <div className="toolbar__toggle">
        <DrawerToggleButton />
      </div>
      <div className="toolbar__navitgation-items">
        <NavLinks />
      </div>
    </nav>
  </header>
)

export default toolbar