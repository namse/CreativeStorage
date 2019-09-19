import * as React from "react";
import { render } from "@testing-library/react";
import List from "../component/List";

describe("<List />", () => {
  it("check li tags were made perfectly", () => {
    const component = render(<List />);
    component.getByText("li");
  });
});
