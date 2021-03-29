# Porespy Frontend

This repo contains the front end of PoreSpy, the web app of a python library of image analysis tools used to extract information from 3D images of porous materials. The front end is written in React, Redux, CSS, and HTML.

For more information on PoreSpy, please visit the following repo: https://github.com/PMEAL/porespy


## TODO From Meetings:

- Wire Generators up (the remaining ones)
- Wire Filters up (the remaining ones)
- Wire Metrics up (the remaining ones).
- Networks can't be wired up, ask Jeff to help get the networks setup in the .py file he sent previously.
- Make panel on the right collapsible? (for stylings in smaller screens...?)
- Fill out UploadImage component in ./Generators/ (pass in the already existing button and logic)
- add sass to make css scalable and reusable.


## TODO (Lower priority):

- Get a Favicon.ico?


## Instructions:

Before pulling the code from the repo, make sure to have node.js installed. This can be installed from: https://nodejs.org/en/. The front-end was developed using node.js version 14.8.0. As of March 29, 2021, more recent versions of node are compatible with the code. Backwards compatability is currently unknown, but please make sure to run either the closest version (14.8.0) or the most recent (14.6.0). 

**NOTE:** Since this project is using Create React App, you must have node.js >= 10.16 and npm >= 5.6 on your machine to run the code.

When you pull the code from the repo, first run `npm install` in the terminal at the root directory to load all in the required npm modules. Once that command has finished, run `npm start` in the terminal at the root directory to run the front-end locally on your machine. You can view the front-end at `http://localhost:3000/`. If there are error messages in the terminal, make sure to resolve these first as the UI will not run until these errors have been resolved.


## Contact:

Jeff Gostick (jgostick@uwaterloo.ca)
