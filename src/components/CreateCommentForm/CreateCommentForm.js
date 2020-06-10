import React, { Component } from "react";
import CommentService from "../../services/comment-api-service";
import userContext from "../../contexts/ApiContext";
import TokenService from '../../services/token-service'
import "./CommentForm.css";

class CreateCommentForm extends Component {
  // grab parent story from props

  static defaultProps = {
    history: {
      push: () => { },
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



  // ready for backend connect
  handleSubmit = (event) => {
    event.preventDefault();

    const { comment } = event.target;
    const { userId } = localStorage.getItem("user_id");

    this.setState({ error: null });

    // should be able to consolidate this into just comment, depending on service/backend
    CommentService.postComment(userId, comment.value, this.props.story.id)
      .then((comment) => {
        //need to add a component did update, or push the new comment in context and update the storypage comment array with context
        this.context.addComment(comment);
        this.props.onSuccess()
        this.setState({ newComment: "" })
        // this.props.history.push(`/story/${comment.story}`);
      })
      .catch(this.context.setError);
  };

  render() {
    const submit = (!TokenService.hasAuthToken()) ? <h3>Log In to Comment</h3> : <button type="submit">Submit</button>
    return (
      <form className="commentForm" onSubmit={this.handleSubmit} >
        {/* input for comment */}
        < label > Create comment:</label>
        <input
          type="text"
          name="comment"
          value={this.state.newComment}
          onChange={this.handleCommentChange}
          required
        />
        {/* <input type="submit" value="submit" disabled={this.isDisabled} /> */}
        {submit}
      </form >
    );
  }
}

export default CreateCommentForm;
