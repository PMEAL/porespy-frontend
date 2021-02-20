//
//  Blobs.js
//  porespy-frontend
//

const generatedImagesDefaultState = [];

const generatedImagesReducer = (state = generatedImagesDefaultState, action) => {
    switch (action.type) {
        case 'SET_IMAGES':
            return state.length < 1 ? [action.images] : [...state, action.images];
        case 'DELETE_IMAGE':
            return state.filter((images) => state.indexOf(images) !== action.index);
        default: 
            return state;
    }
}

export default generatedImagesReducer;
