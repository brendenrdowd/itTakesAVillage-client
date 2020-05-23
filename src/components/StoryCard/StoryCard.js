import React, { Component } from "react";
import "./StoryCard.css";
// import CardToolBar from "../Utils/CardToolBar";

class StoryCard extends Component {
  render() {
    return (
      <div className="cards">
        <p>{this.props.date}</p>
        <h3>{this.props.issue}</h3>
        <p className="flag">{this.props.flag}</p>
        {/* <CardToolBar /> */}
      </div>
    );
  }
}

export default StoryCard;
