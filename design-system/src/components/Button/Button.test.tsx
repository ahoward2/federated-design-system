import React from "react";
import { render } from "@testing-library/react";
import Button from "./Button";

it("Button renders text prop", () => {
  const { getByText } = render(<Button>Hello World from test</Button>);
  expect(getByText("Hello World from test")).toBeTruthy();
});

it("Button renders with no prop value provided", () => {
  const { getByText } = render(<Button>Hello World from test</Button>);
  expect(getByText("no prop value provided")).toBeTruthy();
});
