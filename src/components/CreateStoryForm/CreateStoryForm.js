import React, { Component } from "react";
import Context from "../../contexts/ApiContext";

export class CreateStoryForm extends Component {
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

  handleSubmit = (event) => {
    this.context.addStory(this.state.textValue);
    this.context.addHelp(this.state.selectValue);
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>User: {this.context.user}</h3>
        <label>Crerate Story:</label>
        {/* drop down for keywords */}
        <label>
          select help type
          <select value={this.state.value} onChange={this.handleSelectorChange}>
            <option value="food">Food</option>
            <option value="clothes">Clothes</option>
            <option value="transport">Transportation</option>
          </select>
        </label>
        {/* input for issue */}
        <input
          type="text"
          value={this.state.value}
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
