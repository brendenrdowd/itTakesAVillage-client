import React, { Component } from "react";
import EditStoryForm from "../../components/EditStoryForm/EditStoryForm";

class EditStoryPage extends Component {
  render() {
    return (
      <div>
        <EditStoryForm history={this.props.history} />
      </div>
    );
  }
}

export default EditStoryPage;
