import React, { Component } from "react";
import "./StoryCard.css";
// import CardToolBar from "../Utils/CardToolBar";

class StoryCard extends Component {
  render() {
    return (
      <div className="cards">
        <h3>{this.props.issue}</h3>
        <p>{this.props.flag}</p>
        <p>{this.props.author}</p>
        {/* <CardToolBar /> */}
      </div>
    );
  }
}

export default StoryCard;
