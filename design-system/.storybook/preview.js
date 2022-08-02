import React from "react";
import GlobalStyle from "../src/styles/global";
import { ThemeProvider } from "styled-components";
import ThemeToggle from "../src/components/ThemeToggle";
import { lightTheme, darkTheme } from "../src/styles/themes";
import useThemeMode from "../src/util/hooks/useThemeMode";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "centered",
};

export const decorators = [
  (Story) => {
    const { theme, themeToggler } = useThemeMode("light");
    const themeMode = theme === "light" ? lightTheme : darkTheme;
    return (
      <ThemeProvider theme={themeMode}>
        <div style={{ marginBottom: 20 }}>
          <ThemeToggle themeToggler={themeToggler} />
        </div>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    );
  },
];
