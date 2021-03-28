# PoreSpy Frontend Documentation

## Development Tools

- VS Code (any text editor is fine, but it is suggested to use one with a built in terminal)
- Git
- Github
- npm
- create-react-app (this project was started with create-react-app since specific Babel and webpack configurations were deemed unnecessary. However if this changes in the future, the code in the `src` folder should still work. Babel is the javascript compiler that allows ES6 code to be backwards compatible with javascript, allowing it to be rendered by the browser. Webpackk is a javascript module bundler. Both Babel and webpack settings are abstracted using create-react-app).


## Folder Structure Explanation

Once the repo has been pulled and the `npm install` command has been run, the following folder structure should appear at the root directory of the project:

- `node_modules`
- `public`
- `src`

In the project root directory, there is a `README.md` file. This file contains a brief description of the project, and 2 TODO lists. The `TODO From Meetings` list contains all the tasks discussed in previous meetings that are meant to be completed. The `TODO (Lower priority)` list contains tasks that are of lower priority and have not been discussed in previous meetings, but they may be of interest in the future.


## node_modules

The `node_modules` folder contains all the necessary node modules for the frontend run. Notable packages include axios (for making http requests to the backend (the RESTful API)), react-redux (for maintaining globalized state variables), and electron (useful for deployment into a desktop app using electron.js). The `node_modules` folder contains all default and installed packages. A more concise list of all the installed packages can be found in the `package.json` file (found in the project root directory), on the `"dependencies"` property. 

**NOTE:** Please be wary of any changes made to the `package.json` and `package-lock.json` files found in the project root directory, as invalid changes can cause compilation errors for the frontend.


## public

The `public` folder contains three important files: `favicon.ico`, `index.html`, `manifest.json`. `favicon.ico` is the favicon file, which is an image the browser renders as the webpage's icon. It looks like this: 

![favicon.ico example](./faviconExample.PNG)

This icon be changed, but make sure that the image has the .ico extension for it to be rendered. The `index.html` file is what the browser is ultimately rendering. Browsers do not understand React, and jsx, so they show what is stored in `.html` and `.js` files. The part of `index.html` that displays the React code is `<div id="root"></div>`. The `src/index.js` file (the entry point of the React code) uses ReactDOM to render the jsx into a `<div></div>` tag with id of "root" in `index.html`.

`ReactDOM.render(jsx, document.getElementById('root'));`

`manifest.json` allows the developer to dynamically store favicon.ico and other image files in JSON format to display them in the `index.html` file.


## src

The `src` folder contains the source code for the frontend. Most changes that will be displayed directly on the frontend will be to files inside this folder, as these files contain jsx and css. Inside the `src` folder, the following folder structure can be seen.

- `actions`
- `components`
- `documentation`
- `reducers`
- `store`
- `utils`

The `actions`, `reducers`, and `store` folders all contain files that interact with Redux. Redux is a library that helps with managing globalized state, and is especially useful when needing to pass state from child components to parent components. React by itself cannot do this.

The `actions` folder contains actions, which are functions that perform actions on state. As an example, the `porespyfuncs.js` file contains two functions: `setPorespyFuncs`, `startSetPorespyFuncs`. The React component that needs to perform the action of setting the porespy functions will call the `startSetPorespyFuncs`, which then calls `setPorespyFuncs`. This is done so that the `setPoreSpyFuncs` function can be dispatched with the `dispatch` function, and so that asynchronous actions can be performed. All other actions in this folder and subfolder follow this same pattern.

The `reducers` folder contains reducers, which are functions that handle and decide how the state is set in the Redux store based on the state and action values passed in from the action method that pertains to it. The state and action values are passed into the reducer as arguments, and each reducer must be registed in the Redux store (found in `store/configureStore.js`) so that the globalized state can be managed and recognized using Redux.

The `store` folder contains `configureStore.js`, which configures the Redux store. The store holds the whole state tree of the application, and state can be changed by calling `dispatch` on an action. Middleware like thunk (which is useful for asynchronous function calls) can be added on to the Redux store. Lastly, the Redux store gets imported by `index.js` in the `src` folder, where it is the wrapper component for the PoreSpyApp component (`<PoreSpyApp />`). This is done so that Redux can be applied to the entire application.

The `components` folder contains all the React components that are rendered by the jsx. The file structure is as follows:

- `AboutPage`
- `ContactPage`
- `DefaultPage`
- `Filters`
- `Generators`
- `ImagePanel`
- `LandingPage`
- `Metrics`
- `NotFoundPage`
- `PorespyApp`
- `RenderFilter`
- `RenderGenerator`
- `RenderImage`
- `RenderMetric`

Each component has its own folder, and inside that folder it has `.js` and `.css` files with the same name.

The `AboutPage`, `ContactPage`, `LandingPage`, `NotFoundPage` components all concerned with rendering the correct page, depending on what URL the user has entered.

- When the user reaches the `/` url, the `LandingPage` component is rendered. 
- When the user reaches the `/contact` url, the `ContactPage` component is rendered.
- When the user reaches the `/about` url, the `AboutPage` component is rendered.
- When the user reaches any url that does not end with `/`, `/contact`, `/about`, then the `NotFoundPage` component is rendered. An example of this would be is if the user reaches ending a url with `/test`.

The `Filters`, `Generators`, and `Metrics` folders contain all the PoreSpy functions that can be displayed to the user. Currently, the `Blobs`, `BundleOfTubes`, `LocalThickness`, and `PoreSizeDistribution` functions are functional. Any documentation and developer best practices are included inside those files, and most user inputs are elements from Material UI.

The `ImagePanel` component is concerned with displaying the Image Panel on the right side of the screen. The elements here are from Material UI, and this component interacts frequently with the Redux store.

The `PorespyApp` component is the application entrypoint. It is the first component shown to the user, and contains the overall layout as implemented by the `<Drawer></Drawer>` and the `<List></List>` components from Material UI. This is where the porespy functions are dynamically extracted, and that state is passed into the Redux store.

The `RenderFilter`, `RenderGenerator`, and `RenderMetric` are components that take in a prop (`chosenFunction`) and display the porespy function chosen by the user. This design pattern was chosen to abstract each rendered component, to keep the code organized, and to maintain the React.js files short and reusable.


## Contact: 

Jeff Gostick (jgostick@uwaterloo.ca)
