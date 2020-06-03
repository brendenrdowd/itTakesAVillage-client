import React, { Component } from "react";
import "./StoryCard.css";
import CardToolBar from "../Utils/CardToolBar";

class StoryCard extends Component {
  render() {
    return (
      <div className="cards">
        <p>{this.props.card.date}</p>
        <h3>{this.props.card.issue}</h3>
        <p className="flag">{this.props.card.flag}</p>
        <CardToolBar author={this.props.card.author} id={this.props.card.id}/>
      </div>
    );
  }
}

export default StoryCard;
