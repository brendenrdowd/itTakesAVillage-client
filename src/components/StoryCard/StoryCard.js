import React, { Component } from "react";
import "./StoryCard.css";

class StoryCard extends Component {
  render() {
    return (
      <div className="cards">
        <p>{this.props.date}</p>
        <h3>{this.props.issue}</h3>
        <p className="flag">{this.props.flag}</p>
      </div>
    );
  }
}

export default StoryCard;
