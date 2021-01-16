/* 

TODO: uncomment all the code below when ready to implement Redux.

//
//  configureStore.js
//  porespy-frontend
//

import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import _____Reducer from './PATH_TO_REDUCER/____reducer.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_ETENSION_COMPOSE__ || compose;

const configureStore = () => {
    const store = createStore(
        combineReducers({
            // ex -> token: tokenReducer,
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
}

export default configureStore;

*/
