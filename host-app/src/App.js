import React from "react";

import { ThemeProvider } from "styled-components";

const RemoteThemeToggle = React.lazy(() => import("design-system/ThemeToggle"));
const RemoteGlobalStyle = React.lazy(() => import("design-system/GlobalStyle"));
const RemoteButton = React.lazy(() => import("design-system/Button"));
const RemoteMessageBox = React.lazy(() => import("design-system/MessageBox"));

import GlobalStyle from "./styles/global";

import { lightTheme as RemoteLightTheme } from "design-system/lightTheme";
import { darkTheme as RemoteDarkTheme } from "design-system/darkTheme";

import useThemeMode from "design-system/useThemeMode";

const App = () => {
  const { theme, themeToggler } = useThemeMode();
  const themeMode = theme === "light" ? RemoteLightTheme : RemoteDarkTheme;
  return (
    <ThemeProvider theme={themeMode}>
      <React.Suspense fallback={<GlobalStyle />}>
        <RemoteGlobalStyle />
      </React.Suspense>
      <React.Suspense fallback="Loading Theme Toggler">
        <RemoteThemeToggle themeToggler={themeToggler} />
      </React.Suspense>
      <br></br>
      <h1>Design system</h1>
      <h2>Consumed via Module Federation</h2>
      <br></br>
      <React.Suspense fallback="Loading Button">
        <RemoteButton text={"Button with primary color"}></RemoteButton>
      </React.Suspense>
      <br></br>
      <React.Suspense fallback="Loading MessageBox">
        <RemoteMessageBox
          text={"Message box with secondary color"}
          messageType={"info"}
        ></RemoteMessageBox>
      </React.Suspense>
    </ThemeProvider>
  );
};

export default App;
