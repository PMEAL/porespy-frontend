//
//  RenderFilter.js
//  porespy-frontend
//

import React from 'react';
import './RenderFilter.css';
import LocalThickness from '../Filters/LocalThickness/LocalThickness';

const RenderFilter = ({ chosenFunction }) => {
    return (
        <div>
            <h1>
                Hello from RenderFilter
            </h1>
            <div>
                {chosenFunction}
            </div>
            {
                chosenFunction === "Local Thickness" && <LocalThickness />
            }
        </div>
    )
}

export default RenderFilter;
