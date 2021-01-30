//
//  porespyfuncs.js
//  porespy-frontend
//

const porespyFuncsReducerDefaultState = {};

const porespyFuncsReducer = (state = porespyFuncsReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_PORESPY_FUNCS':
            return action.porespyFuncs;
        default: 
            return state;
    }
}

export default porespyFuncsReducer;
