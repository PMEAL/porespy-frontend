//
//  PoreSpyApp.js
//  porespy-frontend
//

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import AboutPage from '../AboutPage/AboutPage';

const PoreSpyApp = () => {
    return (
        <Router basename="">
            <Route path="/" exact render={() => (
                <LandingPage />
            )}/>
            <Route path="/about" exact render={() => (
                <AboutPage />
            )}/>
        </Router>
    )
}

export default PoreSpyApp;
