//
//  AboutPage.js
//  porespy-frontend
//

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PoreSpyApp from './components/PorespyApp/PoreSpyApp';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

// (Program entry point)

const store = configureStore();

const jsx = (
  <React.StrictMode>
    <Provider store={store}>
      <PoreSpyApp />
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(jsx, document.getElementById('root'));
