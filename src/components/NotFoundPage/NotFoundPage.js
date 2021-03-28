//
//  PoreSpyApp.js
//  porespy-frontend
//

import React from 'react';
import './NotFoundPage.css';

const NotFoundPage = () => {
    return (
        <div className="notFoundPageTitleWrapper">
            <div className="notFoundPageTitle">
                Oops!
            </div>
            <div className="notFoundPageDescription">
                Hmm, that page doesn't seem to exist. Go back to safety:
            </div>
            <div>
                {
                    /* 
                    TODO: currently this <a></a> tag redirects the user back to the homepage, or the root directory.
                    When a domain has been purchased, replace http://localhost:3000/ with the proper domain.
                    */
                }
                <a href="http://localhost:3000/">Home</a>
            </div>
        </div>
    )
}

export default NotFoundPage;
