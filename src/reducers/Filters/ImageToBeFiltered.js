//
//  Filters.js
//  porespy-frontend
//

const filtersDefaultState = "";

const filtersReducer = (state = filtersDefaultState, action) => {
    switch (action.type) {
        case 'SET_CHOSEN_IMAGE':
            return action.image;
        default: 
            return state;
    }
}

export default filtersReducer;
