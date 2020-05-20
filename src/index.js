<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import history from "./history";
import App from "./components/app/App";
// we'll use this later for styling, especially for story toolbar
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faSignOutAlt,
  faHome,
  faPlusSquare,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
=======
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import history from './history';
import App from './components/App/App';
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { faSignOutAlt, faHome,faSearch,faBars } from '@fortawesome/free-solid-svg-icons'
import './index.css';
import { UserProvider } from './contexts/ApiContext';
>>>>>>> rupi

library.add(fab, faSignOutAlt, faHome, faPlusSquare, faBars);

ReactDOM.render(
<<<<<<< HEAD
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
=======
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
>>>>>>> rupi
);
