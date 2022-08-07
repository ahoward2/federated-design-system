// @ts-nocheck
//
// Unfortunately, since Module Federation involves runtime consumtion of components
// and hooks, we lose the ability to easily get full typescript support.
//

import React from "react";

import { ThemeProvider } from "styled-components";

// ============================================================================
// Remote Imports
// ============================================================================

const RemoteThemeToggle = React.lazy(
  () => import("federated-design-system/ThemeToggle")
);
const RemoteGlobalStyle = React.lazy(
  () => import("federated-design-system/GlobalStyle")
);

import GlobalStyle from "./styles/global";

const RemoteButton = React.lazy(() => import("federated-design-system/Button"));
const RemoteMessageBox = React.lazy(
  () => import("federated-design-system/MessageBox")
);
import { lightTheme as RemoteLightTheme } from "federated-design-system/lightTheme";
import { darkTheme as RemoteDarkTheme } from "federated-design-system/darkTheme";
import useThemeMode from "federated-design-system/useThemeMode";

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
      <React.Suspense fallback="loading button">
        <RemoteButton>Button with primary color</RemoteButton>
      </React.Suspense>
      <br></br>
      <React.Suspense fallback="loading message box">
        <RemoteMessageBox
          text={"Message box with secondary color"}
          messageType={"info"}
        ></RemoteMessageBox>
      </React.Suspense>
    </ThemeProvider>
  );
};

export default App;
