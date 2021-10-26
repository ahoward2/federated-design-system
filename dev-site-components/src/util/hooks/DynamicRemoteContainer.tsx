import React from "react";

// --------- Types --------- //
export type LegacyShareScope = {
  [key: string]: {
    // Name of module intended for sharing
    [version: string]: {
      // Version of module intended for sharing
      get: () => Promise<any>; // Getter function to retrieve module
      loaded: boolean;
      from: string;
    };
  };
};

export type ImportObject = {
  init: (modules: LegacyShareScope) => number; // Function to initialize shared modules
  get: (module: string) => Promise<any>; // Function to get the target module
};

declare global {
  /* Here, declare things that go in the global namespace, or augment
   * existing declarations in the global namespace
   */
  interface Window {
    // Augment existing Window declaration
    DevProfileOne?: ImportObject;
  }
  interface ImportScope {
    // Global key names of ImportObjects
    DevProfileOne: "DevProfileOne";
  }
}

export interface DynamicRemoteContainerProps {
  url: string;
  scope: keyof ImportScope;
  module: string;
  componentProps?: { [key: string]: any } | any;
}
// ------- End Types ------- //

/**
 * Given a url to a remoteEntry script will create a script
 * element and assign it's src to the url and load it or return
 * a failure state
 * @param url source url to remoteEntry script
 * @returns ready or failed state
 */
const useDynamicScript = (url: string) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!url) {
      return;
    }

    const element = document.createElement("script");
    element.src = url;
    element.type = "text/javascript";
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${url}`);
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    ready,
    failed,
  };
};

/**
 * Container component that fetches and loads a module using a dynamic script
 * @param url source url to remoteEntry script
 * @param scope stored variable in the remoteEntry script (from name field in ModuleFederationPlugin)
 * @param module name of target module to load (from exposes field in ModuleFederationPlugin)
 * @param componentProps arguments passed to target module
 * @returns component loaded with React.Suspense
 */
const DynamicRemoteContainer = ({
  url,
  scope,
  module: targetModule,
  componentProps,
}: DynamicRemoteContainerProps) => {
  const { ready, failed } = useDynamicScript(url ?? "");

  if (!ready) {
    return <h2>Loading dynamic script: {url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {url}</h2>;
  }

  const Component = React.lazy(
    () =>
      new Promise((resolve) => {
        // Shared modules from webpack 4 like react or styled-components
        const moduleResolve = resolve;
        const react = require("react");
        const reactDom = require("react-dom");
        const styledComponents = require("styled-components");
        const legacyShareScope: LegacyShareScope = {
          react: {
            [react.version]: {
              get: () => new Promise((resolve) => resolve(() => react)),
              loaded: true,
              from: "webpack4",
            },
          },
          "react-dom": {
            [reactDom.version]: {
              get: () => new Promise((resolve) => resolve(() => reactDom)),
              loaded: true,
              from: "webpack4",
            },
          },
          "styled-components": {
            [styledComponents.version]: {
              get: () =>
                new Promise((resolve) => resolve(() => styledComponents)),
              loaded: true,
              from: "webpack4",
            },
          },
        };
        new Promise((resolve) => {
          // Initialize with legacyShareScope then get targetModule
          try {
            resolve(window[scope]?.init(legacyShareScope));
          } catch {
            // If already has been initialized, we don't need to reinitialize again
          }
          window[scope]?.get(targetModule).then((factory: () => any) => {
            moduleResolve(factory());
          });
        });
      })
  );

  return (
    <React.Suspense fallback="Loading System">
      <Component {...componentProps} />
    </React.Suspense>
  );
};

export default DynamicRemoteContainer;
