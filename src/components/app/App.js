import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ApiContext from "../../contexts/ApiContext";
import PrivateRoute from "../Utils/PrivateRoute";
import PublicOnlyRoute from "../Utils/PublicOnlyRoute";
// import all the routes
import DashboardPage from "../../routes/DashboardPage/DashboardPage";
import LandingPage from "../../routes/LandingPage/LandingPage";
import LoginPage from "../../routes/LoginPage/LoginPage";
import NotFoundPage from "../../routes/NotFoundPage/NotFoundPage";
import RegistrationPage from "../../routes/RegistrationPage/RegistrationPage";
import CreateStoryPage from "../../routes/CreateStoryPage/CreateStoryPage";
import PoliciesPage from "../../routes/PoliciesPage/PoliciesPage";
import StoryPage from "../../routes/StoryPage/StoryPage";
import "./App.css";
import Store from "../../dummystore";

// string
const users = Store.users.map((item) => item.name);
// arrays
const stories = Store.stories;
const comments = Store.comments;

class App extends Component {
  // what is our state going to look like?
  state = {
    error: "",
    hasError: false,
    user: "",
    help: [],
    stories: [],
    comments: [],
  };

  componentDidMount() {
    this.setState({
      // need to validate if single user or all users (HH)
      user: users,
      stories: stories,
      comments: comments,
    });
  }

  addComment = (comments) => {
    this.setState({
      comments: [...this.state.comments, comments],
    });
    // for testing remove after
    console.log("comments", this.state.comments);
  };

  addStory = (stories) => {
    this.setState({
      stories: [...this.state.stories, stories],
    });
    // for testing remove after
    console.log("stories", this.state.stories);
  };

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
      addStory: this.addStory,
      addComment: this.addComment,
      addHelp: this.addHelp,
    };
    return (
      <ApiContext.Provider value={value}>
        <div className="App container">
          <main>
            {this.state.hasError && <p className="red">{this.state.error}</p>}
            <Switch>
              <PublicOnlyRoute exact path={"/"} component={LandingPage} />
              <PublicOnlyRoute path={"/login"} component={LoginPage} />
              <PublicOnlyRoute
                path={"/register"}
                component={RegistrationPage}
              />
              <Route path={"/dashboard"} component={DashboardPage} />
              {/* <PrivateRoute path="/create" component={CreateStoryPage} /> */}
              <Route
                path="/create"
                render={(props) => <CreateStoryPage {...props} />}
              />
              <Route path="/story/:id" component={StoryPage} />
              <Route path="/policies" component={PoliciesPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
