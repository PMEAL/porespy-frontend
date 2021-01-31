//
//  PoreSpyApp.js
//  porespy-frontend
//

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { startSetPorespyFuncs } from '../../actions/porespyfuncs';
import { startSetBackendEndpoint } from '../../actions/backend';
import LandingPage from '../LandingPage/LandingPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

let porespyFuncs = {};
let backendRootEndpoint = "http://localhost:8000/";

const PoreSpyApp = (props) => {    
    useEffect(() => {
        axios.get(`${backendRootEndpoint}porespyfuncs/1/`)
        .then(({ data: { porespy_funcs } }) => {
            porespyFuncs = porespy_funcs;
            props.startSetPorespyFuncs(porespy_funcs);
            props.startSetBackendEndpoint(backendRootEndpoint);
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
                <Route path="*" exact component={NotFoundPage} />
                <Redirect from='*' to='/' />
            </Router>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startSetPorespyFuncs: () => dispatch(startSetPorespyFuncs(porespyFuncs)),
    startSetBackendEndpoint: () => dispatch(startSetBackendEndpoint(backendRootEndpoint))
})

export default connect(undefined, mapDispatchToProps)(PoreSpyApp);
