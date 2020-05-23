import React, { Component } from 'react';

const userContext = React.createContext({
  get userId() {
    return localStorage.getItem('user_id');
  },
  newComment: [],
  error: null,
  setUserId: () => {},
  clearError: () => {},
  stories: [],
  addStory: () => {},
  updateUser: () => {},
  toggleSideDrawer: () => {},
  closeBackdrop: () => {},
  setUsers: () => {},
});

export default userContext;

export class UserProvider extends Component {
  state = {
    userId: [],
    users: [],
    newComment: [],
    sideDrawerOpen: false,
    error: null,
  };
  setUsers = (users) => {
    this.setState({ users });
  };
  setUserId = (userId) => {
    this.setState({ userId: localStorage.setItem('user_id', userId) });
  };

  addComment = (newComment) => {
    this.setState([...this.state.newComment, newComment]);
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
      userId: localStorage.getItem('user_id'),
      error: this.state.error,
      sideDrawerOpen: this.state.sideDrawerOpen,
      clearError: this.clearError,
      setUserId: this.setUserId,
      closeBackdrop: this.handleBackdropClose,
      toggleSideDrawer: this.drawerToggleClickHandler,
      setUsers: this.setUsers,
      addComment: this.addComment,
    };
    return (
      <userContext.Provider value={value}>
        {this.props.children}
      </userContext.Provider>
    );
  }
}
