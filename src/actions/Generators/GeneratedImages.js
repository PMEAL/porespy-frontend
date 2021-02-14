//
//  Blobs.js
//  porespy-frontend
//

const setImages = (images) => ({
    type: 'SET_IMAGES',
    images
})

const startSetImages = (genImages = []) => {
    return (dispatch) => {
        return dispatch(setImages(genImages));
    };
}

export {
    setImages,
    startSetImages
};
