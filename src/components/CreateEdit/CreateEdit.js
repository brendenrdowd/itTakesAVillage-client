import React, { Component } from "react";
import StoryService from "../../services/story-api-service";
import Context from "../../contexts/ApiContext";

class CreateEdit extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      selectValue: "groceries",
      textValue: "",
    };
  }

  render() {
    console.log(this.props.history);
    return <h1>create edit</h1>;
  }
}

export default CreateEdit;
