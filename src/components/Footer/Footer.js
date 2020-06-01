import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

// Linked policies page from terms of use
const Footer = () => {
  return (
    <div id='footer'>
      Built with React Ⓒ 2020 
      <Link to='/policies'>Terms of use</Link>
    </div>
  );
};

export default Footer;
