import React, { Component } from "react";
import StoryService from "../../services/story-api-service";
import Context from "../../contexts/ApiContext";

class CreateStoryForm extends Component {
  // grab user data from context?
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      selectValue: "food",
      textValue: "",
    };
  }

  handleTextChange = (event) => {
    this.setState({ textValue: event.target.value });
  };

  handleSelectorChange = (event) => {
    this.setState({ selectValue: event.target.value });
  };

  // only needed for non back end stuff
  // handleSubmit = (event) => {
  //   this.context.addStory(this.state.textValue);
  //   this.context.addHelp(this.state.selectValue);
  //   event.preventDefault();
  // };

  // ready for backend connect
  handleSubmit = (event) => {
    event.preventDefault();
    const story = {
      // these may be reversed check before merege
      flag: this.state.selectValue,
      issue: this.state.textValue,
      // test for user
      author: 100,
    };
    console.log(this.context.story);

    StoryService.postStory(story)
      .then((story) => {
        this.context.addStory(story);
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
            <option value="food">Food</option>
            <option value="clothes">Clothes</option>
            <option value="transport">Transportation</option>
          </select>
        </label>
        {/* input for issue */}
        <input
          name="issue"
          type="text"
          value={this.state.textValue}
          placeholder="enter issue"
          onChange={this.handleTextChange}
          // required
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default CreateStoryForm;
