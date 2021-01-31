//
//  backend.js
//  porespy-frontend
//

const setBackendEndpoint = (backendEndpoint) => ({
    type: 'SET_BACKEND_ENDPOINT',
    backendEndpoint
})

const startSetBackendEndpoint = (backendEndpoint = {}) => {
    return (dispatch) => {
        return dispatch(setBackendEndpoint(backendEndpoint));
    };
}

export {
    setBackendEndpoint,
    startSetBackendEndpoint
};
