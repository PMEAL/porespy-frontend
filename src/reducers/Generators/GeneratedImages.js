//
//  Blobs.js
//  porespy-frontend
//

const generatedImagesDefaultState = [];

const generatedImagesReducer = (state = generatedImagesDefaultState, action) => {
    switch (action.type) {
        case 'SET_IMAGES':
            return state.length < 1 ? [action.images] : [...state, action.images];
        default: 
            return state;
    }
}

export default generatedImagesReducer;
