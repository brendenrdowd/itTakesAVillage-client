import React, { Component } from "react";
import "./StoryCard.css";
// import CardToolBar from "../Utils/CardToolBar";

class StoryCard extends Component {
  render() {
    return (
      <div className="cards">
        <h3>{this.props.title}</h3>
        <p>{this.props.keywords}</p>
        <p>{this.props.issue}</p>
        {/* <CardToolBar /> */}
      </div>
    );
  }
}

export default StoryCard;
