<<<<<<< HEAD
import React, { Component } from 'react';
=======
import React, { Component } from "react";
import "./StoryCard.css";
// import CardToolBar from "../Utils/CardToolBar";
>>>>>>> tomilone

class StoryCard extends Component {
  render() {
<<<<<<< HEAD
    return <div></div>;
=======
    return (
      <div className="cards">
        <h3>{this.props.title}</h3>
        <p>{this.props.keywords}</p>
        <p>{this.props.issue}</p>
        {/* <CardToolBar /> */}
      </div>
    );
>>>>>>> tomilone
  }
}

export default StoryCard;
