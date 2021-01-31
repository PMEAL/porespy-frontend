//
//  DefaultPage.js
//  porespy-frontend
//

import React from 'react';
import './DefaultPage.css';

const DefaultPage = () => {
    return (
        <div className="defaultPageWrapper">
            <div className="defaultPageTitle">
                Choose a generator to get started!
            </div>
            <div className="defaultPageDescription">
                Generators are a variety of functions for generating artificial images
                of porous materials, generally for testing, validation, debugging, and
                illustration purposes.
            </div>
        </div>
    )
}

export default DefaultPage;
