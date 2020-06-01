import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import validator from 'validator';

const Footer = () => {
  return (
    <div id='footer'>
      Built with React Ⓒ 2020 
      <Link to='/policies'>Terms of use</Link>
    </div>
  );
};

export default Footer;
