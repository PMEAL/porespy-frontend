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
            {
                // TODO: create components for remaining filter functions
                chosenFunction === "Local Thickness" && <LocalThickness />
            }
        </div>
    )
}

export default RenderFilter;
