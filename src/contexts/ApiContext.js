import React, { Component } from "react";
import UserAPIService from "../services/user-api-service";

const userContext = React.createContext({
  get userId() {
    return localStorage.getItem("user_id");
  },
  newComment: [],
  error: null,
  setUserId: () => { },
  clearError: () => { },
  stories: [],
  comments: [],
  addComment: () => { },
  addStory: () => { },
  updateUser: () => { },
  toggleSideDrawer: () => { },
  closeBackdrop: () => { },
  setUsers: () => { },
  clearComments: () => { },
});

export default userContext;

export class UserProvider extends Component {
  state = {
    userId: [],
    users: [],
    comments: [],
    newComment: [],
    sideDrawerOpen: false,
    error: null,
    authorName: "",
  };
  setUsers = (users) => {
    this.setState({ users });
  };
  setUserId = (userId) => {
    this.setState({ userId: localStorage.setItem("user_id", userId) });
  };

  addComment = (newComment) => {
    this.setState({comments: [...this.state.comments, newComment]});
  };
  setComments = (comments) => {
    this.setState({comments})
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

  clearComments = () => {
    this.setState({comments: []}) 
  }

  render() {
    const value = {
      userId: localStorage.getItem("user_id"),
      error: this.state.error,
      sideDrawerOpen: this.state.sideDrawerOpen,
      clearError: this.clearError,
      setUserId: this.setUserId,
      closeBackdrop: this.handleBackdropClose,
      toggleSideDrawer: this.drawerToggleClickHandler,
      setUsers: this.setUsers,
      addComment: this.addComment,
      clearComments: this.clearComments,
      comments: this.state.comments,
      setComments: this.setComments,
    };
    return (
      <userContext.Provider value={value}>
        {this.props.children}
      </userContext.Provider>
    );
  }
}
