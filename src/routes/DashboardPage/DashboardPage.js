import React, { Component } from "react";
import StoryCard from "../../components/StoryCard/StoryCard";
import UserService from '../../services/user-api-service'
import thing from "../../dummystore";
import "./DashboardPage.css";

export default class DashboardPage extends Component {
  constructor() {
    super();
    this.state = {
      filter: null,
    };
  }
  // need to update this, grab user id/object on successful login
  componentDidMount(){
    UserService.getUser()
      .then(res => {
        this.context.updateUser(res)
      })
  }

  handleFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  conditionalRender = () => {
    if (!this.state.filter || this.state.filter === "all") {
      return thing.stories.map((card) => (
        <StoryCard
          key={card.id}
          title={card.title}
          keywords={card.keywords}
          issue={card.issue}
        />
      ));
    }
    if (this.state.filter) {
      return thing.stories.map((card) =>
        card.keywords.includes(this.state.filter) ? (
          <StoryCard
            key={card.id}
            title={card.title}
            keywords={card.keywords}
            issue={card.issue}
          />
        ) : null
      );
    }
  };

  render() {
    return (
      <section>
        {/* Nav When merged */}
        <div className="filterForm">
          <form>
            <label for="keywords">Filter By:</label>
            <select onChange={this.handleFilter} id="keywords">
              <option value="all">All</option>
              {thing.keywords.map((keywords) => (
                <option value={keywords}>{keywords}</option>
              ))}
            </select>
          </form>
        </div>
        {this.conditionalRender()}
        {/* Footer ? */}
      </section>
    );
  }
}
