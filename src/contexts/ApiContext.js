// import React from "react";

// export default React.createContext({
//   stories: [],
//   comments: [],
//   user:{},
//   addStory: () => {},
//   addComment: () => {},
//   updateUser: () => {},
//   toggleSideDrawer: () => {},
//   closeBackdrop: () => {}
// })
import React, { Component } from "react";

const userContext = React.createContext({
  userId: [],
  error: null,
  setUserId: () => {},
  clearError: () => {},
});
export default userContext;

export class UserProvider extends Component {
  state = {
    userId: [],
    error: null,
  };

  setUserId = (userId) => {
    this.setState({ userId: localStorage.setItem("user_id", userId) });
    // console.log('userid:', this.state.userId);
  };
  clearError = () => {
    this.setState({ error: null });
  };

  render() {
    const value = {
      userId: localStorage.getItem("user_id"),
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
