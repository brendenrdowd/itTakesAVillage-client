import React, { Component } from "react";
import StoryCard from "../../components/StoryCard/StoryCard";
import { Link } from "react-router-dom";
import userContext from "../../contexts/ApiContext";
import StoryService from "../../services/story-api-service";
import "./CreateStoryForm.css";

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
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    return `${month}/${day}/${year}`;
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
          <div>
            {this.renderFilter}
            <StoryCard
              resolved={card.resolved}
              date={this.formatDate(card.created_at)}
              flag={card.flag}
              issue={card.issue}
            />
          </div>
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
      <form className="createStory" onSubmit={this.handleSubmit}>
        <h3>Edit My Stories:</h3>
        {this.conditionalRender()}
      </form>
    );
  }
}

export default EditStoryForm;
