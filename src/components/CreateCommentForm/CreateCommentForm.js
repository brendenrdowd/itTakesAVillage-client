import React, { Component } from "react";
import CommentService from "../../services/comment-api-service";
import userContext from "../../contexts/ApiContext";
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

  //need to grab storyId which should be passed to createCommentForm by props from the story page
  //need to grab userId from context & pass to the backend to the comment body

  // ready for backend connect
  handleSubmit = (event) => {
    event.preventDefault();

    // const { comment } = event.target;
    // const { userId } = this.context;

    // this.setState({ error: null });

    // should be able to consolidate this into just comment, depending on service/backend
    CommentService.postComment(userId, comment.value, this.props.story.id)
      .then((comment) => {
        //need to add a component did update, or push the new comment in context and update the storypage comment array with context
        this.context.addComment(comment);
        this.props.history.push(`/story/${comment.story}`);
      })
      .catch(this.context.setError);
  };

  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        {/* input for comment */}
        <label>Create comment:</label>
        <input
          type="text"
          name="comment"
          // value={this.state.value}
          placeholder="enter comment"
          // onChange={this.handleCommentChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default CreateCommentForm;
