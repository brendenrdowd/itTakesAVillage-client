import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiContext from '../../contexts/ApiContext'
import StoryApiService from '../../services/story-api-service'
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TumblrShareButton,
  TwitterShareButton,
} from "react-share";

export class CardToolBar extends Component {
  static contextType = ApiContext
  deleteStoryHandler = (id) => {
    StoryApiService.deleteStory(id)
      .then(
        console.log('deleted')
      )
  }
  render() {
    let buttons = [
      EmailShareButton,
      FacebookShareButton,
      LinkedinShareButton,
      RedditShareButton,
      TumblrShareButton,
      TwitterShareButton
    ]
    const tools = (
      <Link to={`story/edit/${this.props.story.id}`}>
        <button>Edit</button>
      </Link>,
      <button onClick={this.deleteStoryHandler(this.props.story.id)}>Delete</button>
    )
    if (this.context.user === this.props.story.author) {
      buttons = [...buttons, tools]
    }
    return (
      <div className="button-bar">
        {buttons}
      </div>
    )
  }
}

export default CardToolBar
