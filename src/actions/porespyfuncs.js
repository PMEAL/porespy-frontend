export const setPorespyFuncs = (porespyFuncs) => ({
    type: 'SET_PORESPY_FUNCS',
    porespyFuncs
});

export const startSetPorespyFuncs = (porespyFuncs = {}) => {
    return (dispatch, getState) => {
        return dispatch(setPorespyFuncs(porespyFuncs));
    }
}