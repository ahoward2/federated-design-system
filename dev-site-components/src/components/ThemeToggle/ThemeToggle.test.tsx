import React from "react";
import { render } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";
it("ThemeToggle renders text prop", () => {
    const { getByText } = render(
    <ThemeToggle text={"Hello World from test"} />
    );
    expect(getByText("Hello World from test")).toBeTruthy();
});
it("ThemeToggle renders with no prop value provided", () => {
    const { getByText } = render(<ThemeToggle text={""} />);
    expect(getByText("no prop value provided")).toBeTruthy();
});