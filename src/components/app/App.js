import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ApiContext from '../../contexts/ApiContext';
// import PrivateRoute from '../Utils/PrivateRoute'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import Footer from '../../components/Footer/Footer';
// import all the routes
// import DashboardPage from '../../routes/DashboardPage/DashboardPage'
// import LandingPage from '../../routes/LandingPage/LandingPage'
// import LoginPage from '../../routes/LoginPage/LoginPage'
// import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import './App.css';

class App extends Component {
  state = {};

  render() {
    const value = {};
    return (
      <ApiContext.Provider value={value}>
        <div className='App container'>
          <main>
            {this.state.hasError && <p className='red'>{this.state.error}</p>}
            <Switch>
              {/* <PublicOnlyRoute
                exact
                path={'/'}
                component={LandingPage}
              /> */}
              {/* <PublicOnlyRoute
                path={'/login'}
                component={LoginPage}
              /> */}
              <PublicOnlyRoute
                path={'/register'}
                component={RegistrationPage}
              />
              {/* <PrivateRoute
                path={'/dashboard'}
                component={DashboardPage}
              /> */}
              {/* <Route
                component={NotFoundPage}
              /> */}
            </Switch>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
