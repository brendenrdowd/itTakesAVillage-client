import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userContext from '../../../contexts/ApiContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TokenService from '../../../services/token-service';
// import './NavLinks.css'

export class NavLinks extends Component {
  state = {
    loggedIn: TokenService.hasAuthToken(),
    _isMounted: false,
  };
  static contextType = userContext;

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.setState({ loggedIn: false });
  };

  closeModal = () => {
    this.context.closeBackdrop();
  };

  componentDidMount() {
    this.setState({ _isMounted: true });
  }

  componentDidUpdate() {
    if (this.state._isMounted)
      if (TokenService.hasAuthToken() !== this.state.loggedIn) {
        this.setState({ loggedIn: TokenService.hasAuthToken() });
      }
  }
  componentWillUnmount() {
    this.setState({ _isMounted: false });
  }

  render() {
    let links;
    if (this.state.loggedIn) {
      links = [
        <li onClick={this.closeModal} key='3' className='tooltip'>
          <Link to='/dashboard'>
            <FontAwesomeIcon icon='home' />{' '}
            <span className='tooltiptext'>Home</span>
          </Link>
        </li>,
        <li onClick={this.closeModal} key='4' className='tooltip'>
          <Link to='/create'>
            <FontAwesomeIcon icon='plus-square' />{' '}
            <span className='tooltiptext'>New Story</span>
          </Link>
        </li>,
        <li onClick={this.closeModal} key='5' className='tooltip'>
          <Link onClick={this.handleLogoutClick} to='/'>
            <FontAwesomeIcon icon='sign-out-alt' />{' '}
            <span className='tooltiptext'>Log Out</span>
          </Link>
        </li>,
      ];
    } else {
      links = [
        <li onClick={this.closeModal} key='2'>
          <Link to='/login'> Log in</Link>
        </li>,
        <li onClick={this.closeModal} key='1'>
          <Link to='/register'> Sign Up</Link>
        </li>,
      ];
    }
    return <ul>{links}</ul>;
  }
}

export default NavLinks;
