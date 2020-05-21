import React, { Component } from 'react';

const userContext = React.createContext({
  userId: [],
  error: null,
  setUserId: (userId) => {
    localStorage.setItem('user_id', userId);
  },
  clearError: () => {},
  stories: [],
  comments: [],
  user: {},
  addStory: () => {},
  addComment: () => {},
  updateUser: () => {},
  toggleSideDrawer: () => {},
  closeBackdrop: () => {},
});
export default userContext;

export class UserProvider extends Component {
  state = {
    userId: [],
    error: null,
  };

  setUserId = (userId) => {
    this.setState({ userId });
  };
  clearError = () => {
    this.setState({ error: null });
  };

  render() {
    const value = {
      userId: localStorage.getItem('user_id'),
      error: this.state.error,
      clearError: this.clearError,
      setUserId: this.setUserId,
    };
    return (
      <userContext.Provider value={value}>
        {this.props.children}
      </userContext.Provider>
    );
  }
}
