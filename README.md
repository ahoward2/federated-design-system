# Federated Design System Example

> Example demonstrating a [rocket-science](https://github.com/rocket-science-core/rocket-science) remote design system app consumed by a host app with a fully federated example with consumption via the plugin and "almost" fully federated via a `DynamicRemoteContainer` hook.

## Usage

1. Start the remote app

```bash
# dev-site-components PORT 3001

yarn story
```

2. Start the host app in another terminal

```bash
# dev-site-host PORT 3002

yarn start
```

## How It Works

The `dev-site-components` project is serving as a design system library and `dev-site-host` is a host application that consumes modules from the design system.

### Design System Library (dev-site-components)

The DSL contains a React [Context](https://reactjs.org/docs/context.html) hook, CSS styles, and low-level atomic components (ThemeToggler button) which the host application consumes.

The webpack configuration for the DSL is set up to publish it's static files to the [unpkg](https://unpkg.com/) content delivery network with semantic versioning so that it can be developed and published independently from any apps consuming it.

### Host Application (dev-site-host)

The host application in this case doesn't need to contain any design system related code (except for optional fallbacks) and could rather just handle the management of remote apps.

As long as we have `React` and `styled-components` as a dependency in the host app, we can import the rest of the modules that we need from our DSL library.

```js
// App.js imports

import React from "react";

import { ThemeProvider } from "styled-components";

// Optional fallback global stylesheet
import GlobalStyle from "./styles/global";

const RemoteThemeToggle = React.lazy(() =>
  import("dev-site-components/ThemeToggle")
);

const RemoteGlobalStyle = React.lazy(() =>
  import("dev-site-components/GlobalStyle")
);

import { lightTheme as RemoteLightTheme } from "dev-site-components/lightTheme";

import { darkTheme as RemoteDarkTheme } from "dev-site-components/darkTheme";

import useThemeMode from "dev-site-components/useThemeMode";
```

Now we can use our remote modules as we need them, utilizing `React.Suspense` to lazily load in React components and static imports for our `lightTheme`, `darkTheme`, and our `useThemeMode` hook to handle switching between the two.

```js
// App.js

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
```
