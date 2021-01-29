//
//  PoreSpyApp.js
//  porespy-frontend
//

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import LandingPage from '../LandingPage/LandingPage';

const PoreSpyApp = () => {
    const [porespyFuncs, setPorespyFuncs] = useState({});
    const backendRootEndpoint = "http://localhost:8000/";

    // this only checks for generators... how to do for filters, metrics, networks, and so on?

    useEffect(() => {
        axios.get(`${backendRootEndpoint}porespyfuncs/1/`)
        .then(({ data: { porespy_funcs } }) => {
            console.log(porespy_funcs);
            setPorespyFuncs(porespy_funcs);
        }).catch((e) => {
            // TODO: find a better error catching method?
            console.log(e);
        });

    }, []);


    return (
        <div>
            <Router basename="">
                {/* Render LandingPage component with page prop passed in. */}
                {/* page prop will depend on how the user reaches the site (ex: localhost:3000/about vs localhost:3000/contact vs localhost:3000/) */}
                <Route path="/" exact render={() => (
                    <LandingPage page="" porespyFuncs={porespyFuncs} />
                )}/>
                <Route path="/about" exact render={() => (
                    <LandingPage page="about" porespyFuncs={porespyFuncs} />
                )}/>
                <Route path="/contact" exact render={() => (
                    <LandingPage page="contact" porespyFuncs={porespyFuncs} />
                )}/>
            </Router>
        </div>
    )
}

export default PoreSpyApp;
