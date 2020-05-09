import React, { Component } from "react";
import Context from "../../contexts/ApiContext";

export class CreateCommentForm extends Component {
  // grab parent story from props

  // user from context
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
  }

  handleCommentChange = (event) => {
    this.setState({ comment: event.target.value });
  };

  handleSubmit = (event) => {
    console.log(this.state.comment);
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>User: {this.context.username}</h3>
        {/* input for comment */}
        <label>Crerate comment:</label>
        <input
          type="text"
          value={this.state.value}
          placeholder="enter comment"
          onChange={this.handleCommentChange}
          required
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default CreateCommentForm;
