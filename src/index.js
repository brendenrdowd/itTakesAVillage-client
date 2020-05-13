import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// import history from './history';
import App from "./components/App/App";
// we'll use this later for styling, especially for story toolbar
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { faSignOutAlt, faHome,faSearch,faBars } from '@fortawesome/free-solid-svg-icons'
import "./index.css";

// library.add(fab,faSignOutAlt,faHome,faSearch,faBars )

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
