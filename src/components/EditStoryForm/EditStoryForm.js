import React, { Component } from "react";
import StoryCard from "../../components/StoryCard/StoryCard";
import { Link } from "react-router-dom";
import userContext from "../../contexts/ApiContext";
import StoryService from "../../services/story-api-service";
import "./CreateStoryForm.css";

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
      // for testing
      console.log(activeUserObj);
      return activeUserObj.map((card) => (
        <Link key={card.id} to={`/story/edit/${card.id}`} className="card-link">
          <div>
            <StoryCard
              resolved={card.resolved}
              date={this.formatDate(card.created_at)}
              flag={card.flag}
              issue={card.issue}
              // HH testing
              // currentUser={currentUser}
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
    // for testing
    // const story = {
    //   flag: this.state.selectValue,
    //   issue: this.state.textValue,
    // };

    // // User_Id aka author being passed from API backend
    // StoryService.postStory(story)
    //   .then((story) => {
    //     this.props.history.push(`/story/${story.id}`);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  render() {
    // console.log("from createStoryForm", this.props.history);
    return (
      <form className="createStory" onSubmit={this.handleSubmit}>
        <h3>Edit Stories:</h3>
        {this.conditionalRender()}
        {/* <br />
        <button type="submit">Submit</button> */}
      </form>
    );
  }
}

export default EditStoryForm;
