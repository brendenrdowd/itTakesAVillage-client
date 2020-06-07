import React, { Component } from "react";
import { Section, Hyph } from "../../components/Utils/Utils";
import CreateCommentForm from "../../components/CreateCommentForm/CreateCommentForm";
import StoryCard from "../../components/StoryCard/StoryCard";
import CardToolBar from "../../components/Utils/CardToolBar";
import CommentToolBar from "../../components/Utils/CommentToolbar";
import StoryApiService from "../../services/story-api-service";
import CommentApiService from "../../services/comment-api-service";
import ApiContext from "../../contexts/ApiContext";
import UserApiService from "../../services/user-api-service";
import "./StoryPage.css";

export default class StoryPage extends Component {
  static defaultProps = {
    match: { params: {} },
  };

  static contextType = ApiContext;

  state = {
    story: {},
    comments: [],
    user: {},
    authorName: "",
    resolved: false,
    comment: {},
  };

  componentDidMount() {
    const story_id = this.props.match.params.id;
    // need to make sure we're grabbing the story in service
    StoryApiService.getStoryById(story_id).then((story) => {
      this.setState({ story: story });
    });

    // need to make sure we're grabbing story from commentApi correctly
    CommentApiService.getCommentsByStoryId(story_id).then((comments) => {
      // need to update authors as I set state or else infinity. #sunday monday 6/7 6/8
      this.setState({ comments });
    });

    // need

    // we might not need this part
    const user = this.context.user;
    this.setState({
      user,
    });
    //to here
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let editIssue = document.getElementById("issue").value;
    const editStory = {
      issue: editIssue,
      resolved: this.state.resolved,
      id: this.state.story.id,
    };

    StoryApiService.editStory(editStory)
      .then((story) => {
        this.props.history.push(`/edit`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // getCommentAuthor = (id) => {
  //   UserApiService.getUserById(id)
  //     .then(author => {
  //       // prevents infinite rerender on state change
  //       if(this.state.authorName !== author.username){
  //         this.setState({authorName:author.username})
  //       }
  //       return
  //     }).catch(error => {
  //       console.log(error)
  //     })
  // }

  // renders comments and story. If no story exists, throws error
  render() {
    // let author = UserApiService.getUserById(id)
    //   .then(author => {
    //     // prevents infinite rerender on state change?
    //     if (this.state.authorName !== author.username) {
    //       this.setState({ authorName: author.username })
    //     }
    //   })
    let comments =
      this.state.comments.length < 0
        ? "Add a comment..."
        : this.state.comments.map((comment) => (
          <li key={comment.id} className="comment">
            <p className="comment_text">{comment.comment}</p>
            {/* {this.getCommentAuthor(comment.author)} */}
            <Hyph />
            <p>- authorname will come soon</p>
            {/* <p>{author}</p> */}
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

    const editStory = (
      <Section className="StoryPage">
        <StoryCard
          issue={this.state.story.issue}
          flag={this.state.story.flag}
          author={this.state.authorName}
        />
        <div>
          <label>
            Edit Story Issue:
            <input
              id="issue"
              type="text"
              name="edit-story"
              defaultValue={this.state.story.issue || ""}
            />
          </label>
          <label>
            Resolve:{" "}
            <input
              type="checkbox"
              id="resolve"
              name="resolved"
              onChange={this.handleCheckBox}
            />
          </label>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </Section>
    );

    const conditionalRender = () => {
      const author = this.state.story.author;
      const userId = parseInt(this.context.userId);
      if (author === userId) {
        return editStory;
      } else {
        return renderStory;
      }
    };

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
      // testing story edit
      content = conditionalRender();
    }
    return <Section className="StoryPage">{content}</Section>;
  }
}
