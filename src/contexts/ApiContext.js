import React from "react";

export default React.createContext({
  stories: [],
  comments: [],
  handleAddStory: () => {},
  handleAddComment: () => {},
});
