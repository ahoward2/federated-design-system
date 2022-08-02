import React from "react";

import { ThemeProvider } from "styled-components";

// import DynamicRemoteContainer from "./hooks/DynamicRemoteContainer";

const RemoteThemeToggle = React.lazy(() => import("design-system/ThemeToggle"));
const RemoteGlobalStyle = React.lazy(() => import("design-system/GlobalStyle"));

import GlobalStyle from "./styles/global";

import { lightTheme as RemoteLightTheme } from "design-system/lightTheme";
import { darkTheme as RemoteDarkTheme } from "design-system/darkTheme";

import useThemeMode from "design-system/useThemeMode";

// Consumption through plugin
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
      <h1>Austin Howard</h1>
      <h2>React Developer</h2>
    </ThemeProvider>
  );
};

/*
 Consumption through DynamicRemoteContainer
 The DynamicRemoteContainer supports consumption of react components, would need a additional
 support in the DRC to support the use of hooks.
 */
// const App = () => {
//   const { theme, themeToggler } = useThemeMode();
//   const themeMode = theme === "light" ? RemoteLightTheme : RemoteDarkTheme;
//   return (
//     <ThemeProvider theme={themeMode}>
//       <DynamicRemoteContainer
//         url={"http://localhost:3003/browser/remote-entry.js"}
//         scope={"devSiteComponents"}
//         module={"./GlobalStyle"}
//         componentProps={{}}
//       />
//       <DynamicRemoteContainer
//         url={"http://localhost:3003/browser/remote-entry.js"}
//         scope={"devSiteComponents"}
//         module={"./ThemeToggle"}
//         componentProps={{ themeToggler: themeToggler }}
//       />
//       <h1>Austin Howard</h1>
//       <h2>React Developer</h2>
//     </ThemeProvider>
//   );
// };

export default App;
