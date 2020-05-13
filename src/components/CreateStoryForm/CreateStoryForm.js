import React, { Component } from "react";
// import StoryService from "../../services/story-api-service";
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
  handleSubmit = (event) => {
    this.context.addStory(this.state.textValue);
    this.context.addHelp(this.state.selectValue);
    event.preventDefault();
  };

  // ready for backend connect
  // handleSubmit = (event) => {
  //   const story = {
  //     type: this.state.selectValue,
  //     title: this.state.textValue,
  //   };
  //   StoryService.postStory(story)
  //     .then((story) => {
  //       this.context.addStory(story);
  //       this.props.history.push(`/story/${story.id}`);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //   event.preventDefault();
  // };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>User: {this.context.user}</h3>
        <label>Crerate Story:</label>
        {/* drop down for keywords */}
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
