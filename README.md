# Federated Design System Example

> Example demonstrating a [rocket-science](https://github.com/rocket-science-core/rocket-science) remote design system app consumed by a host app with a fully federated example with consumption via the plugin and "almost" fully federated via a `DynamicRemoteContainer` hook.

## Usage

1. Clone this repo

```bash
git clone https://github.com/ahoward2/federated-design-system
```

2. Start the remote app

```bash
# dev-site-components PORT 3001

yarn story
```

3. Start the host app in another terminal

```bash
# dev-site-host PORT 3002

yarn start
```
