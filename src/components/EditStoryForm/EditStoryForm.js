import React, { Component } from "react";
import StoryCard from "../../components/StoryCard/StoryCard";
import { Link } from "react-router-dom";
import userContext from "../../contexts/ApiContext";
import StoryService from "../../services/story-api-service";
import "./EditStoryForm.css";

// need to change the name of displays logged in user stories
class EditStoryForm extends Component {
  constructor() {
    super();
    this.state = {
      filter: "my stories",
      data: [],
      userId: "",
    };
  }

  static contextType = userContext;

  componentDidMount() {
    StoryService.getAllStories().then((data) =>
      this.setState({
        data,
      })
    );
    this.setState({ userId: this.context.userId });
  }

  // patch for making dates readable
  formatDate = (date) => {
    const d = new Date(date);
    return d.toDateString();
  };

  conditionalRender = () => {
    let dataObj = this.state.data;
    const currentUser = parseInt(this.state.userId);
    let activeUserObj = dataObj.filter(function (user) {
      return user.author === currentUser;
    });
    if (this.state.filter === "my stories") {
      return activeUserObj.map((card) => (
        <Link key={card.id} to={`/story/${card.id}`} className="card-link">
          {this.renderFilter}
          <StoryCard
            resolved={card.resolved}
            date={this.formatDate(card.created_at)}
            flag={card.flag}
            issue={card.issue}
          />
        </Link>
      ));
    }
  };

  handleTextChange = (event) => {
    this.setState({ textValue: event.target.value });
  };

  handleSelectorChange = (event) => {
    this.setState({ selectValue: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("edit button clicked");
  };

  render() {
    return (
      <form className="editStory" onSubmit={this.handleSubmit}>
        <h3>Edit My Stories:</h3>
        {this.conditionalRender()}
      </form>
    );
  }
}

export default EditStoryForm;
