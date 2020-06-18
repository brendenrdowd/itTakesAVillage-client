import React from "react";
import ReactDOM from "react-dom";
import CreateStoryPage from "./CreateStoryPage";
import { BrowserRouter } from "react-router-dom";

describe("CreateStoryPage Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        {" "}
        <CreateStoryPage />{" "}
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
