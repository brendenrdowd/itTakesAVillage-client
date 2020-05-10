import React from 'react'
import NavLinks from '../NavLinks/NavLinks'
import './SideDrawer.css'

const SideDrawer = props => {
  let drawerClasses = 'side-drawer'
  if(props.show){
    drawerClasses = 'side-drawer open'
  }

  return(
    <nav className={drawerClasses}>
      <NavLinks />
    </nav>
  )
}

export default SideDrawer