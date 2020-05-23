import React, { Component } from 'react';
import userContext from '../../../contexts/ApiContext';
import './Backdrop.css';

export class Backdrop extends Component {
  static contextType = userContext;
  render() {
    return <div className='backdrop' onClick={this.context.closeBackdrop} />;
  }
}

export default Backdrop;
