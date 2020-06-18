import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../../contexts/ApiContext';
import CommentApiService from '../../services/comment-api-service';

export class CommentToolbar extends Component {
  deleteCommentHandler = (id) => {
    CommentApiService.delete(id);
  };
  // Allows user to edit and delete comments by id
  render() {
    const buttons =
      ((
        <Link to={`comment/edit/${this.props.story.id}`}>
          <button>Edit</button>
        </Link>
      ),
      (
        <button onClick={this.deleteCommentHandler(this.props.comment.id)}>
          Delete
        </button>
      ));
    return <div className='button-bar'>{buttons}</div>;
  }
}

export default CommentToolbar;
