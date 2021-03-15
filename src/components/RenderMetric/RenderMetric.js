//
//  RenderMetric.js
//  porespy-frontend
//

import React from 'react';
import PoreSizeDistribution from '../Metrics/PoreSizeDistribution/PoreSizeDistribution';
import './RenderMetric.css';

const RenderMetric = ({ chosenFunction }) => {
    return (
        <div>
            {
                chosenFunction === "Pore Size Distribution" && <PoreSizeDistribution />
                
                /* 
                chosenFunction === "Pore Size Distribution" && <PoreSizeDistribution />
                */
            }
        </div>
    )
}

export default RenderMetric;
