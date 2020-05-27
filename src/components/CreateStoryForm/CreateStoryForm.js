import React, { Component } from "react";
import StoryService from "../../services/story-api-service";
import Context from "../../contexts/ApiContext";
import "./CreateStoryForm.css";

class CreateStoryForm extends Component {
  static contextType = Context;
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
    };

    // User_Id aka author being passed from API backend
    StoryService.postStory(story)
      .then((story) => {
        this.props.history.push(`/story/${story.id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <form className="createStory" onSubmit={this.handleSubmit}>
        <label>
          <h3>Create Story:</h3>
        </label>
        <br />
        <p>
          Please select the requested type of help from the drop down selections
          menu. Then enter the specifics of the help you are requesting.
        </p>
        <br />
        <p>
          TIP: Create a story for each individual need, additionally please be
          as specific as possible for your requested help.
        </p>
        <br />
        <label>Select Help Type:</label>
        <div className="customSelect">
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
        </div>
        <br />
        <input
          name="issue"
          type="text"
          value={this.state.textValue}
          placeholder="enter issue"
          onChange={this.handleTextChange}
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default CreateStoryForm;
