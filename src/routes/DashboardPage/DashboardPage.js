import React, { Component } from "react";
import StoryCard from "../../components/StoryCard/StoryCard";
import UserService from "../../services/user-api-service";
import "./DashboardPage.css";
import { Link } from "react-router-dom";
import userContext from "../../contexts/ApiContext";
import StoryService from "../../services/story-api-service";

export default class DashboardPage extends Component {
  constructor() {
    super();
    this.state = {
      filter: null,
      data: [],
      userId: "",
    };
  }

  static contextType = userContext;

  keywords = [
    "groceries",
    "food",
    "rideshare",
    "transportation",
    "moving",
    "clothing",
    "my stories",
  ];

  componentDidMount() {
    StoryService.getAllStories().then((data) =>
      this.setState({
        data,
      })
    );
    this.setState({ userId: this.context.userId });
  }

  handleFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  // patch for making dates readable
  formatDate = (date) => {
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    return `${month}/${day}/${year}`;
  };

  conditionalRender = () => {
    if (!this.state.filter || this.state.filter === "all") {
      return this.state.data.map((card) => (
        <Link key={card.id} to={`/story/${card.id}`} className="card-link">
          <StoryCard
            resolved={card.resolved}
            date={this.formatDate(card.created_at)}
            flag={card.flag}
            issue={card.issue}
          />
        </Link>
      ));
    }

    let dataObj = this.state.data;
    const currentUser = this.state.userId;
    let activeUserObj = dataObj.filter(function (user) {
      // validate if this is allowed
      return user.author == currentUser;
    });
    if (this.state.filter === "my stories") {
      console.log({ activeUserObj });
      return activeUserObj.map((card) => (
        <Link key={card.id} to={`/story/${card.id}`} className="card-link">
          <StoryCard
            resolved={card.resolved}
            date={this.formatDate(card.created_at)}
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
              date={this.formatDate(card.created_at)}
              flag={card.flag}
              issue={card.issue}
            />
          </Link>
        ) : null
      );
    }
  };

  render() {
    return (
      <section>
        <div className="filterForm">
          <form>
            <label htmlFor="keywords">Filter By:</label>
            <div className="customSelect">
              <select onChange={this.handleFilter} id="keywords">
                <option value="all">All</option>
                {this.keywords.map((keywords, index) => (
                  <option key={index} value={keywords}>
                    {keywords}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
        {this.conditionalRender()}
      </section>
    );
  }
}
