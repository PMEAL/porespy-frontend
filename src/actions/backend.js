//
//  backend.js
//  porespy-frontend
//

export const setBackendEndpoint = (backendEndpoint) => ({
    type: 'SET_BACKEND_ENDPOINT',
    backendEndpoint
})

export const startSetBackendEndpoint = (backendEndpoint = {}) => {
    return (dispatch) => {
        return dispatch(setBackendEndpoint(backendEndpoint));
    };
}
