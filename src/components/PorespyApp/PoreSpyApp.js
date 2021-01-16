//
//  PoreSpyApp.js
//  porespy-frontend
//

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';

const PoreSpyApp = () => {
    return (
        <div>
            <Router basename="">
                {/* Render LandingPage component with page prop passed in. */}
                {/* page prop will depend on how the user reaches the site (ex: localhost:3000/about vs localhost:3000/conact vs localhost:3000/) */}
                <Route path="/" exact render={() => (
                    <LandingPage page="" />
                )}/>
                <Route path="/about" exact render={() => (
                    <LandingPage page="about" />
                )}/>
                <Route path="/contact" exact render={() => (
                    <LandingPage page="contact" />
                )}/>
            </Router>
        </div>
    )
}

export default PoreSpyApp;
