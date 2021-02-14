//
//  Blobs.js
//  porespy-frontend
//

const setBlobs = (blobs) => ({
    type: 'SET_BLOBS',
    blobs
})

const startSetBlobs = (blobs = []) => {
    return (dispatch) => {
        return dispatch(setBlobs(blobs));
    };
}

export {
    setBlobs,
    startSetBlobs
};
