import React, { Component } from "react";
import StoryCard from "../../components/StoryCard/StoryCard";
import UserService from "../../services/user-api-service";
import thing from "../../dummystore";
import "./DashboardPage.css";
import { Link } from "react-router-dom";
// test change
import StoryService from "../../services/story-api-service";
import Context from "../../contexts/ApiContext";
import history from "../../history";
import config from "../../config";

export default class DashboardPage extends Component {
  static contextType = Context;
  constructor() {
    super();
    this.state = {
      filter: null,
      data: [],
    };
  }
  keywords = [
    "groceries",
    // "delivery",
    "food",
    "rideshare",
    "transportation",
    "moving",
    "clothing",
  ];
  // need to update this, grab user id/object on successful login
  componentDidMount() {
    // UserService.getUser()
    //   .then(res => {
    //     this.context.updateUser(res)
    //   })
    fetch(`${config.API_ENDPOINT}/story`)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          data,
        })
      );
  }

  handleFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  conditionalRender = () => {
    if (!this.state.filter || this.state.filter === "all") {
      return this.state.data.map((card) => (
        <Link key={card.id} to={`/story/${card.id}`} className="card-link">
          <StoryCard
            resolved={card.resolved}
            date={card.created_at}
            flag={card.flag}
            issue={card.issue}
          />
        </Link>
      ));
    }
    if (this.state.filter) {
      return this.state.data.map((card) =>
        card.flag.includes(this.state.filter) ? (
          <Link key={card.id} to={`/story/${card.id}`} className="card-link">
            <StoryCard
              resolved={card.resolved}
              date={card.created_at}
              flag={card.flag}
              issue={card.issue}
            />
          </Link>
        ) : null
      );
    }
  };

  render() {
    console.log(this.state.data);
    return (
      <section>
        <div className="filterForm">
          <form>
            <label for="keywords">Filter By:</label>
            <select onChange={this.handleFilter} id="keywords">
              <option value="all">All</option>
              {this.keywords.map((keywords) => (
                <option value={keywords}>{keywords}</option>
              ))}
            </select>
          </form>
        </div>
        {this.conditionalRender()}
      </section>
    );
  }
}
