import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiContext from '../../contexts/ApiContext'
import CommentApiService from '../../services/comment-api-service'

export class CommentToolbar extends Component {
  deleteCommentHandler = (id) =>{
    CommentApiService.delete(id)
    .then(
      console.log('deleted')
    )
  }
  render() {
    const buttons = (
      // going to need to figure out this link, maybe just use the commentformcomponent as a modal?, however we do it, we should edit on page, not route to a new one...
      <Link to={`comment/edit/${this.props.story.id}`}>
        <button>Edit</button>
      </Link>,
      <button onClick={this.deleteCommentHandler(this.props.comment.id)}>Delete</button>
    )
    return (
      <div className="button-bar">
        {buttons}
      </div>
    )
  }
}

export default CommentToolbar
