//
//  porespyfuncs.js
//  porespy-frontend
//

export const setPorespyFuncs = (porespyFuncs) => ({
    type: 'SET_PORESPY_FUNCS',
    porespyFuncs
});

export const startSetPorespyFuncs = (porespyFuncs = {}) => {
    return (dispatch) => {
        return dispatch(setPorespyFuncs(porespyFuncs));
    };
}
