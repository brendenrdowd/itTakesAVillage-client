import React from "react";
import ReactDOM from "react-dom";
import StoryCard from "./StoryCard";
import { BrowserRouter } from "react-router-dom";

describe("StoryCard Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        {" "}
        <StoryCard />{" "}
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
