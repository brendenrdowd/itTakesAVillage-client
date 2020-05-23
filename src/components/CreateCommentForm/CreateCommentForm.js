import React, { Component } from "react";
import CommentService from "../../services/comment-api-service";
import Context from "../../contexts/ApiContext";

class CreateCommentForm extends Component {
  // grab parent story from props

  static defaultProps = {
    history: {
      push: () => {},
    },
  };
    
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

  //need to grab storyId which should be passed to createCommentForm by props from the story page
  //need to grab userId from context & pass to the backend to the comment body
  


  // ready for backend connect
  handleSubmit = (event) => {
    event.preventDefault()
    const comment = {
      author: this.context.userId,
      comment: this.state.newComment,
      story: this.props.story.id
    };
    CommentService.postComment(this.context.userId, this.state.newComment, this.props.story.id)
      .then((comment) => {
        this.context.addComment(comment);
        this.props.history.push(`/comment/${comment.id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

 

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <h3>User: {this.context.user}</h3>
        <h3>Story: {this.context.stories}</h3> */}
        {/* input for comment */}
        <label>Create comment:</label>
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