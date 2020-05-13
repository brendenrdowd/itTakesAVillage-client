import React, { Component } from "react";
// import CommentService from "../../services/comment-api-service";
import Context from "../../contexts/ApiContext";

class CreateCommentForm extends Component {
  // grab parent story from props
  // user from context
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      newComment: "",
    };
  }

  handleCommentChange = (event) => {
    this.setState({ newComment: event.target.value });
  };

  handleSubmit = (event) => {
    this.context.addComment(this.state.newComment);
    event.preventDefault();
  };

  // ready for backend connect
  // handleSubmit = (event) => {
  //   const comment = {
  //     comment: this.state.newComment,
  //   };
  //   CommentService.postStory(comment)
  //     .then((comment) => {
  //       this.context.addComment(comment);
  //       this.props.history.push(`/comment/${comment.id}`);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //   event.preventDefault();
  // };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>User: {this.context.user}</h3>
        <h3>Story: {this.context.stories}</h3>
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
