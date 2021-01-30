//
//  configureStore.js
//  porespy-frontend
//

import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import porespyFuncsReducer from '../reducers/porespyfuncs';

const composeEnhancers = window.__REDUX_DEVTOOLS_ETENSION_COMPOSE__ || compose;

const configureStore = () => {
    const store = createStore(
        combineReducers({
            porespyFuncs: porespyFuncsReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
}

export default configureStore;

