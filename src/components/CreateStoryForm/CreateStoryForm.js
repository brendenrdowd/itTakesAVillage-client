import React, { Component } from "react";
import StoryService from "../../services/story-api-service";
import Context from "../../contexts/ApiContext";
import userContext from "../../contexts/ApiContext";
import history from "../../history";

class CreateStoryForm extends Component {
  // grab user data from context?
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      selectValue: "food",
      textValue: "",
      userId: 4,
    };
  }
  static contextType = userContext;

  setUserId = (event) => {
    this.setState({ userId: this.userContext.userId });
  };

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

  // ready for backend connect
  handleSubmit = (event) => {
    event.preventDefault();
    const story = {
      // these may be reversed check before merege
      flag: this.state.selectValue,
      issue: this.state.textValue,
      // test for user
      // author: this.context.userId,
      author: this.state.userId,
    };

    // StoryService.postStory({ user_id: userId, story: story.value }) .then(this.context.addStory) .then(() => { title.value = ''; }) .catch(this.context.setError); };

    // pass user_id through here
    StoryService.postStory(story)
      .then((story) => {
        this.context.addStory(story);
        history.push(`/story/${story.id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    console.log(window.localStorage.getItem("userId"));

    return (
      <form onSubmit={this.handleSubmit}>
        {/* will need to update this once we're grabbing user object from backend */}
        {/* <h3>User: {this.context.user.name}</h3> */}
        <label>Create Story:</label>
        {/* drop down for keywords */}
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
            {/* may need to change key to an actual value */}
            {this.keywords.map((keyword) => (
              <option key={keyword} value={keyword}>
                {keyword}
              </option>
            ))}
          </select>
        </label>
        {/* input for issue */}
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
