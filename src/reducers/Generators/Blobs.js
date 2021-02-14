//
//  Blobs.js
//  porespy-frontend
//

const blobsDefaultState = [];

const blobsReducer = (state = blobsDefaultState, action) => {
    switch (action.type) {
        case 'SET_BLOBS':
            return state.length < 1 ? [action.blobs] : [...state, action.blobs];
        default: 
            return state;
    }
}

export default blobsReducer;
