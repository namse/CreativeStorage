import * as React from "react";
import { render } from "@testing-library/react";
import List from "../component/List";
import App from "../App";

describe("<List />", () => {
  it("check li tags were made perfectly", async () => {
    const component = render(<List />);
    component.getByText("li");
  });
});
