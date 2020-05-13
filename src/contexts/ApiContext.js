import React from "react";

export default React.createContext({
  stories: [],
  comments: [],
  user:{},
  addStory: () => {},
  addComment: () => {},
  updateUser: () => {},
  toggleSideDrawer: () => {},
  closeBackdrop: () => {}
})
