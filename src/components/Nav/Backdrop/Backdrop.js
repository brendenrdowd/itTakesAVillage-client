import React, { Component } from 'react'
import ApiContext from '../../../contexts/ApiContext'
import './Backdrop.css'

export class Backdrop extends Component {
  static contextType = ApiContext;
  render() {
    return (
      <div className="backdrop" onClick={this.context.closeBackdrop} />
    )
  }
}

export default Backdrop
