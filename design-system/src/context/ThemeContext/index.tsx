import React from "react";
import { ThemeProvider } from "styled-components";
import useThemeMode from "../../util/hooks/useThemeMode";
import { lightTheme, darkTheme } from "../../styles/themes";

const ThemeContext: React.FC = ({ children }) => {
  const { theme } = useThemeMode("light");

  const themeMode = theme === "dark" ? darkTheme : lightTheme;

  return <ThemeProvider theme={themeMode}>{children}</ThemeProvider>;
};

export default ThemeContext;
