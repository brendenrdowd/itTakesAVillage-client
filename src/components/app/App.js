import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import Nav from '../../components/Nav/Nav';
import ApiContext from '../../contexts/ApiContext'
// import all the routes
import DashboardPage from '../../routes/DashboardPage/DashboardPage';
import LandingPage from '../../routes/LandingPage/LandingPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import CreateStoryPage from '../../routes/CreateStoryPage/CreateStoryPage';
import PoliciesPage from '../../routes/PoliciesPage/PoliciesPage';
import StoryPage from '../../routes/StoryPage/StoryPage';
import './App.css';

export default class App extends Component {
  // what is our state going to look like?
  state = {
    error: '',
    hasError: false,
  };

  render() {
    // what is our context going to look like?
    const value = {};
    return (
      <ApiContext.Provider value={value}>
        <div className='App container'>
          <main>
            {this.state.hasError && <p className='red'>{this.state.error}</p>}
            <Switch>
              <PublicOnlyRoute
                exact
                path={'/'}
                component={LandingPage} />
              <PublicOnlyRoute
                path={'/login'}
                component={LoginPage} />
              <PublicOnlyRoute
                path={'/register'}
                component={RegistrationPage} />
              {/* private */}
              <Route
                path={'/dashboard'}
                component={DashboardPage} />
              {/* Private */}
              <Route
                path={'/create'}
                component={CreateStoryPage} />
                {/* private route */}
                {/* we need to load the commentComponent instead of the createStory component, probably by indicating with props... */}
              {/* <Route
                path={'/comment/edit/:id'}
                component={CreateStoryPage} /> */}
              <Route
                path={'/story/:id'}
                component={StoryPage} />
              {/* private route */}
              <Route
                path={'/story/edit/:id'}
                component={CreateStoryPage} />
              <Route
                path={'/policies'}
                component={PoliciesPage} />
              <Route
                component={NotFoundPage} />
            </Switch>
          </main>
        </div>
      </ApiContext.Provider>
    );
  }
}
