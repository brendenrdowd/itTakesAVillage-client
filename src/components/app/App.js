import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../Utils/PrivateRoute";
import PublicOnlyRoute from "../Utils/PublicOnlyRoute";
import Nav from "../../components/Nav/Nav";
import Footer from '../../components/Footer/Footer'
import ApiContext from "../../contexts/ApiContext";
// import all the routes
import DashboardPage from "../../routes/DashboardPage/DashboardPage";
import LandingPage from "../../routes/LandingPage/LandingPage";
import LoginPage from "../../routes/LoginPage/LoginPage";
import NotFoundPage from "../../routes/NotFoundPage/NotFoundPage";
import RegistrationPage from "../../routes/RegistrationPage/RegistrationPage";
import CreateStoryPage from "../../routes/CreateStoryPage/CreateStoryPage";
import PoliciesPage from "../../routes/PoliciesPage/PoliciesPage";
import StoryPage from "../../routes/StoryPage/StoryPage";

import Store from "../../dummystore";
import "./App.css";

export default class App extends Component {
  // what is our state going to look like?
  state = {
    error: "",
    hasError: false,
    user: {},
    help: [], //won't need this
    stories: [],
    comments: [],
  };
  stories = Store.stories;
  comments = Store.comments;

  componentDidMount() {
    this.setState({
      // need to validate if single user or all users (HH)
      user: this.user,
      stories: this.stories,
      comments: this.comments,
    });
  }

  handleAddComment = (comments) => {
    this.setState({
      comments: [...this.state.comments, comments],
    });
    // for testing remove after
    console.log("comments", this.state.comments);
  };

  handleAddStory = (stories) => {
    this.setState({
      stories: [...this.state.stories, stories],
    });
    // for testing remove after
    console.log("stories", this.state.stories);
  };

  handleUpdateUser = user => {
    return this.setState({
      user
    })
  }

  // won't need this
  addHelp = (help) => {
    this.setState({
      help: [...this.state.help, help],
    });
    // for testing remove after
    console.log("help", this.state.help);
  };

  render() {
    // what is our context going to look like?
    const value = {
      user: this.state.user,
      stories: this.state.stories,
      comments: this.state.comments,
      addStory: this.handleAddStory,
      addComment: this.handleAddComment,
      addHelp: this.addHelp, //won't need this
      updateUser:this.handleUpdateUser
    };
    return (
      <ApiContext.Provider value={value}>
        <div className='container'>
          <Nav />
          <main>
            {this.state.hasError && <p className="red">{this.state.error}</p>}
            <Switch>
              <PublicOnlyRoute exact path={"/"} component={LandingPage} />
              <PublicOnlyRoute path={"/login"} component={LoginPage} />
              <PublicOnlyRoute exact path={"/"} component={LandingPage} />
              <PublicOnlyRoute path={"/login"} component={LoginPage} />
              <PublicOnlyRoute
                path={"/register"}
                component={RegistrationPage}
              />
              {/* private */}
              <Route path={"/dashboard"} component={DashboardPage} />
              {/* Private */}
              <Route path={"/create"} component={CreateStoryPage} />
              {/* private route */}
              {/* we need to load the commentComponent instead of the createStory component, probably by indicating with props... */}
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
      </ApiContext.Provider>
    );
  }
}