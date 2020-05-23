import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import history from './history';
import App from './components/App/App';
// we'll use this later for styling, especially for story toolbar
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { UserProvider } from './contexts/ApiContext';
import {
  faSignOutAlt,
  faHome,
  faPlusSquare,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import './index.css';

library.add(fab, faSignOutAlt, faHome, faPlusSquare, faBars);

ReactDOM.render(
  <Router history={history}>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>,
  document.getElementById('root')
);
