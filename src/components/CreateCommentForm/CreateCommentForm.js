import React, { Component } from "react";
import CommentService from "../../services/comment-api-service";
import userContext from "../../contexts/ApiContext";
import TokenService from "../../services/token-service";
import "./CommentForm.css";

class CreateCommentForm extends Component {
  // grab parent story from props

  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  // user from context
  static contextType = userContext;
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
    event.preventDefault();

    const { comment } = event.target;
    const userId = Number(localStorage.getItem("user_id"));

    this.setState({ error: null });

    CommentService.postComment(userId, comment.value, this.props.story.id)
      .then((comment) => {
        this.context.addComment(comment);
        this.props.onSuccess();
        this.setState({ newComment: "" });
      })
      .catch(this.context.setError);
  };

  render() {
    const submit = !TokenService.hasAuthToken() ? (
      <h3>Log In to Comment</h3>
    ) : (
      <button type="submit">Submit</button>
    );
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        {/* input for comment */}
        <label>Create comment:</label>
        <input
          type="text"
          name="comment"
          value={this.state.newComment}
          onChange={this.handleCommentChange}
          required
        />
        {submit}
      </form>
    );
  }
}

export default CreateCommentForm;
