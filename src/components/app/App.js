import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// import PrivateRoute from '../Utils/PrivateRoute';
import "./App.css";
import PublicOnlyRoute from "../Utils/PublicOnlyRoute";
import Toolbar from "../Nav/Toolbar/Toolbar";
import SideDrawer from "../Nav/SideDrawer/SideDrawer";
import Backdrop from "../Nav/Backdrop/Backdrop";
import Footer from "../Footer/Footer";
import DashboardPage from "../../routes/DashboardPage/DashboardPage";
import LandingPage from "../../routes/LandingPage/LandingPage";
import LoginPage from "../../routes/LoginPage/LoginPage";
import NotFoundPage from "../../routes/NotFoundPage/NotFoundPage";
import RegistrationPage from "../../routes/RegistrationPage/RegistrationPage";
import CreateStoryPage from "../../routes/CreateStoryPage/CreateStoryPage";
import CreateCommentForm from "../CreateCommentForm/CreateCommentForm";
import PoliciesPage from "../../routes/PoliciesPage/PoliciesPage";
import StoryPage from "../../routes/StoryPage/StoryPage";
import userContext from "../../contexts/ApiContext";
import "./App.css";

let userID = localStorage.getItem("user_id");

export default class App extends Component {
  state = {
    error: "",
    hasError: false,
  };

  static contextType = userContext;

  populateStories = (dbStories) => {
    this.setState({
      stories: [...this.state.stories, dbStories],
    });
  };

  handleUpdateUser = (user) => {
    return this.setState({
      user,
    });
  };
  render() {
    let backdrop;
    if (this.context.sideDrawerOpen) {
      backdrop = <Backdrop />;
    }
    return (
      <div className="container">
        <Toolbar />
        <SideDrawer show={this.context.sideDrawerOpen} />
        {backdrop}
        <main>
          {this.state.hasError && <p className="red">{this.state.error}</p>}
          <Switch>
            <PublicOnlyRoute exact path={"/"} component={LandingPage} />
            <PublicOnlyRoute path={"/login"} component={LoginPage} />
            <PublicOnlyRoute path={"/register"} component={RegistrationPage} />
            {/* private */}
            <Route path={"/dashboard"} component={DashboardPage} />
            {/* Private */}
            <Route path={"/create"} component={CreateStoryPage} />
            {/* private route */}
            <Route path={"/comment/"} component={CreateCommentForm} />
            {/* <Route
                path={'/comment/edit/:id'}
                component={CreateStoryPage} /> */}
            <Route path={"/story/:id"} component={StoryPage} />
            {/* private route */}
            <Route path={"/story/edit/:id"} component={CreateStoryPage} />
            <Route path={"/policies"} component={PoliciesPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}
