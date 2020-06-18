import React from "react";
import ReactDOM from "react-dom";
import OrganizationRegForm from "./OrganizationRegForm";
import { BrowserRouter } from "react-router-dom";

describe("OrganizationRegForm Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        {" "}
        <OrganizationRegForm />{" "}
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
