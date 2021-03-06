//
//  Filters.js
//  porespy-frontend
//

// SET_IMAGES
export const setImages = (images) => ({
    type: 'SET_IMAGES',
    images
})

export const startSetImages = (genImages = []) => {
    return (dispatch) => {
        return dispatch(setImages(genImages));
    };
}

// DELETE_IMAGE
export const deleteImages = (index = 0) => ({
    type: 'DELETE_IMAGE',
    index
})

export const startDeleteImages = (index) => {
    return (dispatch) => {
        return dispatch(deleteImages(index));
    }
}
