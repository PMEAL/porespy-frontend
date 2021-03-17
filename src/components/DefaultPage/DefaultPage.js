//
//  DefaultPage.js
//  porespy-frontend
//

import React from 'react';
import './DefaultPage.css';

const DefaultPage = ({ title, description }) => {
    return (
        <div className="defaultPageWrapper">
            <div className="defaultPageTitle">
                {title}
            </div>
            <div className="defaultPageDescription">
                {description}
            </div>
        </div>
    )
}

export default DefaultPage;
