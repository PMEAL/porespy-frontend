//
//  porespyfuncs.js
//  porespy-frontend
//

const backendReducerDefaultState = {};

const backendReducer = (state = backendReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_BACKEND_ENDPOINT':
            return action.backendEndpoint;
        default: 
            return state;
    }
}

export default backendReducer;
