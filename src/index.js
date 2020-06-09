import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/app/App";
// we'll use this later for styling, especially for story toolbar
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { UserProvider } from "./contexts/ApiContext";
import {
  fas,
  faSignOutAlt,
  faHome,
  faPlusSquare,
  faBars,
  faUserTimes,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";

library.add(fab, fas, faSignOutAlt, faHome, faPlusSquare, faBars, faUserTimes,faTrashAlt);

ReactDOM.render(
  // deleted history prop, if we run into errors later.
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>,
  document.getElementById("root")
);
