import React from "react";
import { render } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../../styles/global";
import { lightTheme, darkTheme } from "../../styles/themes";
import useThemeMode from "../../util/hooks/useThemeMode";

const WrappedToggle = () => {
  const { theme, themeToggler } = useThemeMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <ThemeToggle themeToggler={themeToggler} />
      <h1>example h1</h1>
      <h2>example h2</h2>
    </ThemeProvider>
  );
};

it("ThemeToggle renders text prop", () => {
  const { getByText } = render(<WrappedToggle />);
  expect(getByText("example h1")).toBeInTheDocument();
  expect(getByText("example h2")).toBeInTheDocument();
});
