import React, { Component } from "react";
import StoryService from "../../services/story-api-service";
import Context from "../../contexts/ApiContext";
// import userContext from "../../contexts/ApiContext";
// import userContext from "../../contexts/ApiContext";
// import history from "../../history";

class CreateStoryForm extends Component {
  // grab user data from context?
  static contextType = Context;
  // static contextType = userContext;
  constructor(props) {
    super(props);
    this.state = {
      selectValue: "groceries",
      textValue: "",
    };
  }

  keywords = [
    "groceries",
    "food offer",
    "rideshare",
    "transportation",
    "moving",
    "clothing",
  ];

  handleTextChange = (event) => {
    this.setState({ textValue: event.target.value });
  };

  handleSelectorChange = (event) => {
    this.setState({ selectValue: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const story = {
      flag: this.state.selectValue,
      issue: this.state.textValue,
      // author: userContext.userId
    };

    // User_Id aka author being passed from API backend
    StoryService.postStory(story)
      .then((story) => {
        // this.context.addStory(story);
        this.props.history.push(`/story/${story.id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* will need to update this once we're grabbing user object from backend */}
        {/* <h3>User: {this.context.user}</h3> */}
        <label>Create Story:</label>
        <p>
          Please select the requested type of help from the drop down selections
          menu. Then enter the specifics of the help you are requesting.
        </p>
        <p>
          TIP: Create a story for each individual need, additionally please be
          as specific as possible for your requested help.
        </p>
        <label>
          select help type
          <select
            value={this.state.selectValue}
            onChange={this.handleSelectorChange}
          >
            {this.keywords.map((keyword) => (
              <option key={keyword} value={keyword}>
                {keyword}
              </option>
            ))}
          </select>
        </label>
        <input
          name="issue"
          type="text"
          value={this.state.textValue}
          placeholder="enter issue"
          onChange={this.handleTextChange}
          required
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default CreateStoryForm;
