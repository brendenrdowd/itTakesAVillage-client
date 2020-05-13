import React, { Component } from "react";
import CreateStoryForm from "../../components/CreateStoryForm/CreateStoryForm";
import CreateCommentForm from "../../components/CreateCommentForm/CreateCommentForm";

class CreateStoryPage extends Component {
  render() {
    return (
      <div>
        <CreateStoryForm />
        <CreateCommentForm />
      </div>
    );
  }
}

export default CreateStoryPage;
