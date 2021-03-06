//
//  Filters.js
//  porespy-frontend
//

// SET_CHOSEN_IMAGE
export const setChosenImage = (image) => ({
    type: 'SET_CHOSEN_IMAGE',
    image
})

export const startSetChosenImage = (image) => {
    return (dispatch) => {
        return dispatch(setChosenImage(image));
    }
}
