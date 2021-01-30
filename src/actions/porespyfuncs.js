//
//  porespyfuncs.js
//  porespy-frontend
//

const setPorespyFuncs = (porespyFuncs) => ({
    type: 'SET_PORESPY_FUNCS',
    porespyFuncs
});

const startSetPorespyFuncs = (porespyFuncs = {}) => {
    return (dispatch) => {
        return dispatch(setPorespyFuncs(porespyFuncs));
    }
}

export { setPorespyFuncs, startSetPorespyFuncs };
