import React, { Component } from "react";

const userContext = React.createContext({
  userId: [],
  error: null,
  setUserId: () => {},
  clearError: () => {},
  stories: [],
  addStory: () => {},
  updateUser: () => {},
  toggleSideDrawer: () => {},
  closeBackdrop: () => {},
});

export default userContext;

export class UserProvider extends Component {
  state = {
    userId: [],
    sideDrawerOpen: false,
    error: null,
  };

  setUserId = (userId) => {
    this.setState({ userId: localStorage.setItem("user_id", userId) });
  };
  clearError = () => {
    this.setState({ error: null });
  };
  handleBackdropClose = () => {
    this.setState({ sideDrawerOpen: false });
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  render() {
    const value = {
      userId: localStorage.getItem("user_id"),
      error: this.state.error,
      sideDrawerOpen: this.state.sideDrawerOpen,
      clearError: this.clearError,
      setUserId: this.setUserId,
      closeBackdrop: this.handleBackdropClose,
      toggleSideDrawer: this.drawerToggleClickHandler,
    };
    return (
      <userContext.Provider value={value}>
        {this.props.children}
      </userContext.Provider>
    );
  }
}
