import React, { Component } from "react";
import { Section, Hyph } from "../../components/Utils/Utils";
import CreateCommentForm from "../../components/CreateCommentForm/CreateCommentForm";
import StoryCard from "../../components/StoryCard/StoryCard";
import CardToolBar from "../../components/Utils/CardToolBar";
import CommentToolBar from "../../components/Utils/CommentToolbar";
import StoryApiService from "../../services/story-api-service";
import CommentApiService from "../../services/comment-api-service";
import ApiContext from "../../contexts/ApiContext";

export default class StoryPage extends Component {
  static defaultProps = {
    match: { params: {} },
  };

  static contextType = ApiContext;

  state = {
    story: {},
    comments: [],
    user: {},
  };

  componentDidMount() {
    const story_id = this.props.match.params.id;
    // need to make sure we're grabbing the story in service
    const story = StoryApiService.getStoryById(story_id);
    // need to make sure we're grabbing story from commentApi correctly
    const comments = CommentApiService.getCommentsByStoryId(story_id) || [];
    const user = this.context.user;
    this.setState({
      story,
      comments,
      user,
    });
  }

  comments =
    this.state.comments.length > 0
      ? "Add a comment..."
      : this.state.comments.map((comment) => (
          <li key={comment.id} className="comment">
            <p className="comment_text">{comment.content}</p>
            <Hyph />
            <p>{comment.user}</p>
          </li>
        ));

  renderStory = (
    <Section className="Story">
      <StoryCard
        title={this.state.story.title}
        keywords={this.state.story.keywords}
        issue={this.state.story.issue}
      />
      <ul className="comments_list">{this.comments}</ul>
    </Section>
  );
  render() {
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
      content = this.renderStory;
    }
    return <Section className="StoryPage">{content}</Section>;
  }
}
