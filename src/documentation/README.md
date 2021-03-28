# PoreSpy Frontend Documentation


## Folder Structure Explanation

Once the repo has been pulled and the `npm install` command has been run, the following folder structure should appear at the root directory of the project:

- `node_modules`
- `public`
- `src`


### node_modules

The `node_modules` folder contains all the necessary node modules for the frontend run. Notable packages include axios (for making http requests to the backend (the RESTful API)), react-redux (for maintaining globalized state variables), and electron (useful for deployment into a desktop app using electron.js). The `node_modules` folder contains all default and installed packages. A more concise list of all the installed packages can be found in `package.json` in the `"dependencies"` property. 

**NOTE:** Please be wary of any changes made tot he `package.json` and `package-lock.json` files, as invalid changes can cause compilation errors for the frontend.


### public



### src

The `src` folder contains the source code for the frontend. Most changes that will be displayed directly on the frontend will be to files inside this folder.


