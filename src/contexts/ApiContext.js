import React, { Component } from 'react';
import UserAPIService from '../services/user-api-service';

const userContext = React.createContext({
  get userId() {
    return localStorage.getItem('user_id');
  },
  newComment: [],
  newStory: [],
  users: [],
  stories: [],
  error: null,
  setUserId: () => {},
  clearError: () => {},
  addStory: () => {},
  updateUser: () => {},
  toggleSideDrawer: () => {},
  closeBackdrop: () => {},
  setUsers: () => {},
  setError: () => {},
  setStories: () => {},
});

export default userContext;

export class UserProvider extends Component {
  state = {
    userId: localStorage.getItem('user_id'),
    users: [],
    newComment: [],
    stories: [],
    sideDrawerOpen: false,
    error: null,
    authorName: '',
  };
  setUsers = (users) => {
    this.setState({ users });
  };
  setStories = (stories) => {
    this.setState({ stories });
  };
  setUserId = (userId) => {
    this.setState({ userId: localStorage.setItem('user_id', userId) });
  };

  addComment = (newComment) => {
    this.setState([...this.state.newComment, newComment]);
  };
  addStory = (newStory) => {
    this.setState([...this.state.stories, newStory]);
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

  getUserNameById = (id) => {
    UserAPIService.getUserById(id).then((res) =>
      this.setState({ authorName: res.username })
    );
  };

  render() {
    const value = {
      userId: this.state.userId,
      error: this.state.error,
      users: this.state.users,
      newComment: this.state.newComment,
      newStory: this.state.newStory,
      sideDrawerOpen: this.state.sideDrawerOpen,
      stories: this.state.stories,
      clearError: this.clearError,
      setUserId: this.setUserId,
      closeBackdrop: this.handleBackdropClose,
      toggleSideDrawer: this.drawerToggleClickHandler,
      setUsers: this.setUsers,
      addComment: this.addComment,
      addStory: this.addStory,
      setStories: this.setStories,
    };
    return (
      <userContext.Provider value={value}>
        {this.props.children}
      </userContext.Provider>
    );
  }
}
