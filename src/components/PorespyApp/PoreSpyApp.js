//
//  PoreSpyApp.js
//  porespy-frontend
//

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import AboutPage from '../AboutPage/AboutPage';
import ContactPage from '../ContactPage/ContactPage';

const PoreSpyApp = () => {
    return (
        <div>
            <Router basename="">
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
            {/*
            <Router basename="">
                <Route path="/" exact render={() => (
                    <LandingPage />
                )}/>
                <Route path="*" exact render={() => (
                    <div>
                        error 404: not found
                    </div>
                )} />
            </Router>
            */}
        </div>
    )
}

export default PoreSpyApp;
