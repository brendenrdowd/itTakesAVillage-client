import React, { Component } from "react";
import StoryCard from "../../components/StoryCard/StoryCard";
import thing from "../../dummystore";
import "./DashboardPage.css";

export default class DashboardPage extends Component {
  constructor() {
    super();
    this.state = {
      filter: null,
    };
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
          {/* {If you want to be able to select multiple keywords at once in the filter, I can change that.} */}
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
