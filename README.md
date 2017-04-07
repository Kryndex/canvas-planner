canvas-planner
==================

Canvas Planner is the UI component for the Planner feature in [Canvas](https://github.com/instructure/canvas-lms).

## Production

### Usage

```bash
yarn add canvas-planner
```

```js
import Planner from 'canvas-planner';
```

### Polyfill

Canvas Planner is developed using modern JavaScript and supports modern browsers.
If you are using it in an environment such as IE 11 where some core browser features
are unavailable, then you should make sure to polyfill appropriately.  This package
does not ship any polyfills to maintain a smaller footprint.


## Development

### Getting Started

```bash
yarn
yarn start
```

Go to your browser to http://localhost:3005 to see the app.  This will
also start a json-server instance at http://localhost:3004 which api requests
will be proxied from webpack-dev-server to eliminating the need to have an
instance of Canvas running to do development.

### Linting

This project uses [eslint-config-react-app](https://github.com/facebookincubator/create-react-app/tree/master/packages/eslint-config-react-app)
for linting JS files.  Linting is enforced at the build level.  ESLint errors will cause the build to fail.

### Testing a local Canvas Planner version

If you want to test a version of the planner locally without publishing it you can
do so by using [yarn link](https://yarnpkg.com/en/docs/cli/link).

The way it is done is as follows:

```bash
cd canvas-planner
yarn run build # Build the proper transpiled versions of the files
yarn link

cd ./canvas-lms
yarn link canvas-planner
```

Once you've done those things, run the proper build steps for your Canvas
installation and you'll see your local copy of canvas-planner working inside
Canvas.
