import React from "react";
import { render } from "@testing-library/react";
import MessageBox from "./MessageBox";

it("MessageBox renders text prop", () => {
  const { getByText } = render(
    <MessageBox text={"Hello World from test"} messageType="info" />
  );
  expect(getByText("💬 Hello World from test")).toBeTruthy();
});

it("MessageBox renders with no prop value provided", () => {
  const { getByText } = render(<MessageBox text={""} />);
  expect(getByText("❌ no prop value provided")).toBeTruthy();
});
