import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import GlobalStyle from "../../../styles/global";
import DynamicRemoteContainer from "../../../util/hooks/DynamicRemoteContainer";
import { lightTheme, darkTheme } from "../../../styles/themes";
import useThemeMode from "../../../util/hooks/useThemeMode";
import { ThemeProvider } from "styled-components";
import ThemeContext from "../../../context/ThemeContext";
const Readme = require("../README.md").default;

export default {
  title: "Atomic/Atoms/ThemeToggle/Federated",
  component: DynamicRemoteContainer,
} as ComponentMeta<typeof DynamicRemoteContainer>;

// ==============================
// Module Federation MFE Render on Client Side
//
// Notes:
// - This is a special case where we are using the DynamicRemoteContainer
// - This is a special case where we are not following the steps below
//   because this default component is already configured in the
//   ModuleFederationComponent
//
// Directions:
// 1. Make Sure you add the component to the "exposes"
//    in webpack.config.js ModuleFederationPlugin
//
// 2. Uncomment the code below
//
// 3. Run $ yarn story
//
// ==============================

const ModFedTemplate: ComponentStory<typeof DynamicRemoteContainer> = ({
  url,
  scope,
  module: targetModule,
  componentProps,
}) => {
  const { theme, themeToggler } = useThemeMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  return (
    <ThemeContext>
      <ThemeProvider theme={themeMode}>
        <GlobalStyle />
        <DynamicRemoteContainer
          url={url}
          scope={scope}
          module={targetModule}
          componentProps={{ themeToggler: themeToggler }}
        />
        <h1>example h1</h1>
        <h2>example h2</h2>
      </ThemeProvider>
    </ThemeContext>
  );
};

export const ModFedPrimary = ModFedTemplate.bind({});
ModFedPrimary.args = {
  url: "http://localhost:3003/browser/remote-entry.js",
  scope: "devSiteComponents",
  module: "./ThemeToggle",
};
ModFedPrimary.parameters = {
  readme: {
    sidebar: Readme,
  },
};
