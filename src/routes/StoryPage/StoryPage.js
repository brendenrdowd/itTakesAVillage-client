import React, { Component } from "react";
import { Section } from "../../components/Utils/Utils";
import CreateCommentForm from "../../components/CreateCommentForm/CreateCommentForm";
import StoryCard from "../../components/StoryCard/StoryCard";
import StoryApiService from "../../services/story-api-service";
import CommentApiService from "../../services/comment-api-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserApiService from "../../services/user-api-service";
import "./StoryPage.css";

export default class StoryPage extends Component {
  static defaultProps = {
    match: { params: {} },
  };

  state = {
    story: {},
    comments: [],
    user: {},
    authorName: "",
    resolved: false,
    comment: {},
  };

  componentDidMount() {
    StoryApiService.getStoryById(this.props.match.params.id).then((story) => {
      this.setState({ story: story });
    });
    // grabbing comments for specific story
    this.getComments();
  }

  getComments = () => {
    this.setState({ comments: [] });
    CommentApiService.getCommentsByStoryId(this.props.match.params.id).then(
      (comments) => {
        comments.map((comment) => {
          return UserApiService.getUserById(comment.author)
            .then((author) => {
              comment.authorName = author.username;
              this.setState({ comments: [...this.state.comments, comment] });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
    );
  };

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

  handleDelete = (event) => {
    event.preventDefault();
    StoryApiService.deleteStory(this.props.match.params.id)
      .then(this.props.history.push(`/dashboard`))
      .catch((error) => {
        console.error(error);
      });
  };
  handleDeleteComment = (id) => {
    CommentApiService.deleteComment(id).then((res) => this.getComments());
  };

  handleSuccess = () => {
    this.getComments();
  };

  // renders comments and story. If no story exists, throws error
  render() {
    const deleteButton = (id, author) => {
      const userId = Number(localStorage.getItem("user_id"));
      if (author === userId) {
        return (
          <button
            onClick={this.handleDeleteComment.bind(this, id)}
            className="delete"
          >
            <FontAwesomeIcon icon={["fas", "trash-alt"]} size="lg" />
          </button>
        );
      } else {
        return;
      }
    };

    let comments =
      this.state.comments.length < 0
        ? "Add a comment..."
        : this.state.comments.map((comment) => (
            <li key={comment.id} className="comment">
              <p className="comment_text">{comment.comment}</p>
              <div className="row">
                <p> - {comment.authorName}</p>
                {deleteButton(comment.id, comment.author)}
              </div>
            </li>
          ));

    const renderStory = (
      <Section className="StoryPage">
        <StoryCard
          issue={this.state.story.issue}
          flag={this.state.story.flag}
          author={this.state.authorName}
        />
        <CreateCommentForm
          onSuccess={this.handleSuccess}
          story={this.state.story}
        />
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
        <div className="edit-form">
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
            Resolve:
            <input
              type="checkbox"
              id="resolve"
              name="resolved"
              onChange={this.handleCheckBox}
            />
          </label>
          <div className="edit-btns">
            <button className="edit-story" onClick={this.handleSubmit}>
              Submit
            </button>
            <button
              className="delete-btn edit-story"
              onClick={this.handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </Section>
    );

    const conditionalRender = () => {
      const author = this.state.story.author;
      const userId = parseInt(localStorage.getItem("user_id"));
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
