import React, { Component } from "react";
import { Section, Hyph } from "../../components/Utils/Utils";
import CreateCommentForm from "../../components/CreateCommentForm/CreateCommentForm";
import StoryCard from "../../components/StoryCard/StoryCard";
import CardToolBar from "../../components/Utils/CardToolBar";
import CommentToolBar from "../../components/Utils/CommentToolbar";
import StoryApiService from "../../services/story-api-service";
import CommentApiService from "../../services/comment-api-service";
import userContext from "../../contexts/ApiContext";
import UserApiService from "../../services/user-api-service";
import "./StoryPage.css";

export default class StoryPage extends Component {
  static defaultProps = {
    match: { params: {} },
  };

  static contextType = userContext;

  state = {
    story: {},
    comments: [],
    user: {},
    authorName: "",
    comment: {},
  };

  componentDidMount() {
    this.context.clearComments()
    const story_id = this.props.match.params.id;
    // need to make sure we're grabbing the story in service
    StoryApiService.getStoryById(story_id).then((story) => {
      this.setState({...this.state, story });
    });
    //console.log(this.state.story);
    // need to make sure we're grabbing story from commentApi correctly
    CommentApiService.getCommentsByStoryId(story_id).then((comments) => {
      this.context.setComments( comments );
    });
    //console.log('comments', this.state.comments);
    //this.context.addComment(this.state.comments)
    console.log(this.context.comments);
    const user = this.context.user;
    this.setState({...this.state, user});
  }

  // need to figure out how to update story page comments when context comments are updated
  // if (this.state.comments !== this.context.comments) {
  //   this.setState({ comments: this.context.comments })
  // }

  render() {

    let comments =
      this.context.comments.length < 0
        ? "Add a comment..."
        : this.context.comments.map((comment) => (
          <li key={comment.id} className="comment">
            <p className="comment_text">{comment.comment}</p>
            <p>
              <Hyph />
              {/* {comment.author} */}
            </p>
          </li>
        ));
    const renderStory = (
      <Section className="StoryPage">
        <StoryCard
          issue={this.state.story.issue}
          flag={this.state.story.flag}
          author={this.state.authorName}
        />
        <CreateCommentForm story={this.state.story} />
        <ul className="comments_list">{comments}</ul>
      </Section>
    );

    const { error } = this.context;
    let content;
    if (error) {
      content =
        error.error === `Story doesn't exist` ? (
          <p className="not_found">Story not found</p>
        ) : (
            <p className="not_found">Something went wrong</p>
          );
    } else {
      content = renderStory;
    }
    return <Section className="StoryPage">{content}</Section>;
  }
}
