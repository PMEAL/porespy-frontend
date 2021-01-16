//
//  RenderMetric.js
//  porespy-frontend
//

import React from 'react';
import './RenderMetric.css';

const RenderMetric = ({ chosenFunction }) => {
    return (
        <div>
            <h1>
                Hello from RenderMetric!
            </h1>
            <div>
                {chosenFunction}
            </div>
        </div>
    )
}

export default RenderMetric;
