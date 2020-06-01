import React, { Component } from "react";
import CreateStoryForm from "../../components/CreateStoryForm/CreateStoryForm";

class CreateStoryPage extends Component {
  render() {
    return (
      <div>
        <CreateStoryForm history={this.props.history} />        
      </div>
    );
  }
}

export default CreateStoryPage;
