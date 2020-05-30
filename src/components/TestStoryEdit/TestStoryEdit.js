import React, { Component } from "react";
import Context from "../../contexts/ApiContext";

class TestStoryEdit extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      selectValue: "groceries",
      textValue: "",
      // textValue: "test",
    };
  }

  render() {
    return <h1>test</h1>;
  }
}

export default TestStoryEdit;
