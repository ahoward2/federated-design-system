import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
const Readme = require("../README.md").default;
import { ThemeProvider } from "styled-components";
import ThemeToggle from "../ThemeToggle";
import GlobalStyle from "../../../styles/global";
import ThemeContext from "../../../context/ThemeContext";
import { lightTheme, darkTheme } from "../../../styles/themes";
import useThemeMode from "../../../util/hooks/useThemeMode";

export default {
  title: "Atomic/Atoms/ThemeToggle/Default",
  component: ThemeToggle,
  argTypes: {
    text: { control: "text" },
  },
} as ComponentMeta<typeof ThemeToggle>;

// ==============================
// Traditional Node Render on Client Side
// ==============================

const Template: ComponentStory<typeof ThemeToggle> = () => {
  const { theme, themeToggler } = useThemeMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  return (
    <ThemeContext>
      <ThemeProvider theme={themeMode}>
        <GlobalStyle />
        <ThemeToggle themeToggler={themeToggler} />
        <h1>example h1</h1>
        <h2>example h2</h2>
      </ThemeProvider>
    </ThemeContext>
  );
};

export const Primary = Template.bind({});
Primary.parameters = {
  readme: {
    sidebar: Readme,
  },
};
