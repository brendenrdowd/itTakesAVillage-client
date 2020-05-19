// import React from "react";
// import CreateStoryForm from "./CreateStoryForm";

// import { shallow } from "enzyme";

// it("renders without crashing", () => {
//   shallow(<CreateStoryForm />);
// });

import React from "react";
import ReactDOM from "react-dom";
import CreateStoryForm from "./CreateStoryForm";
// import DrawerToggleButton from './DrawerToggleButton';
import { BrowserRouter } from "react-router-dom";

describe("CreateStoryForm Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        {" "}
        <CreateStoryForm />{" "}
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
// describe('Drawer Toggle Component', () => {
//   it('renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<BrowserRouter> <DrawerToggleButton /> </BrowserRouter>, div);
//     ReactDOM.unmountComponentAtNode(div);
//   })
// })
